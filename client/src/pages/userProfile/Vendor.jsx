import { useState } from "react";
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
  Mail,
  Phone,
  Gem,
  Crown,
  Award,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const SERVICE_ICON = {
  "Food & Catering": UtensilsCrossed,
  "Decoration": Palette,
  "Sound System": Music,
};

const STATUS_STYLE = {
  Active: "bg-[#EAFBF3] text-[#188F65]",
  Pending: "bg-[#FFF6E6] text-[#B8790B]",
};

const PACKAGE_STYLE = {
  Gold: {
    badge: "bg-[#FFF6E6] text-[#B8790B] ring-1 ring-inset ring-[#F3DCA8]",
    icon: Award,
  },
  Diamond: {
    badge: "bg-[#EAF4FE] text-[#1C7ED6] ring-1 ring-inset ring-[#C9E4FB]",
    icon: Gem,
  },
  Platinum: {
    badge: "bg-[#F1F0FF] text-[#6C63FF] ring-1 ring-inset ring-[#DAD6FB]",
    icon: Crown,
  },
};

const PACKAGE_TIERS = ["Gold", "Diamond", "Platinum"];

const INITIAL_VENDORS = [
  {
    id: 1,
    name: "ABC Catering",
    service: "Food & Catering",
    email: "abc@gmail.com",
    phone: "0771234567",
    status: "Active",
    packages: [
      { id: 101, tier: "Gold", features: ["Buffet for 100 pax", "2 live counters"] },
      { id: 102, tier: "Platinum", features: ["Buffet for 300 pax", "5 live counters", "Dedicated chef"] },
    ],
  },
  {
    id: 2,
    name: "Dream Decor",
    service: "Decoration",
    email: "decor@gmail.com",
    phone: "0719876543",
    status: "Pending",
    packages: [
      { id: 201, tier: "Diamond", features: ["Stage backdrop", "Floral centerpieces"] },
    ],
  },
  {
    id: 3,
    name: "Sound Masters",
    service: "Sound System",
    email: "sound@gmail.com",
    phone: "0751122334",
    status: "Active",
    packages: [],
  },
];

function Vendors() {
  const [vendors, setVendors] = useState(INITIAL_VENDORS);

  // modal state: { type: "package" | "feature", vendorId, packageId? }
  const [modal, setModal] = useState(null);
  const [newTier, setNewTier] = useState(PACKAGE_TIERS[0]);
  const [newFeature, setNewFeature] = useState("");
  const [targetPackageId, setTargetPackageId] = useState(null);

  const openAddPackage = (vendorId) => {
    setNewTier(PACKAGE_TIERS[0]);
    setModal({ type: "package", vendorId });
  };

  const openAddFeature = (vendorId, packageId = null) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    const firstPkg = packageId ?? vendor?.packages?.[0]?.id ?? null;
    setTargetPackageId(firstPkg);
    setNewFeature("");
    setModal({ type: "feature", vendorId });
  };

  const closeModal = () => setModal(null);

  const handleDeletePackage = (vendorId, packageId) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? { ...v, packages: v.packages.filter((p) => p.id !== packageId) }
          : v
      )
    );
  };

  const handleDeleteFeature = (vendorId, packageId, featureIdx) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? {
              ...v,
              packages: v.packages.map((p) =>
                p.id === packageId
                  ? { ...p, features: p.features.filter((_, idx) => idx !== featureIdx) }
                  : p
              ),
            }
          : v
      )
    );
  };

  const handleAddPackage = () => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === modal.vendorId
          ? {
              ...v,
              packages: [
                ...v.packages,
                { id: Date.now(), tier: newTier, features: [] },
              ],
            }
          : v
      )
    );
    closeModal();
  };

  const handleAddFeature = () => {
    if (!newFeature.trim() || !targetPackageId) return closeModal();
    setVendors((prev) =>
      prev.map((v) =>
        v.id === modal.vendorId
          ? {
              ...v,
              packages: v.packages.map((p) =>
                p.id === targetPackageId
                  ? { ...p, features: [...p.features, newFeature.trim()] }
                  : p
              ),
            }
          : v
      )
    );
    closeModal();
  };

  const activeVendor = modal ? vendors.find((v) => v.id === modal.vendorId) : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1830] sm:text-3xl">Vendors</h1>
          <p className="mt-1 text-sm text-[#8A85A0]">
            Manage the vendors working on your events.
          </p>
        </div>

        <Link
  to="/user/vendor-register" // Change to your route
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
      placeholder="Search vendors..."
      className="w-full rounded-xl border border-[#EDEBF7] bg-white py-2.5 pl-9 pr-3 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
    />
  </div>
