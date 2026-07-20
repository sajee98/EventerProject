import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  UtensilsCrossed,
  Palette,
  Music,
  Building2,
  Mail,
  Phone,
  Tag,
  ToggleLeft,
  ToggleRight,
  Save,
} from "lucide-react";
import { getVendorById, updateVendor, patchVendor } from "../../api/vendorApi";
import { resolveImageUrl } from "../../utils/imageUrl";

const SERVICE_ICON = {
  Catering: UtensilsCrossed,
  Decoration: Palette,
  "Sound & Lighting": Music,
};

function mapVendorToForm(v) {
  return {
    vendorName: (v.vendorName && v.vendorName.trim()) || v.slug || "",
    email: v.email || "",
    phone: v.phone || "",
    isActive: !!v.isActive,
    logoImg: v.logoImg || null,
    categoryName: v.vendorCategory?.name ?? v.categoryName ?? "Uncategorized",
  };
}

function EditVendor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(null); // current form values
  const [initialForm, setInitialForm] = useState(null); // last-saved snapshot

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const [logoBroken, setLogoBroken] = useState(false);

  const [statusSubmitting, setStatusSubmitting] = useState(false);
  const [statusError, setStatusError] = useState("");

  const fetchVendor = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getVendorById(id);
      const vendor = data?.vendor ?? data;
      const mapped = mapVendorToForm(vendor);
      setForm(mapped);
      setInitialForm(mapped);
    } catch (err) {
      setLoadError(
        err?.response?.data?.message ||
          "Failed to load vendor details. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  // Status is saved instantly via the toggle (PATCH), so it's excluded here —
  // this only tracks the fields submitted through the main "Save changes" button.
  const isDirty =
    form && initialForm
      ? form.vendorName !== initialForm.vendorName ||
        form.email !== initialForm.email ||
        form.phone !== initialForm.phone
      : false;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
    setSubmitError("");
  };

  const validate = () => {
    if (!form.vendorName.trim()) return "Vendor name is required.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setSubmitError("");
    setSubmitting(true);
    try {
      await updateVendor(id, {
        vendorName: form.vendorName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setInitialForm(form);
      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          "Failed to update vendor. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async () => {
    if (statusSubmitting || !form) return;
    const nextActive = !form.isActive;

    setStatusError("");
    setStatusSubmitting(true);
    // Optimistically flip the switch, then confirm with the server.
    setForm((prev) => ({ ...prev, isActive: nextActive }));
    try {
      await patchVendor(id, nextActive);
      setInitialForm((prev) =>
        prev ? { ...prev, isActive: nextActive } : prev,
      );
    } catch (err) {
      // Roll back on failure.
      setForm((prev) => ({ ...prev, isActive: !nextActive }));
      setStatusError(
        err?.response?.data?.message ||
          "Failed to update status. Please try again.",
      );
    } finally {
      setStatusSubmitting(false);
    }
  };

  const ServiceIcon = form
    ? (SERVICE_ICON[form.categoryName] ?? Building2)
    : Building2;

  // Save button is disabled while submitting, while there are no unsaved
  // changes, or right after a successful save (until the user edits again).
  const saveDisabled = submitting || !isDirty || success;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/user/vendors"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EDEBF7] bg-white text-[#8A85A0] transition-colors hover:bg-[#F4F2FA] hover:text-[#1C1830]"
        >
          <ArrowLeft size={17} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1C1830] sm:text-3xl">
            Edit Vendor
          </h1>
          <p className="mt-1 text-sm text-[#8A85A0]">
            Update this vendor's basic details.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#EDEBF7] bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-[#8A85A0]">
            <Loader2 size={18} className="animate-spin" />
            Loading vendor...
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <AlertCircle size={20} className="text-[#E5484D]" />
            <p className="text-sm text-[#C0524A]">{loadError}</p>
            <button
              onClick={fetchVendor}
              className="rounded-xl bg-[#F4F2FA] px-4 py-2 text-sm font-medium text-[#5F5A78] transition-colors hover:bg-[#EDEBF7]"
            >
              Try again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Profile strip */}
            <div className="flex flex-col items-center gap-3 border-b border-[#F0EEFA] bg-gradient-to-b from-[#FAFAFC] to-white px-6 py-7 text-center sm:px-8">
              {form.logoImg && !logoBroken ? (
                <img
                  src={resolveImageUrl(form.logoImg)}
                  alt=""
                  onError={() => setLogoBroken(true)}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-2xl font-bold text-white ring-4 ring-white shadow-md">
                  {form.vendorName?.charAt(0) ?? "V"}
                </div>
              )}
              <div>
                <p className="text-lg font-bold text-[#1C1830]">
                  {form.vendorName || "Unnamed vendor"}
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#F4F2FA] px-3 py-1 text-xs font-medium text-[#5F5A78]">
                  <ServiceIcon size={13} />
                  {form.categoryName}
                </span>
              </div>
            </div>

            {/* Two-column field grid */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 px-6 py-7 sm:grid-cols-2 sm:px-8">
              {/* Vendor name */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#5F5A78]">
                  Vendor name
                </label>
                <input
                  type="text"
                  value={form.vendorName}
                  onChange={(e) => handleChange("vendorName", e.target.value)}
                  placeholder="e.g. Spice Route Catering"
                  className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3.5 py-2.5 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] transition-colors focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5F5A78]">
                  <Mail size={13} />
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="vendor@example.com"
                  className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3.5 py-2.5 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] transition-colors focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5F5A78]">
                  <Phone size={13} />
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="w-full rounded-xl border border-[#EDEBF7] bg-white px-3.5 py-2.5 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] transition-colors focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
                />
              </div>

              {/* Category (read-only) */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5F5A78]">
                  <Tag size={13} />
                  Service category
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-[#EDEBF7] bg-[#FAFAFC] px-3.5 py-2.5 text-sm text-[#8A85A0]">
                  <ServiceIcon size={14} />
                  {form.categoryName}
                </div>
              </div>

              {/* Status toggle — true/false switch, saved instantly via PATCH */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5F5A78]">
                  Status
                </label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.isActive}
                  onClick={handleToggleStatus}
                  disabled={statusSubmitting}
                  className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                    form.isActive
                      ? "border-[#BFEBD9] bg-[#EAFBF3]"
                      : "border-[#EDEBF7] bg-[#FAFAFC]"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      form.isActive ? "text-[#188F65]" : "text-[#8A85A0]"
                    }`}
                  >
                    {form.isActive ? "Active (true)" : "Inactive (false)"}
                  </span>
                  {statusSubmitting ? (
                    <Loader2
                      size={22}
                      className={`animate-spin ${
                        form.isActive ? "text-[#188F65]" : "text-[#B0ACC4]"
                      }`}
                    />
                  ) : form.isActive ? (
                    <ToggleRight size={26} className="text-[#188F65]" />
                  ) : (
                    <ToggleLeft size={26} className="text-[#B0ACC4]" />
                  )}
                </button>
                {statusError && (
                  <p className="flex items-center gap-1.5 text-xs font-medium text-[#C0524A]">
                    <AlertCircle size={12} />
                    {statusError}
                  </p>
                )}
              </div>

              {/* Feedback */}
              {submitError && (
                <div className="flex items-center gap-2 rounded-xl bg-[#FDF5F4] px-4 py-3 text-sm text-[#C0524A] sm:col-span-2">
                  <AlertCircle size={15} className="shrink-0" />
                  {submitError}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 rounded-xl bg-[#EAFBF3] px-4 py-3 text-sm text-[#188F65] sm:col-span-2">
                  <CheckCircle2 size={15} className="shrink-0" />
                  Vendor updated successfully.
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t border-[#F0EEFA] bg-[#FAFAFC] px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => navigate("/user/vendors")}
                disabled={submitting}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#8A85A0] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveDisabled}
                title={
                  !isDirty && !success
                    ? "No changes to save"
                    : success
                      ? "Already saved"
                      : undefined
                }
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#5B4BD1] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:shadow-none"
              >
                {submitting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {submitting ? "Saving..." : success ? "Saved" : "Save changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditVendor;
