import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  UtensilsCrossed,
  Palette,
  Music,
  Building2,
  Gem,
  X,
  Loader2,
  AlertCircle,
  ImagePlus,
  Mail,
  Phone,
  Images,
  Boxes,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ImageOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { getMyVendors, deleteVendor, updateVendor } from "../../api/vendorApi";
import {
  createPackage,
  deletePackage,
  addPackageFeature,
  deletePackageFeature,
} from "../../api/packageApi";
import {
  getVendorGallery,
  uploadVendorGallery,
  deleteVendorGalleryImage,
} from "../../api/vendorApi";
import { resolveImageUrl } from "../../utils/imageUrl";

const GALLERY_PREVIEW_LIMIT = 2;

const SERVICE_ICON = {
  Catering: UtensilsCrossed,
  Decoration: Palette,
  "Sound & Lighting": Music,
};

const STATUS_STYLE = {
  Active: "bg-[#EAFBF3] text-[#188F65]",
  InActive: "bg-[#FFF6E6] text-[#B8790B]",
};

const PACKAGE_BADGE =
  "bg-[#F1F0FF] text-[#6C63FF] ring-1 ring-inset ring-[#DAD6FB]";

function mapVendor(v) {
  return {
    id: v.id,
    name: (v.vendorName && v.vendorName.trim()) || v.slug || "Unnamed vendor",
    service: v.vendorCategory?.name ?? v.categoryName ?? "Uncategorized",
    email: v.email,
    phone: v.phone,
    status: v.isActive ? "Active" : "inactive",
    logoImg: v.logoImg,
    packages: (v.packages ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      maxPeople: p.maxPeople,
      isPerPerson: p.isPerPerson,
      features: (p.packageFeatures ?? []).map((f) => ({
        id: f.id,
        text: f.featureText,
      })),
    })),
    gallery: (v.vendorGalleries ?? []).map(mapGalleryImage),
  };
}

function mapGalleryImage(g) {
  return {
    id: g.id,
    url: g.imageUrl,
  };
}

function formatPrice(price, isPerPerson) {
  const amount = new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(price);
  return isPerPerson ? `${amount} / person` : amount;
}