</div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEBF7] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#EDEBF7] bg-[#FAFAFC] text-xs uppercase tracking-wide text-[#B0ACC4]">
                <th className="px-5 py-3.5 font-medium">Vendor</th>
                <th className="px-5 py-3.5 font-medium">Service</th>
                {/* <th className="px-5 py-3.5 font-medium">Contact</th> */}
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Packages</th>
                <th className="px-5 py-3.5 font-medium">Package Features</th>
                <th className="px-5 py-3.5 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => {
                const ServiceIcon = SERVICE_ICON[vendor.service] ?? Building2;
                return (
                  <tr
                    key={vendor.id}
                    className="border-t border-[#F4F2FA] align-top transition-colors hover:bg-[#FAFAFC]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-sm font-semibold text-white">
                          {vendor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1C1830]">{vendor.name}</p>
                          <p className="text-xs text-[#B0ACC4]">ID #{String(vendor.id).padStart(3, "0")}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#F4F2FA] px-3 py-1 text-xs font-medium text-[#5F5A78]">
                        <ServiceIcon size={13} />
                        {vendor.service}
                      </span>
                    </td>

                    {/* <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 text-xs text-[#5F5A78]">
                        <span className="flex items-center gap-1.5">
                          <Mail size={13} className="text-[#B0ACC4]" />
                          {vendor.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone size={13} className="text-[#B0ACC4]" />
                          {vendor.phone}
                        </span>
                      </div>
                    </td> */}

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${[vendor.status]}`}
                      >
                        {vendor.status}
                      </span>
                    </td>

                    {/* Packages column */}
                    <td className="px-5 py-4">
                      <div className="flex max-w-[180px] flex-col gap-1.5">
                        {vendor.packages.length === 0 && (
                          <span className="text-xs italic text-[#B0ACC4]">No packages yet</span>
                        )}
                        {vendor.packages.map((pkg) => {
                          const style = PACKAGE_STYLE[pkg.tier];
                          const TierIcon = style.icon;
                          return (
                            <span
                              key={pkg.id}
                              className={`group flex w-fit items-center gap-1.5 rounded-full py-1 pl-2.5 pr-1 text-xs font-semibold ${style.badge}`}
                            >
                              <TierIcon size={12} />
                              {pkg.tier}
                              <button
                                onClick={() => handleDeletePackage(vendor.id, pkg.id)}
                                title={`Remove ${pkg.tier} package`}
                                className="ml-0.5 flex items-center justify-center rounded-full p-0.5 text-current opacity-60 transition-opacity hover:bg-black/10 hover:opacity-100"
                              >
                                <X size={11} />
                              </button>
                            </span>
                          );
                        })}
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
                        {vendor.packages.map((pkg) => {
                          const style = PACKAGE_STYLE[pkg.tier];
                          return (
                            <div key={pkg.id} className="flex flex-col gap-1">
                              <span className="text-[11px] font-semibold text-[#8A85A0]">
                                {pkg.tier}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {pkg.features.length === 0 && (
                                  <span className="text-xs italic text-[#B0ACC4]">No features</span>
                                )}
                                {pkg.features.map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="flex items-center gap-1 rounded-md bg-[#F4F2FA] py-0.5 pl-2 pr-1 text-[11px] text-[#5F5A78]"
                                  >
                                    {feature}
                                    <button
                                      onClick={() => handleDeleteFeature(vendor.id, pkg.id, idx)}
                                      title="Remove feature"
                                      className="flex items-center justify-center rounded-full p-0.5 text-[#B0ACC4] transition-colors hover:bg-[#FDF0F0] hover:text-[#E5484D]"
                                    >
                                      <X size={10} />
                                    </button>
                                  </span>
                                ))}
                                <button
                                  onClick={() => openAddFeature(vendor.id, pkg.id)}
                                  title={`Add feature to ${pkg.tier}`}
                                  className="flex items-center justify-center rounded-md border border-dashed border-[#D8D4EC] px-1.5 py-0.5 text-[#7C6AEF] transition-colors hover:border-[#7C6AEF] hover:bg-[#F4F2FA]"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="View"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#F4F2FA] hover:text-[#7C6AEF]"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Edit"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FFF6E6] hover:text-[#B8790B]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          title="Delete"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FDF0F0] hover:text-[#E5484D]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Package / Add Feature modal */}
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

            {modal.type === "package" ? (
              <div className="mt-4 flex flex-col gap-2">
                <label className="text-xs font-medium text-[#5F5A78]">Package tier</label>
                <div className="flex gap-2">
                  {PACKAGE_TIERS.map((tier) => {
                    const style = PACKAGE_STYLE[tier];
                    const TierIcon = style.icon;
                    const selected = newTier === tier;
                    return (
                      <button
                        key={tier}
                        onClick={() => setNewTier(tier)}
                        className={`flex flex-1 flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                          selected
                            ? "border-[#7C6AEF] bg-[#F4F2FA] text-[#5B4BD1]"
                            : "border-[#EDEBF7] text-[#8A85A0] hover:border-[#D8D4EC]"
                        }`}
                      >
                        <TierIcon size={16} />
                        {tier}
                      </button>
                    );
                  })}
                </div>
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
                            {p.tier}
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
                className="rounded-xl px-4 py-2 text-sm font-medium text-[#8A85A0] transition-colors hover:bg-[#F4F2FA]"
              >
                Cancel
              </button>
              <button
                onClick={modal.type === "package" ? handleAddPackage : handleAddFeature}
                disabled={modal.type === "feature" && !activeVendor?.packages?.length}
                className="rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#5B4BD1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {modal.type === "package" ? "Add package" : "Add feature"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendors;