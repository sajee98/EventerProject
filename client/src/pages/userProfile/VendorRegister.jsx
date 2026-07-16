import { useState, useRef } from "react";
import {
  Store,
  Tag,
  Phone,
  Mail,
  MapPin,
  Link2,
  AtSign,
  Music2,
  ImagePlus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { createVendor } from "../../api/vendorApi"; 

const CATEGORIES = [
  { id: 1, name: "Photography & Video" },
  { id: 2, name: "Catering" },
  { id: 3, name: "Decoration" },
  { id: 4, name: "Sound & Lighting" },
  { id: 5, name: "Venue" },
  { id: 6, name: "Entertainment" },
];

const PATTERNS = {
  phone: /^(?:\+94|0)\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
  tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@.+/i,
};

const INITIAL_FORM = {
  vendorName: "",
  vendorCategoryId: "",
  phone: "",
  email: "",
  address: "",
  facebook: "",
  instagram: "",
  tiktok: "",
};

function validateField(name, value) {
  switch (name) {
    case "vendorName":
      if (!value.trim()) return "Business name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      if (value.trim().length > 60) return "Name must be under 60 characters.";
      return "";
    case "vendorCategoryId":
      if (!value) return "Select a category.";
      return "";
    case "phone":
      if (!value.trim()) return "Phone number is required.";
      if (!PATTERNS.phone.test(value.trim())) return "Enter a valid number, e.g. 0771234567.";
      return "";
    case "email":
      if (!value.trim()) return "Email address is required.";
      if (!PATTERNS.email.test(value.trim())) return "Enter a valid email address.";
      return "";
    case "address":
      if (!value.trim()) return "Business address is required.";
      if (value.trim().length < 10) return "Add a more complete address.";
      return "";
    case "facebook":
      if (value.trim() && !PATTERNS.facebook.test(value.trim()))
        return "Must be a facebook.com profile link.";
      return "";
    case "instagram":
      if (value.trim() && !PATTERNS.instagram.test(value.trim()))
        return "Must be an instagram.com profile link.";
      return "";
    case "tiktok":
      if (value.trim() && !PATTERNS.tiktok.test(value.trim()))
        return "Must be a tiktok.com/@handle link.";
      return "";
    default:
      return "";
  }
}

function VendorRegister() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const categoryName = CATEGORIES.find((c) => String(c.id) === String(form.vendorCategoryId))?.name;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateLogo = (file) => {
    // Logo is optional on the backend right now, so no "required" check here.
    if (!file) return "";
    if (!file.type.startsWith("image/")) return "File must be an image.";
    if (file.size > 2 * 1024 * 1024) return "Image must be under 2MB.";
    return "";
  };

  const handleLogoSelect = (file) => {
    const error = validateLogo(file);
    setLogoError(error);
    if (!error && file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleLogoSelect(file);
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    setLogoError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const runFullValidation = () => {
    const nextErrors = {};
    Object.keys(INITIAL_FORM).forEach((field) => {
      nextErrors[field] = validateField(field, form[field]);
    });
    setErrors(nextErrors);
    setTouched(Object.keys(INITIAL_FORM).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    const logoValidation = validateLogo(logo);
    setLogoError(logoValidation);

    return Object.values(nextErrors).every((msg) => !msg) && !logoValidation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!runFullValidation()) return;

    setIsSubmitting(true);
    try {
      const body = new FormData();
      body.append("VendorCategoryId", form.vendorCategoryId);
      body.append("VendorName", form.vendorName.trim());
      body.append("Phone", form.phone.trim());
      body.append("Email", form.email.trim());
      body.append("Address", form.address.trim());
      if (form.facebook.trim()) body.append("Facebook", form.facebook.trim());
      if (form.instagram.trim()) body.append("Instagram", form.instagram.trim());
      if (form.tiktok.trim()) body.append("Tiktok", form.tiktok.trim());
      if (logo) body.append("logo", logo);

      // No manual token/header needed — the axios instance sends the auth
      // cookie automatically as long as it's created with withCredentials: true.
      const data = await createVendor(body);

      if (!data.success) {
        throw new Error(data.message || "Failed to register vendor.");
      }

      setIsSuccess(true);
    } catch (err) {
      if (err?.response?.status === 401) {
        setErrors((prev) => ({
          ...prev,
          submit: "Your session expired. Please log in again.",
        }));
      } else if (err?.response?.status === 400) {
        setErrors((prev) => ({
          ...prev,
          submit: err.response.data?.message || "Maximum 3 vendors allowed.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: err?.response?.data?.message || err.message || "Something went wrong. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-6 text-center">
        <style>{`
          @keyframes popIn { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
          .animate-pop { animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
        `}</style>
        <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-[#F1EFFD]">
          <CheckCircle2 size={40} className="text-[#7C6AEF]" strokeWidth={1.8} />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[#1C1830]">Application submitted</h2>
        <p className="mt-2 max-w-sm text-sm text-[#8A85A0]">
          Thanks for registering <strong className="font-semibold text-[#1C1830]">{form.vendorName}</strong>.
          You can now add packages and features from the Vendors table.
        </p>
        <button
          onClick={() => {
            setForm(INITIAL_FORM);
            setTouched({});
            setErrors({});
            removeLogo();
            setIsSuccess(false);
          }}
          className="mt-8 rounded-xl border border-[#EDEBF7] px-5 py-2.5 text-sm font-semibold text-[#5F5A78] hover:bg-[#F4F2FA]"
        >
          Register another vendor
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#1C1830] sm:text-3xl">Register a vendor</h1>
        <p className="mt-1 text-sm text-[#8A85A0]">
          Add a new vendor profile so they can start receiving bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left — form fields */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Business info card */}
          <section className="rounded-2xl border border-[#EDEBF7] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-[#1C1830]">Business information</h2>

            {/* Logo upload */}
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-semibold text-[#5F5A78]">Business logo</label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={[
                  "flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-4 transition-colors",
                  logoError ? "border-[#F0CBC9] bg-[#FDF5F4]" : "border-[#E3E0F0] bg-[#FAFAFC] hover:bg-[#F4F2FA]",
                ].join(" ")}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="h-14 w-14 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F1EFFD] text-[#7C6AEF]">
                    <ImagePlus size={22} strokeWidth={1.8} />
                  </div>
                )}

                <div className="flex-1 text-sm">
                  <p className="font-medium text-[#1C1830]">
                    {logo ? logo.name : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-xs text-[#B0ACC4]">PNG or JPG, up to 2MB (optional)</p>
                </div>

                {logo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLogo();
                    }}
                    className="rounded-lg p-1.5 text-[#B0ACC4] hover:bg-[#F1EFFD] hover:text-[#7C6AEF]"
                  >
                    <X size={16} />
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoSelect(e.target.files?.[0])}
                />
              </div>
              {logoError && <FieldError message={logoError} />}
            </div>

            {/* Name */}
            <Field
              label="Business name"
              name="vendorName"
              icon={Store}
              value={form.vendorName}
              placeholder="Dream Decor"
              error={touched.vendorName && errors.vendorName}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {/* Category */}
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-semibold text-[#5F5A78]">Category</label>
              <div className="relative">
                <Tag size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0ACC4]" />
                <select
                  name="vendorCategoryId"
                  value={form.vendorCategoryId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass(touched.vendorCategoryId && errors.vendorCategoryId, "appearance-none")}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {touched.vendorCategoryId && errors.vendorCategoryId && (
                <FieldError message={errors.vendorCategoryId} />
              )}
            </div>
          </section>

          {/* Contact card */}
          <section className="rounded-2xl border border-[#EDEBF7] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-[#1C1830]">Contact details</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Phone number"
                name="phone"
                icon={Phone}
                value={form.phone}
                placeholder="0771234567"
                error={touched.phone && errors.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                label="Email address"
                name="email"
                icon={Mail}
                type="email"
                value={form.email}
                placeholder="you@business.com"
                error={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-semibold text-[#5F5A78]">Address</label>
              <div className="relative">
                <MapPin size={17} className="pointer-events-none absolute left-3.5 top-3 text-[#B0ACC4]" />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={2}
                  placeholder="123 Galle Road, Colombo 03"
                  className={inputClass(touched.address && errors.address, "resize-none pt-2.5")}
                />
              </div>
              {touched.address && errors.address && <FieldError message={errors.address} />}
            </div>
          </section>

          {/* Social links card */}
          <section className="rounded-2xl border border-[#EDEBF7] bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-base font-semibold text-[#1C1830]">Social links</h2>
            <p className="mb-5 text-xs text-[#B0ACC4]">Optional — helps customers find and trust the vendor.</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Facebook"
                name="facebook"
                icon={Link2}
                value={form.facebook}
                placeholder="https://facebook.com/yourbusiness"
                error={touched.facebook && errors.facebook}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                label="Instagram"
                name="instagram"
                icon={AtSign}
                value={form.instagram}
                placeholder="https://instagram.com/yourbusiness"
                error={touched.instagram && errors.instagram}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                label="TikTok"
                name="tiktok"
                icon={Music2}
                value={form.tiktok}
                placeholder="https://tiktok.com/@yourbusiness"
                error={touched.tiktok && errors.tiktok}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </section>
        </div>

        {/* Right — live preview + submit */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 flex flex-col gap-6">
            <section className="rounded-2xl border border-[#EDEBF7] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#B0ACC4]">
                <Sparkles size={13} />
                Live preview
              </div>

              <div className="flex items-center gap-3">
                {logoPreview ? (
                  <img src={logoPreview} alt="" className="h-12 w-12 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-sm font-semibold text-white">
                    {form.vendorName ? form.vendorName.charAt(0).toUpperCase() : <Store size={18} />}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#1C1830]">
                    {form.vendorName || "Business name"}
                  </p>
                  {categoryName && (
                    <p className="truncate text-xs text-[#B0ACC4]">{categoryName}</p>
                  )}
                </div>
              </div>

              {categoryName && (
                <span className="mt-4 inline-block rounded-full bg-[#F1EFFD] px-3 py-1 text-xs font-medium text-[#5B4BD1]">
                  {categoryName}
                </span>
              )}

              <div className="mt-4 flex flex-col gap-2 border-t border-[#F4F2FA] pt-4 text-xs text-[#5F5A78]">
                <span className="flex items-center gap-1.5">
                  <Phone size={13} className="text-[#B0ACC4]" />
                  {form.phone || "Not provided yet"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-[#B0ACC4]" />
                  {form.email || "Not provided yet"}
                </span>
              </div>
            </section>

            {errors.submit && (
              <div className="rounded-xl bg-[#FDF5F4] px-4 py-3">
                <FieldError message={errors.submit} />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#5B4BD1] py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Submitting application...
                </>
              ) : (
                "Submit application"
              )}
            </button>

            <p className="text-center text-xs text-[#B0ACC4]">
              By submitting, the vendor agrees to the platform's terms of service.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, name, icon: Icon, type = "text", value, placeholder, error, onChange, onBlur }) {
  return (
    <div>
      {label && <label className="mb-1.5 block text-xs font-semibold text-[#5F5A78]">{label}</label>}
      <div className="relative">
        <Icon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0ACC4]" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClass(error)}
        />
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

function FieldError({ message }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#C0524A]">
      <AlertCircle size={13} />
      {message}
    </p>
  );
}

function inputClass(hasError, extra = "") {
  return [
    "w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:outline-none focus:ring-4",
    hasError
      ? "border-[#F0CBC9] focus:border-[#E5484D] focus:ring-[#E5484D]/10"
      : "border-[#E3E0F0] focus:border-[#7C6AEF] focus:ring-[#7C6AEF]/15",
    extra,
  ].join(" ");
}

export default VendorRegister;