function Vendors() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // modal state: { type: "package" | "feature", vendorId, packageId? }
  const [modal, setModal] = useState(null);
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    maxPeople: "",
    isPerPerson: false,
  });
  const [newFeature, setNewFeature] = useState("");
  const [targetPackageId, setTargetPackageId] = useState(null);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  // delete-vendor state
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  // gallery state
  const fileInputRef = useRef(null);
  const [galleryTargetVendor, setGalleryTargetVendor] = useState(null);
  const [uploadingVendorId, setUploadingVendorId] = useState(null);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [galleryError, setGalleryError] = useState("");

  // Tracks image URLs that failed to load (by key) so we can show a fallback
  // instead of a broken-image icon, e.g. { "logo-12": true, "gallery-45": true }
  const [brokenImages, setBrokenImages] = useState({});
  const markImageBroken = (key) =>
    setBrokenImages((prev) => (prev[key] ? prev : { ...prev, [key]: true }));

  // ---- Profile modal (Instagram/Facebook-style vendor view) ----
  const [profileVendorId, setProfileVendorId] = useState(null); // id currently mounted
  const [profileVisible, setProfileVisible] = useState(false); // controls enter/exit animation
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [profileDeleteError, setProfileDeleteError] = useState("");

  const fetchVendors = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyVendors();
      // Controller returns { success, vendors: [...] } — unwrap it.
      const list = Array.isArray(data) ? data : data.vendors ?? [];
      const mapped = list.map(mapVendor);
      setVendors(mapped);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to load vendors. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // ---- Package / Feature modal ----

  const openAddPackage = (vendorId) => {
    setNewPackage({ name: "", price: "", maxPeople: "", isPerPerson: false });
    setModalError("");
    setModal({ type: "package", vendorId });
  };

  const openAddFeature = (vendorId, packageId = null) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    const firstPkg = packageId ?? vendor?.packages?.[0]?.id ?? null;
    setTargetPackageId(firstPkg);
    setNewFeature("");
    setModalError("");
    setModal({ type: "feature", vendorId });
  };

  const closeModal = () => {
    if (modalSubmitting) return;
    setModal(null);
  };

  const handleDeletePackage = async (vendorId, packageId) => {
    if (!window.confirm("Delete this package? Its features will be removed too.")) return;
    try {
      await deletePackage(packageId);
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId
            ? { ...v, packages: v.packages.filter((p) => p.id !== packageId) }
            : v
        )
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete package.");
    }
  };

  const handleDeleteFeature = async (vendorId, packageId, featureId) => {
    try {
      await deletePackageFeature(featureId);
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId
            ? {
                ...v,
                packages: v.packages.map((p) =>
                  p.id === packageId
                    ? { ...p, features: p.features.filter((f) => f.id !== featureId) }
                    : p
                ),
              }
            : v
        )
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete feature.");
    }
  };

  const handleAddPackage = async () => {
    if (!newPackage.name.trim()) {
      setModalError("Package name is required.");
      return;
    }

    setModalError("");
    setModalSubmitting(true);
    try {
      const result = await createPackage({
        vendorId: modal.vendorId,
        name: newPackage.name.trim(),
        price: Number(newPackage.price) || 0,
        maxPeople: Number(newPackage.maxPeople) || 0,
        isPerPerson: newPackage.isPerPerson,
      });

      setVendors((prev) =>
        prev.map((v) =>
          v.id === modal.vendorId
            ? {
                ...v,
                packages: [
                  ...v.packages,
                  {
                    id: result.id,
                    name: newPackage.name.trim(),
                    price: Number(newPackage.price) || 0,
                    maxPeople: Number(newPackage.maxPeople) || 0,
                    isPerPerson: newPackage.isPerPerson,
                    features: [],
                  },
                ],
              }
            : v
        )
      );
      setModal(null);
    } catch (err) {
      setModalError(err?.response?.data?.message || "Failed to add package.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleAddFeature = async () => {
    if (!newFeature.trim()) {
      setModalError("Feature text is required.");
      return;
    }
    if (!targetPackageId) {
      setModalError("Select a package first.");
      return;
    }

    setModalError("");
    setModalSubmitting(true);
    try {
      const result = await addPackageFeature(targetPackageId, newFeature.trim());

      setVendors((prev) =>
        prev.map((v) =>
          v.id === modal.vendorId
            ? {
                ...v,
                packages: v.packages.map((p) =>
                  p.id === targetPackageId
                    ? {
                        ...p,
                        features: [
                          ...p.features,
                          { id: result.id, text: newFeature.trim() },
                        ],
                      }
                    : p
                ),
              }
            : v
        )
      );
      setModal(null);
    } catch (err) {
      setModalError(err?.response?.data?.message || "Failed to add feature.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const activeVendor = modal ? vendors.find((v) => v.id === modal.vendorId) : null;
  const profileVendor = profileVendorId
    ? vendors.find((v) => v.id === profileVendorId)
    : null;

  // ---- Row actions ----
  const handleView = (vendorId) => {
    openProfileModal(vendorId);
  };

const handleEdit = (vendorId) => {
  navigate(`/user/vendors/edit/${vendorId}`);
};

  // ---- Profile modal handlers ----

  const openProfileModal = (vendorId) => {
    setProfileDeleteError("");
    setProfileVendorId(vendorId);
    // Mount first, then flip visible on the next frame so the transition runs.
    requestAnimationFrame(() => requestAnimationFrame(() => setProfileVisible(true)));
  };

  const closeProfileModal = () => {
    setProfileVisible(false);
    // Wait for the exit transition to finish before unmounting.
    setTimeout(() => setProfileVendorId(null), 200);
  };

  const handleToggleStatus = async (vendor) => {
    setStatusUpdatingId(vendor.id);
    setProfileDeleteError("");
    const nextActive = !(vendor.status === "Active");
    try {
      await updateVendor(vendor.id, { isActive: nextActive });
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendor.id ? { ...v, status: nextActive ? "Active" : "inactive" } : v
        )
      );
    } catch (err) {
      setProfileDeleteError(
        err?.response?.data?.message || "Failed to update status. Please try again."
      );
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleDeleteFromProfile = async (vendorId) => {
    if (!window.confirm("Delete this vendor? This cannot be undone.")) return;
    setProfileDeleteError("");
    setDeletingId(vendorId);
    try {
      await deleteVendor(vendorId);
      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
      closeProfileModal();
    } catch (err) {
      setProfileDeleteError(
        err?.response?.data?.message || "Failed to delete vendor. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleDelete = async (vendorId) => {
    if (!window.confirm("Delete this vendor? This cannot be undone.")) return;

    setDeleteError("");
    setDeletingId(vendorId);
    try {
      await deleteVendor(vendorId);
      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
    } catch (err) {
      setDeleteError(
        err?.response?.data?.message || "Failed to delete vendor. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Gallery actions ----

  const openAddImages = (vendorId) => {
    setGalleryError("");
    setGalleryTargetVendor(vendorId);
    // Reset value first so selecting the same file(s) again still fires onChange
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const vendorId = galleryTargetVendor;
    if (!files || files.length === 0 || vendorId == null) return;

    setGalleryError("");
    setUploadingVendorId(vendorId);
    try {
      await uploadVendorGallery(vendorId, files);
      const imgs = await getVendorGallery(vendorId);
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId ? { ...v, gallery: (imgs ?? []).map(mapGalleryImage) } : v
        )
      );
    } catch (err) {
      setGalleryError(
        err?.response?.data?.message || "Failed to upload image(s). Please try again."
      );
    } finally {
      setUploadingVendorId(null);
      setGalleryTargetVendor(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = async (vendorId, imageId) => {
    if (!window.confirm("Remove this image from the gallery?")) return;

    setGalleryError("");
    setDeletingImageId(imageId);
    try {
      await deleteVendorGalleryImage(imageId);
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId
            ? { ...v, gallery: v.gallery.filter((img) => img.id !== imageId) }
            : v
        )
      );
    } catch (err) {
      setGalleryError(
        err?.response?.data?.message || "Failed to delete image. Please try again."
      );
    } finally {
      setDeletingImageId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hidden file input shared by all rows */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1830] sm:text-3xl">Vendors</h1>
          <p className="mt-1 text-sm text-[#8A85A0]">
            Manage the vendors working on your events.
          </p>
        </div>

        <Link
          to="/user/vendor-register"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#5B4BD1] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:shadow-md active:scale-[0.98]"
        >
          <Plus size={17} />
          Add Vendor
        </Link>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative max-w-xs w-full">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#B0ACC4]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="w-full rounded-xl border border-[#EDEBF7] bg-white py-2.5 pl-9 pr-3 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
          />
        </div>
      </div>

      {deleteError && (
        <div className="flex items-center gap-2 rounded-xl bg-[#FDF5F4] px-4 py-3 text-sm text-[#C0524A]">
          <AlertCircle size={15} />
          {deleteError}
        </div>
      )}

      {galleryError && (
        <div className="flex items-center gap-2 rounded-xl bg-[#FDF5F4] px-4 py-3 text-sm text-[#C0524A]">
          <AlertCircle size={15} />
          {galleryError}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEBF7] bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#8A85A0]">
            <Loader2 size={18} className="animate-spin" />
            Loading vendors...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <AlertCircle size={20} className="text-[#E5484D]" />
            <p className="text-sm text-[#C0524A]">{error}</p>
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#B0ACC4]">
            {vendors.length === 0
              ? "No vendors yet. Add your first vendor to get started."
              : "No vendors match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1240px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#EDEBF7] bg-[#FAFAFC] text-xs uppercase tracking-wide text-[#B0ACC4]">
                  <th className="px-5 py-3.5 font-medium">Vendor</th>
                  <th className="px-5 py-3.5 font-medium">Service</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Packages</th>
                  <th className="px-5 py-3.5 font-medium">Package Features</th>
                  <th className="px-5 py-3.5 font-medium">Images</th>
                  <th className="px-5 py-3.5 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVendors.map((vendor) => {
                  const ServiceIcon = SERVICE_ICON[vendor.service] ?? Building2;
                  const isDeleting = deletingId === vendor.id;
                  const isUploadingImages = uploadingVendorId === vendor.id;

                  return (
                    <tr
                      key={vendor.id}
                      className="border-t border-[#F4F2FA] align-top transition-colors hover:bg-[#FAFAFC]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {vendor.logoImg && !brokenImages[`logo-${vendor.id}`] ? (
                            <img
                              src={resolveImageUrl(vendor.logoImg)}
                              alt=""
                              onError={() => markImageBroken(`logo-${vendor.id}`)}
                              className="h-9 w-9 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-sm font-semibold text-white">
                              {vendor.name?.charAt(0) ?? "V"}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-[#1C1830]">{vendor.name}</p>
                            <p className="text-xs text-[#B0ACC4]">
                              ID #{String(vendor.id).padStart(3, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#F4F2FA] px-3 py-1 text-xs font-medium text-[#5F5A78]">
                          <ServiceIcon size={13} />
                          {vendor.service}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            STATUS_STYLE[vendor.status] ?? STATUS_STYLE.InActive
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </td>

                      {/* Packages column */}
                      <td className="px-5 py-4">
                        <div className="flex max-w-[200px] flex-col gap-1.5">
                          {vendor.packages.length === 0 && (
                            <span className="text-xs italic text-[#B0ACC4]">No packages yet</span>
                          )}
                          {vendor.packages.map((pkg) => (
                            <span
                              key={pkg.id}
                              className={`group flex w-fit items-center gap-1.5 rounded-full py-1 pl-2.5 pr-1 text-xs font-semibold ${PACKAGE_BADGE}`}
                            >
                              <Gem size={12} />
                              {pkg.name}
                              {pkg.price > 0 && (
                                <span className="font-normal opacity-80">
                                  · {formatPrice(pkg.price, pkg.isPerPerson)}
                                </span>
                              )}
                              <button
                                onClick={() => handleDeletePackage(vendor.id, pkg.id)}
                                title={`Remove ${pkg.name} package`}
                                className="ml-0.5 flex items-center justify-center rounded-full p-0.5 text-current opacity-60 transition-opacity hover:bg-black/10 hover:opacity-100"
                              >
                                <X size={11} />
                              </button>
                            </span>
                          ))}
                          <button
                            onClick={() => openAddPackage(vendor.id)}
                            className="mt-0.5 flex w-fit items-center gap-1 rounded-full border border-dashed border-[#D8D4EC] px-2.5 py-1 text-[11px] font-medium text-[#7C6AEF] transition-colors hover:border-[#7C6AEF] hover:bg-[#F4F2FA]"
                          >
                            <Plus size={12} />
                            Add package
                          </button>
                        </div>
                      </td>

                      {/* Package Features column */}
                      <td className="px-5 py-4">
                        <div className="flex max-w-[260px] flex-col gap-2.5">
                          {vendor.packages.length === 0 && (
                            <span className="text-xs italic text-[#B0ACC4]">—</span>
                          )}
                          {vendor.packages.map((pkg) => (
                            <div key={pkg.id} className="flex flex-col gap-1">
                              <span className="text-[11px] font-semibold text-[#8A85A0]">
                                {pkg.name}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {pkg.features.length === 0 && (
                                  <span className="text-xs italic text-[#B0ACC4]">No features</span>
                                )}
                                {pkg.features.map((feature) => (
                                  <span
                                    key={feature.id}
                                    className="flex items-center gap-1 rounded-md bg-[#F4F2FA] py-0.5 pl-2 pr-1 text-[11px] text-[#5F5A78]"
                                  >
                                    {feature.text}
                                    <button
                                      onClick={() =>
                                        handleDeleteFeature(vendor.id, pkg.id, feature.id)
                                      }
                                      title="Remove feature"
                                      className="flex items-center justify-center rounded-full p-0.5 text-[#B0ACC4] transition-colors hover:bg-[#FDF0F0] hover:text-[#E5484D]"
                                    >
                                      <X size={10} />
                                    </button>
                                  </span>
                                ))}
                                <button
                                  onClick={() => openAddFeature(vendor.id, pkg.id)}
                                  title={`Add feature to ${pkg.name}`}
                                  className="flex items-center justify-center rounded-md border border-dashed border-[#D8D4EC] px-1.5 py-0.5 text-[#7C6AEF] transition-colors hover:border-[#7C6AEF] hover:bg-[#F4F2FA]"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Images column */}
                      <td className="px-5 py-4">
                        <div className="flex max-w-[220px] flex-col gap-1.5">
                          {vendor.gallery.length === 0 ? (
                            <div className="flex flex-col items-start gap-1.5">
                              <span className="text-xs italic text-[#B0ACC4]">
                                No images yet
                              </span>
                              <button
                                onClick={() => openAddImages(vendor.id)}
                                disabled={isUploadingImages}
                                title="Add images"
                                className="flex items-center gap-1 rounded-full border border-dashed border-[#D8D4EC] px-2.5 py-1 text-[11px] font-medium text-[#7C6AEF] transition-colors hover:border-[#7C6AEF] hover:bg-[#F4F2FA] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isUploadingImages ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : (
                                  <ImagePlus size={12} />
                                )}
                                Add images
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center gap-1.5">
                              {vendor.gallery.slice(0, GALLERY_PREVIEW_LIMIT).map((img) => {
                                const isDeletingImage = deletingImageId === img.id;
                                const imgKey = `gallery-${img.id}`;
                                const isBroken = brokenImages[imgKey];
                                return (
                                  <div
                                    key={img.id}
                                    className="group relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#EDEBF7] bg-[#F4F2FA]"
                                  >
                                    {isBroken ? (
                                      <div className="flex h-full w-full items-center justify-center text-[#D8D4EC]">
                                        <ImagePlus size={16} />
                                      </div>
                                    ) : (
                                      <img
                                        src={resolveImageUrl(img.url)}
                                        alt=""
                                        onError={() => markImageBroken(imgKey)}
                                        className="h-full w-full object-cover"
                                      />
                                    )}
                                    <button
                                      onClick={() => handleDeleteImage(vendor.id, img.id)}
                                      disabled={isDeletingImage}
                                      title="Remove image"
                                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
                                    >
                                      {isDeletingImage ? (
                                        <Loader2 size={14} className="animate-spin text-white" />
                                      ) : (
                                        <X size={14} className="text-white" />
                                      )}
                                    </button>
                                  </div>
                                );
                              })}

                              {vendor.gallery.length > GALLERY_PREVIEW_LIMIT && (
                                <span
                                  title={`${vendor.gallery.length - GALLERY_PREVIEW_LIMIT} more image(s)`}
                                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F4F2FA] text-xs font-semibold text-[#8A85A0]"
                                >
                                  +{vendor.gallery.length - GALLERY_PREVIEW_LIMIT}
                                </span>
                              )}

                              <button
                                onClick={() => openAddImages(vendor.id)}
                                disabled={isUploadingImages}
                                title="Add images"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-dashed border-[#D8D4EC] text-[#7C6AEF] transition-colors hover:border-[#7C6AEF] hover:bg-[#F4F2FA] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isUploadingImages ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <Plus size={16} />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            title="View"
                            onClick={() => handleView(vendor.id)}
                            className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#F4F2FA] hover:text-[#7C6AEF]"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            title="Edit"
                            onClick={() => handleEdit(vendor.id)}
                            className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FFF6E6] hover:text-[#B8790B]"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => handleDelete(vendor.id)}
                            disabled={isDeleting}
                            className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FDF0F0] hover:text-[#E5484D] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Package / Add Feature modal — wired to real endpoints */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1830]/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#1C1830]">
                {modal.type === "package" ? "Add package" : "Add feature"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-lg p-1.5 text-[#B0ACC4] transition-colors hover:bg-[#F4F2FA] hover:text-[#1C1830]"
              >
                <X size={16} />
              </button>
            </div>

            {activeVendor && (
              <p className="mt-1 text-xs text-[#B0ACC4]">For {activeVendor.name}</p>
            )}

            {modalError && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#C0524A]">
                <AlertCircle size={13} />
                {modalError}
              </p>
            )}

            {modal.type === "package" ? (
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5F5A78]">Package name</label>
                  <input
                    autoFocus
                    type="text"
                    value={newPackage.name}
                    onChange={(e) =>
                      setNewPackage((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Premium Buffet"
                    className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3 py-2 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#5F5A78]">Price (LKR)</label>
                    <input
                      type="number"
                      min="0"
                      value={newPackage.price}
                      onChange={(e) =>
                        setNewPackage((prev) => ({ ...prev, price: e.target.value }))
                      }
                      placeholder="0"
                      className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3 py-2 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#5F5A78]">Max people</label>
                    <input
                      type="number"
                      min="0"
                      value={newPackage.maxPeople}
                      onChange={(e) =>
                        setNewPackage((prev) => ({ ...prev, maxPeople: e.target.value }))
                      }
                      placeholder="0"
                      className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3 py-2 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs font-medium text-[#5F5A78]">
                  <input
                    type="checkbox"
                    checked={newPackage.isPerPerson}
                    onChange={(e) =>
                      setNewPackage((prev) => ({ ...prev, isPerPerson: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-[#D8D4EC] text-[#7C6AEF] focus:ring-[#7C6AEF]/20"
                  />
                  Price is per person
                </label>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {activeVendor?.packages?.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-[#5F5A78]">Package</label>
                      <select
                        value={targetPackageId ?? ""}
                        onChange={(e) => setTargetPackageId(Number(e.target.value))}
                        className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3 py-2 text-sm text-[#1C1830] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                      >
                        {activeVendor.packages.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-[#5F5A78]">Feature</label>
                      <input
                        autoFocus
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="e.g. Free delivery"
                        className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3 py-2 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-[#B0ACC4]">
                    Add a package for this vendor first before adding features.
                  </p>
                )}
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={closeModal}
                disabled={modalSubmitting}
                className="rounded-xl px-4 py-2 text-sm font-medium text-[#8A85A0] transition-colors hover:bg-[#F4F2FA] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={modal.type === "package" ? handleAddPackage : handleAddFeature}
                disabled={
                  modalSubmitting ||
                  (modal.type === "feature" && !activeVendor?.packages?.length)
                }
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#5B4BD1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {modalSubmitting && <Loader2 size={14} className="animate-spin" />}
                {modal.type === "package" ? "Add package" : "Add feature"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vendor profile modal — Instagram/Facebook-style profile card */}
      {profileVendorId && profileVendor && (
        <div
          onClick={closeProfileModal}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1C1830]/50 px-4 backdrop-blur-[2px] transition-opacity duration-200 ${
            profileVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-200 ${
              profileVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Cover + avatar */}
            <div className="relative h-24 shrink-0 bg-gradient-to-br from-[#7C6AEF] via-[#8F6AEF] to-[#E6417A]">
              <button
                onClick={closeProfileModal}
                title="Close"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/35"
              >
                <X size={16} />
              </button>

              <div className="absolute -bottom-9 left-5">
                {profileVendor.logoImg && !brokenImages[`profile-logo-${profileVendor.id}`] ? (
                  <img
                    src={resolveImageUrl(profileVendor.logoImg)}
                    alt=""
                    onError={() => markImageBroken(`profile-logo-${profileVendor.id}`)}
                    className="h-[72px] w-[72px] rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-2xl font-bold text-white shadow-md">
                    {profileVendor.name?.charAt(0) ?? "V"}
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-12">
              {/* Name / status / service */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#1C1830]">{profileVendor.name}</h2>
                  <p className="text-xs text-[#B0ACC4]">
                    ID #{String(profileVendor.id).padStart(3, "0")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    STATUS_STYLE[profileVendor.status] ?? STATUS_STYLE.InActive
                  }`}
                >
                  {profileVendor.status}
                </span>
              </div>

              <span className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-[#F4F2FA] px-3 py-1 text-xs font-medium text-[#5F5A78]">
                {(() => {
                  const ServiceIcon = SERVICE_ICON[profileVendor.service] ?? Building2;
                  return <ServiceIcon size={13} />;
                })()}
                {profileVendor.service}
              </span>

              {/* Stats row — Instagram-style counts */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-[#F0EEFA] rounded-2xl border border-[#F0EEFA] bg-[#FAFAFC] py-3 text-center">
                <div>
                  <p className="text-base font-bold text-[#1C1830]">
                    {profileVendor.packages.length}
                  </p>
                  <p className="text-[11px] text-[#B0ACC4]">Packages</p>
                </div>
                <div>
                  <p className="text-base font-bold text-[#1C1830]">
                    {profileVendor.packages.reduce((sum, p) => sum + p.features.length, 0)}
                  </p>
                  <p className="text-[11px] text-[#B0ACC4]">Features</p>
                </div>
                <div>
                  <p className="text-base font-bold text-[#1C1830]">
                    {profileVendor.gallery.length}
                  </p>
                  <p className="text-[11px] text-[#B0ACC4]">Photos</p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-4 flex flex-col gap-1.5">
                {profileVendor.email && (
                  <div className="flex items-center gap-2 text-sm text-[#5F5A78]">
                    <Mail size={14} className="shrink-0 text-[#B0ACC4]" />
                    <span className="truncate">{profileVendor.email}</span>
                  </div>
                )}
                {profileVendor.phone && (
                  <div className="flex items-center gap-2 text-sm text-[#5F5A78]">
                    <Phone size={14} className="shrink-0 text-[#B0ACC4]" />
                    <span>{profileVendor.phone}</span>
                  </div>
                )}
              </div>

              {/* Packages */}
              {profileVendor.packages.length > 0 && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#B0ACC4]">
                    <Boxes size={13} />
                    Packages
                  </div>
                  <div className="flex flex-col gap-2">
                    {profileVendor.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="rounded-xl border border-[#F0EEFA] px-3 py-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#1C1830]">
                            <Gem size={13} className="text-[#7C6AEF]" />
                            {pkg.name}
                          </span>
                          {pkg.price > 0 && (
                            <span className="shrink-0 text-xs font-medium text-[#7C6AEF]">
                              {formatPrice(pkg.price, pkg.isPerPerson)}
                            </span>
                          )}
                        </div>
                        {pkg.features.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {pkg.features.map((f) => (
                              <span
                                key={f.id}
                                className="flex items-center gap-1 rounded-md bg-[#F4F2FA] px-2 py-0.5 text-[11px] text-[#5F5A78]"
                              >
                                <Sparkles size={10} className="text-[#B0ACC4]" />
                                {f.text}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery grid */}
              <div className="mt-5">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#B0ACC4]">
                  <Images size={13} />
                  Photos
                </div>
                {profileVendor.gallery.length === 0 ? (
                  <p className="text-xs italic text-[#B0ACC4]">No photos uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-1.5">
                    {profileVendor.gallery.map((img) => {
                      const key = `profile-gallery-${img.id}`;
                      const isBroken = brokenImages[key];
                      return (
                        <div
                          key={img.id}
                          className="aspect-square overflow-hidden rounded-lg bg-[#F4F2FA]"
                        >
                          {isBroken ? (
                            <div className="flex h-full w-full items-center justify-center text-[#D8D4EC]">
                              <ImageOff size={18} />
                            </div>
                          ) : (
                            <img
                              src={resolveImageUrl(img.url)}
                              alt=""
                              onError={() => markImageBroken(key)}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {profileDeleteError && (
                <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#C0524A]">
                  <AlertCircle size={13} />
                  {profileDeleteError}
                </p>
              )}
            </div>

            {/* Action bar */}
            <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[#F0EEFA] bg-[#FAFAFC] px-5 py-3.5">
              <button
                onClick={() => handleToggleStatus(profileVendor)}
                disabled={statusUpdatingId === profileVendor.id}
                title={
                  profileVendor.status === "Active"
                    ? "Mark as inactive"
                    : "Mark as active"
                }
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium text-[#5F5A78] transition-colors hover:bg-[#F4F2FA] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {statusUpdatingId === profileVendor.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : profileVendor.status === "Active" ? (
                  <ToggleRight size={20} className="text-[#188F65]" />
                ) : (
                  <ToggleLeft size={20} className="text-[#B0ACC4]" />
                )}
                {profileVendor.status === "Active" ? "Active" : "Inactive"}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    closeProfileModal();
                    handleEdit(profileVendor.id);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#5F5A78] shadow-sm ring-1 ring-inset ring-[#EDEBF7] transition-colors hover:bg-[#FFF6E6] hover:text-[#B8790B]"
                >
                  <Pencil size={13} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFromProfile(profileVendor.id)}
                  disabled={deletingId === profileVendor.id}
                  className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#C0524A] shadow-sm ring-1 ring-inset ring-[#F6D9D6] transition-colors hover:bg-[#FDF0F0] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === profileVendor.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendors;