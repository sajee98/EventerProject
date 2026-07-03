import { useState } from "react";
import { Link } from "react-router-dom";

// ── Icon stubs (replace with your actual imports) ──────────────────────────
const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);
const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
  </svg>
);
const PhoneMiniIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MapPinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);
const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
  </svg>
);
const UsersMiniIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="9" cy="8" r="3" />
    <path strokeLinecap="round" d="M2 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5" />
    <path strokeLinecap="round" d="M16 8a3 3 0 110 6M18.5 14.4c2 .6 3.5 2.3 3.5 5.6" />
  </svg>
);
const BuildingIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path strokeLinecap="round" d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
  </svg>
);
const NoteIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h13l3 3v13H4z" />
    <path strokeLinecap="round" d="M8 9h8M8 13h8M8 17h5" />
  </svg>
);
const CardIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path strokeLinecap="round" d="M2 10h20" />
  </svg>
);
const CashIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const SpinnerIcon = ({ className }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);
const ChevronLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const ShieldIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);
const SparkleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 17l-1.8-5.8L4.6 9.4l5.6-1.8L12 2z" />
  </svg>
);
const CrownIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
  </svg>
);
const GemIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l4-6h10l4 6-9 12L3 9z" />
    <path strokeLinecap="round" d="M3 9h18M9 3l3 6 3-6" />
  </svg>
);
const MedalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="14" r="6" />
    <path strokeLinecap="round" d="M9 3l2 6h2l2-6M9 3H6l3 8M15 3h3l-3 8" />
  </svg>
);

//  Step config 
const STEPS = [
  { id: 1, label: "Your Details", Icon: UserIcon },
  { id: 2, label: "Event Details", Icon: CalendarIcon },
  { id: 3, label: "Payment", Icon: CardIcon },
];

const PACKAGES = [
  { name: "Gold", price: 120000, Icon: MedalIcon, blurb: "6hr · 50 photos · 1 photographer" },
  { name: "Diamond", price: 180000, Icon: GemIcon, blurb: "10hr · 100 photos · drone", popular: true },
  { name: "Platinum", price: 250000, Icon: CrownIcon, blurb: "Full day · 150 photos · video" },
];

const EVENT_TYPES = ["Wedding", "Corporate Event", "Birthday Party", "Private Gala", "Other"];

const InputField = ({ icon: Icon, error, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 w-[18px] h-[18px] text-gray-400" />
    <input
      {...props}
      className={`w-full rounded-xl border bg-white/70 pl-11 pr-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all duration-200
        ${error
          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
          : "border-gray-200 focus:border-[#648855] focus:ring-[#648855]/10"
        }`}
    />
  </div>
);

const Checkout = ({ vendorName = "LensArt Studio", vendorTitle = "Standard 4K Cinematography", defaultPackage = "Diamond" }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    packageName: defaultPackage,
    eventType: "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    venue: "",
    notes: "",
    paymentMethod: "cod",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const selectedPackage = PACKAGES.find((p) => p.name === form.packageName) ?? PACKAGES[0];
  const price = selectedPackage.price;

  //  Validation 
  const validateStep1 = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.eventType) e.eventType = "Select an event type";
    if (!form.eventDate) e.eventDate = "Event date is required";
    if (!form.eventTime) e.eventTime = "Event time is required";
    if (!form.guestCount || Number(form.guestCount) <= 0) e.guestCount = "Enter number of guests";
    if (!form.venue.trim()) e.venue = "Venue is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e = {};
    if (form.paymentMethod === "payhere") {
      if (!form.cardName.trim()) e.cardName = "Name on card is required";
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) e.cardNumber = "Enter a valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = "Format MM/YY";
      if (!/^\d{3,4}$/.test(form.cardCvc)) e.cardCvc = "Enter a valid CVC";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      const ref = `EVT-${Date.now().toString().slice(-8)}`;
      setOrderRef(ref);
      setOrderComplete(true);
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  //  Decorative background 
  const Backdrop = () => (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#648855]/20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#648855]/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,136,85,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );

  // ── Success screen ───────────────────────────────────────────────────
  if (orderComplete) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#648855]/5 via-white to-amber-50/40 px-4 py-16">
        <Backdrop />
        <div className="max-w-md w-full rounded-[2rem] border border-white bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(100,136,85,0.35)] p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#648855]/10 blur-2xl" />
          <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#648855] to-[#4d6b41] flex items-center justify-center mb-6 shadow-lg shadow-[#648855]/30 ring-8 ring-[#648855]/10">
            <CheckIcon className="w-9 h-9 text-white" />
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase text-[#648855] bg-[#648855]/10 px-3 py-1 rounded-full mb-3">
            <SparkleIcon className="w-3 h-3" /> Booking Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">You're all set!</h2>
          <p className="text-gray-500 mb-6 text-[15px] leading-relaxed">
            Thanks {form.fullName.split(" ")[0] || "there"}, your booking with{" "}
            <span className="text-[#648855] font-semibold">{vendorName}</span> has been received.
          </p>
          <div className="rounded-2xl bg-gradient-to-br from-[#648855]/5 to-transparent border border-[#648855]/15 px-5 py-4 mb-6 text-left space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference</span>
              <span className="font-mono font-semibold text-gray-900">{orderRef}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Package</span>
              <span className="font-semibold text-gray-900">{form.packageName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold text-gray-900">Rs.{price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-900">
                {form.paymentMethod === "cod" ? "Cash on Delivery" : "PayHere (Sandbox)"}
              </span>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-[#648855] hover:scale-[1.02] shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-10 py-10 sm:py-16 font-sans">
      <Backdrop />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-[#648855] font-semibold uppercase tracking-widest text-xs bg-[#648855]/10 px-4 py-1.5 rounded-full">
            <ShieldIcon className="w-3.5 h-3.5" /> Secure Checkout
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Complete Your Booking
          </h1>
          <p className="mt-3 text-gray-500">
            You're booking <span className="text-[#648855] font-semibold">{vendorTitle}</span> with{" "}
            <span className="text-gray-800 font-semibold">{vendorName}</span>
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12 max-w-lg mx-auto">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${step === s.id
                      ? "bg-gradient-to-br from-[#648855] to-[#4d6b41] text-white shadow-lg shadow-[#648855]/40 scale-110 ring-4 ring-[#648855]/15"
                      : step > s.id
                      ? "bg-[#648855]/15 text-[#648855]"
                      : "bg-white text-gray-300 border border-gray-200"
                    }`}
                >
                  {step > s.id ? <CheckIcon className="w-5 h-5" /> : <s.Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`mt-2.5 text-[11px] sm:text-xs font-semibold text-center transition-colors ${
                    step >= s.id ? "text-[#648855]" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-[3px] mx-2 sm:mx-3 mb-5 rounded-full bg-gray-200 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#648855] to-[#4d6b41] rounded-full transition-all duration-500"
                    style={{ width: step > s.id ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* MAIN FORM CARD */}
          <div className="lg:col-span-2 rounded-[2rem] border border-white bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(100,136,85,0.3)] p-6 sm:p-9 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#648855]/5 blur-3xl pointer-events-none" />

            {/* STEP 1 — Customer Details */}
            {step === 1 && (
              <div className="space-y-6 relative">
                <div>
                  <span className="text-[#648855] text-xs font-bold tracking-widest uppercase">Step 1 of 3</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Your Details</h2>
                  <p className="text-gray-500 text-sm mt-1.5">Tell us who we're booking this for.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <InputField icon={UserIcon} type="text" value={form.fullName} onChange={update("fullName")} placeholder="e.g. Nethmi Perera" error={errors.fullName} />
                    {errors.fullName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <InputField icon={MailIcon} type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" error={errors.email} />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <InputField icon={PhoneMiniIcon} type="tel" value={form.phone} onChange={update("phone")} placeholder="+94 77 123 4567" error={errors.phone} />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Billing Address</label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-4 top-4 w-[18px] h-[18px] text-gray-400" />
                      <textarea
                        rows={3}
                        value={form.address}
                        onChange={update("address")}
                        placeholder="Street, city, postal code"
                        className={`w-full rounded-xl border bg-white/70 pl-11 pr-4 py-3 text-[15px] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-4 transition-all duration-200
                          ${errors.address ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-[#648855] focus:ring-[#648855]/10"}`}
                      />
                    </div>
                    {errors.address && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.address}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Event Details */}
            {step === 2 && (
              <div className="space-y-6 relative">
                <div>
                  <span className="text-[#648855] text-xs font-bold tracking-widest uppercase">Step 2 of 3</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Event Details</h2>
                  <p className="text-gray-500 text-sm mt-1.5">Help us prepare for your special day.</p>
                </div>

                {/* Package cards */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2.5">Choose Your Package</label>
                  <div className="grid sm:grid-cols-3 gap-3.5">
                    {PACKAGES.map((pkg) => {
                      const active = form.packageName === pkg.name;
                      return (
                        <button
                          key={pkg.name}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, packageName: pkg.name }))}
                          className={`relative text-left rounded-2xl border-2 p-4 transition-all duration-200
                            ${active
                              ? "border-[#648855] bg-gradient-to-br from-[#648855]/10 to-transparent shadow-lg shadow-[#648855]/10 -translate-y-0.5"
                              : "border-gray-200 bg-white/60 hover:border-[#648855]/40 hover:-translate-y-0.5"
                            }`}
                        >
                          {pkg.popular && (
                            <span className="absolute -top-2.5 right-3 bg-[#648855] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                              POPULAR
                            </span>
                          )}
                          <pkg.Icon className={`w-6 h-6 mb-2 ${active ? "text-[#648855]" : "text-gray-400"}`} />
                          <p className="font-bold text-gray-900">{pkg.name}</p>
                          <p className="text-[#648855] font-bold text-sm mt-0.5">Rs.{pkg.price.toLocaleString()}</p>
                          <p className="text-[11px] text-gray-500 mt-1 leading-snug">{pkg.blurb}</p>
                          {active && (
                            <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-[#648855] flex items-center justify-center">
                              <CheckIcon className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Type</label>
                    <div className="relative">
                      <BuildingIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 z-10" />
                      <select
                        value={form.eventType}
                        onChange={update("eventType")}
                        className={`w-full rounded-xl border bg-white/70 pl-11 pr-4 py-3 text-[15px] focus:outline-none focus:ring-4 transition-all duration-200 appearance-none
                          ${errors.eventType ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-[#648855] focus:ring-[#648855]/10"}`}
                      >
                        <option value="">Select event type</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    {errors.eventType && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.eventType}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Guests</label>
                    <InputField icon={UsersMiniIcon} type="number" min="1" value={form.guestCount} onChange={update("guestCount")} placeholder="e.g. 150" error={errors.guestCount} />
                    {errors.guestCount && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.guestCount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Date</label>
                    <InputField icon={CalendarIcon} type="date" value={form.eventDate} onChange={update("eventDate")} error={errors.eventDate} />
                    {errors.eventDate && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.eventDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Time</label>
                    <InputField icon={ClockIcon} type="time" value={form.eventTime} onChange={update("eventTime")} error={errors.eventTime} />
                    {errors.eventTime && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.eventTime}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Venue</label>
                    <InputField icon={MapPinIcon} type="text" value={form.venue} onChange={update("venue")} placeholder="Venue name & location" error={errors.venue} />
                    {errors.venue && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.venue}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes (optional)</label>
                    <div className="relative">
                      <NoteIcon className="absolute left-4 top-4 w-[18px] h-[18px] text-gray-400" />
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={update("notes")}
                        placeholder="Any special requests..."
                        className="w-full rounded-xl border border-gray-200 bg-white/70 pl-11 pr-4 py-3 text-[15px] placeholder:text-gray-400 resize-none focus:border-[#648855] focus:ring-4 focus:ring-[#648855]/10 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step === 3 && (
              <div className="space-y-6 relative">
                <div>
                  <span className="text-[#648855] text-xs font-bold tracking-widest uppercase">Step 3 of 3</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Payment</h2>
                  <p className="text-gray-500 text-sm mt-1.5">Choose how you'd like to pay.</p>
                </div>

                {/* Method selector */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, paymentMethod: "cod" }))}
                    className={`flex items-center gap-3.5 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200
                      ${form.paymentMethod === "cod"
                        ? "border-[#648855] bg-gradient-to-br from-[#648855]/10 to-transparent shadow-md shadow-[#648855]/10"
                        : "border-gray-200 bg-white/60 hover:border-[#648855]/40"
                      }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${form.paymentMethod === "cod" ? "bg-[#648855] text-white" : "bg-gray-100 text-gray-400"}`}>
                      <CashIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when service is rendered</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, paymentMethod: "payhere" }))}
                    className={`flex items-center gap-3.5 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200
                      ${form.paymentMethod === "payhere"
                        ? "border-[#648855] bg-gradient-to-br from-[#648855]/10 to-transparent shadow-md shadow-[#648855]/10"
                        : "border-gray-200 bg-white/60 hover:border-[#648855]/40"
                      }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${form.paymentMethod === "payhere" ? "bg-[#648855] text-white" : "bg-gray-100 text-gray-400"}`}>
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">PayHere</p>
                      <p className="text-xs text-gray-500">Sandbox test payment</p>
                    </div>
                  </button>
                </div>

                {/* COD info */}
                {form.paymentMethod === "cod" && (
                  <div className="rounded-2xl bg-gradient-to-br from-[#648855]/8 to-transparent border border-[#648855]/20 px-5 py-4 text-sm text-gray-600 flex gap-3">
                    <CashIcon className="w-5 h-5 text-[#648855] shrink-0 mt-0.5" />
                    <p>
                      You've selected <span className="font-semibold text-[#648855]">Cash on Delivery</span>.
                      Payment of <span className="font-semibold text-gray-900">Rs.{price.toLocaleString()}</span> will
                      be collected on the day of the event. A confirmation call will follow shortly after booking.
                    </p>
                  </div>
                )}

                {/* PayHere sandbox card form */}
                {form.paymentMethod === "payhere" && (
                  <div className="space-y-4 rounded-2xl bg-gradient-to-br from-white/80 to-[#648855]/5 border border-[#648855]/15 p-5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-xs text-amber-700 font-semibold w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Sandbox Mode — no real charges
                      </div>
                      <span className="text-xs font-bold tracking-widest text-[#648855]">PAYHERE</span>
                    </div>

                    {/* Mini card preview */}
                    <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 p-5 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
                      <div className="absolute -right-2 top-10 w-16 h-16 rounded-full bg-white/5" />
                      <div className="flex justify-between items-start mb-8 relative">
                        <div className="w-9 h-7 rounded bg-gradient-to-br from-amber-300 to-amber-500" />
                        <CardIcon className="w-6 h-6 text-white/70" />
                      </div>
                      <p className="font-mono text-lg tracking-widest mb-4 relative">
                        {form.cardNumber ? formatCardNumber(form.cardNumber) : "•••• •••• •••• ••••"}
                      </p>
                      <div className="flex justify-between text-xs relative">
                        <div>
                          <p className="text-white/50 mb-0.5">CARD HOLDER</p>
                          <p className="font-medium uppercase tracking-wide">{form.cardName || "YOUR NAME"}</p>
                        </div>
                        <div>
                          <p className="text-white/50 mb-0.5">EXPIRES</p>
                          <p className="font-medium">{form.cardExpiry || "MM/YY"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Name on Card</label>
                      <InputField icon={UserIcon} type="text" value={form.cardName} onChange={update("cardName")} placeholder="Nethmi Perera" error={errors.cardName} />
                      {errors.cardName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.cardName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                      <InputField
                        icon={CardIcon}
                        type="text"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={(e) => setForm((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                        placeholder="4111 1111 1111 1111"
                        maxLength={19}
                        error={errors.cardNumber}
                      />
                      {errors.cardNumber && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry (MM/YY)</label>
                        <InputField
                          icon={CalendarIcon}
                          type="text"
                          value={form.cardExpiry}
                          onChange={(e) => setForm((p) => ({ ...p, cardExpiry: formatExpiry(e.target.value) }))}
                          placeholder="12/28"
                          maxLength={5}
                          error={errors.cardExpiry}
                        />
                        {errors.cardExpiry && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CVC</label>
                        <InputField icon={ShieldIcon} type="text" inputMode="numeric" value={form.cardCvc} onChange={update("cardCvc")} placeholder="123" maxLength={4} error={errors.cardCvc} />
                        {errors.cardCvc && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
                    {errors.submit}
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-9 pt-6 border-t border-gray-100 relative">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || isSubmitting}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors
                  ${step === 1
                    ? "opacity-0 pointer-events-none"
                    : "text-[#648855] border border-[#648855]/30 hover:bg-[#648855]/5"
                  }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full bg-gray-900 font-semibold text-white text-sm transition-all duration-200 hover:bg-[#648855] hover:scale-105 shadow-lg hover:shadow-[#648855]/30"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-200 shadow-lg
                    ${isSubmitting ? "bg-[#648855]/70 cursor-not-allowed" : "bg-gradient-to-r from-[#648855] to-[#4d6b41] hover:scale-105 hover:shadow-[#648855]/40"}`}
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon className="w-4 h-4" />
                      Processing...
                    </>
                  ) : form.paymentMethod === "cod" ? (
                    "Confirm Booking"
                  ) : (
                    "Pay Now"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-[2rem] border border-white bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(100,136,85,0.3)] p-6 sm:p-7 sticky top-6 overflow-hidden relative">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#648855] to-[#4d6b41] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                  {vendorName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{vendorName}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified vendor
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 relative">
                <SparkleIcon className="w-4 h-4 text-[#648855]" /> Order Summary
              </h3>

              <div className="space-y-3 text-sm relative">
                <div className="flex justify-between">
                  <span className="text-gray-500">Package</span>
                  <span className="font-semibold text-gray-900 inline-flex items-center gap-1.5">
                    <selectedPackage.Icon className="w-4 h-4 text-[#648855]" />
                    {form.packageName}
                  </span>
                </div>
                {form.eventType && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Event Type</span>
                    <span className="font-medium text-gray-900">{form.eventType}</span>
                  </div>
                )}
                {form.eventDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-900">{form.eventDate}</span>
                  </div>
                )}
                {form.eventTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-900">{form.eventTime}</span>
                  </div>
                )}
                {form.guestCount && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests</span>
                    <span className="font-medium text-gray-900">{form.guestCount}</span>
                  </div>
                )}
              </div>

              <div className="my-5 border-t border-dashed border-gray-200 relative" />

              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Subtotal</span>
                  <span className="font-medium text-gray-900">Rs.{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Service Fee</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 pt-5 border-t border-gray-200 relative">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#648855] to-[#4d6b41] bg-clip-text text-transparent">
                  Rs.{price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-md p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldIcon className="w-5 h-5 text-[#648855] shrink-0" />
                Secure & encrypted checkout
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckIcon className="w-5 h-5 text-[#648855] shrink-0" />
                Free cancellation up to 7 days before
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <SparkleIcon className="w-5 h-5 text-[#648855] shrink-0" />
                Trusted by 250+ happy clients
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;