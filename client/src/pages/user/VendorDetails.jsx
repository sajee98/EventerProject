import { useState } from "react";
import { Link } from "react-router-dom";

import couples from "../../assets/couples.jpg";

// ── Icon stubs (replace with your actual imports) ──────────────────────────
const CiHeart = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const PiUsersLight = ({ className }) => (
  <svg className={className} viewBox="0 0 256 256" fill="currentColor">
    <path d="M117.25 157.92a60 60 0 1 0-66.5 0A95.83 95.83 0 0 0 3.53 195.63a8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07Z" />
  </svg>
);
const IoEyeOutline = ({ className }) => (
  <svg className={className} viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth={32}>
    <path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z" />
    <circle cx="256" cy="256" r="80" />
  </svg>
);
const PhoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const LocationIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Gallery data ────────────────────────────────────────────────────────────
const galleryData = {
  Weddings: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=600",
    "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21f?w=600",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
    "https://images.unsplash.com/photo-1522673607200-593c0b2f1c92?w=600",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  ],
  "Corporate Events": [
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
    "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600",
  ],
  Birthdays: [
    "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600",
    "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
    "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
    "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
    "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600",
  ],
  "Private Galas": [
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
  ],
};

const VendorDetails = ({
  logoUrl = "",
  vendorName = "LensArt Studio",
  title = "Standard 4K Cinematography",
  likes = 900,
  bookings = 900,
  views = 900,
  phone = "+94 77 123 4567",
  location = "Colombo, Sri Lanka",
}) => {
  // hooks and state are now INSIDE the component
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [activeTag, setActiveTag] = useState("Weddings");

  const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}+`);

  const stats = [
    { Icon: CiHeart,      value: fmt(likes),    label: "Likes",    color: "text-rose-300"    },
    { Icon: PiUsersLight, value: fmt(bookings),  label: "Bookings", color: "text-sky-300"     },
    { Icon: IoEyeOutline, value: fmt(views),     label: "Views",    color: "text-emerald-300" },
  ];

  return (
    <div className="w-full overflow-x-hidden font-sans">

      {/*  HERO  */}
      <div className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">

        {/* Background image */}
        {!imgError ? (
          <img
            src={couples}
            alt={title}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Logo box — top-left */}
        <div className="absolute top-5 left-5 sm:top-7 sm:left-8 md:top-8 md:left-12
                        flex items-center gap-3
                        bg-white/10 backdrop-blur-md border border-white/20
                        rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0
                          bg-white/20 flex items-center justify-center">
            {logoUrl && !logoError ? (
              <img
                src={logoUrl}
                alt={vendorName}
                onError={() => setLogoError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg sm:text-xl leading-none select-none">
                {vendorName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm sm:text-base leading-tight">
              {vendorName}
            </p>
            <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] sm:text-xs
                             text-emerald-300 font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified
            </span>
          </div>
        </div>

        {/* Content row */}
        <div className="relative w-full px-5 sm:px-8 md:px-12 pb-6 sm:pb-8 md:pb-10
                        flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          {/* LEFT — title + contact */}
          <div className="max-w-xl">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold
                             bg-white/10 backdrop-blur-sm border border-white/20 text-white/80
                             tracking-widest uppercase">
              Videography
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white
                           leading-tight drop-shadow-md mb-4">
              {title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                           bg-white/10 backdrop-blur-sm border border-white/20 text-white
                           hover:bg-white/20 transition-colors duration-200"
              >
                <PhoneIcon className="w-4 h-4 shrink-0 text-emerald-300" />
                <span>{phone}</span>
              </a>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                              bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                <LocationIcon className="w-4 h-4 shrink-0 text-rose-300" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — stats box */}
          <div className="flex flex-row sm:flex-col gap-3 sm:gap-2">
            <div className="flex sm:flex-col flex-row gap-0 divide-x sm:divide-x-0 sm:divide-y
                            divide-white/15 rounded-2xl overflow-hidden
                            bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              {stats.map(({ Icon, value, label, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center px-5 py-4 sm:px-6 sm:py-5
                             hover:bg-white/10 transition-colors duration-200 group cursor-default"
                >
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 mb-1.5 ${color}
                                    group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xl sm:text-2xl font-bold text-white leading-none">
                    {value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/60 mt-0.5 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/*  OUR STORY  */}
      <section className="w-full bg-white py-16 md:py-24 px-5 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* LEFT — Image */}
          <div className="w-full md:w-1/2 relative flex-shrink-0">
            <div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl border-2 border-[#648855]/30 bg-[#648855]/5" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
              <img
                src={couples}
                alt="Our Story"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#648855]/20 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#648855]
                            flex flex-col items-center justify-center shadow-md">
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-medium">Since</span>
              <span className="text-xl font-bold text-white leading-none">2015</span>
            </div>
          </div>

          {/* RIGHT — Text */}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full
                             text-[11px] font-semibold tracking-widest uppercase
                             text-[#648855] bg-[#648855]/10 border border-[#648855]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#648855]" />
              Our Story
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Crafting Moments <br />
              <span className="text-[#648855]">You'll Remember</span> Forever
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-10 h-[2px] bg-[#648855]" />
              <div className="w-2 h-2 rounded-full bg-[#648855]/30" />
              <div className="w-24 h-px bg-[#648855]/20" />
            </div>

            <p className="text-gray-500 leading-relaxed text-[15px]">
              Eventor creates unforgettable event experiences — planned with passion and
              precision. From weddings to birthday celebrations, every detail is handled
              with care, making your moments truly special. Our trusted team delivers
              seamless planning with creative ideas tailored to your vision, turning
              dreams into beautiful reality.
            </p>
            <p className="text-gray-500 leading-relaxed text-[15px]">
              We bring ideas to life through elegant setups and flawless execution.
              From concept to completion, your happiness is our priority — creating
              moments that last forever and delivering excellence at every occasion.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold
                                 text-[#648855] border border-[#648855]/40 hover:bg-[#648855]/5
                                 transition-colors duration-200">
                View Our Work
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/*  GALLERY  */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="text-center mb-10">
            <p className="text-[#648855] font-semibold uppercase tracking-wider">
              Our Portfolio
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
              Our Works Gallery
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore memorable weddings, corporate gatherings, birthdays, and
              private galas organized by our experienced event planners.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(galleryData).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full transition-all duration-300 font-medium
                  ${activeTag === tag
                    ? "bg-[#648855] text-white shadow-lg"
                    : "bg-[#648855]/10 text-[#648855] border border-[#648855]/20 hover:bg-[#648855] hover:text-white"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryData[activeTag].map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl group shadow-md"
              >
                <img
                  src={image}
                  alt={`${activeTag}-${index}`}
                  className="w-full h-44 object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

    <section className="py-20 bg-gradient-to-br from-[#648855]/10 via-white to-[#648855]/5">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-14">
      <span className="text-[#648855] font-semibold uppercase tracking-wider">
        Pricing Plans
      </span>

      <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
        Price & Packages
      </h2>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Choose the perfect package for your special occasion. Flexible pricing
        designed for every celebration.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Gold */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/20 backdrop-blur-xl shadow-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        <h3 className="text-2xl font-bold text-[#648855] mb-4">
          Gold
        </h3>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            Rs.120,000
          </span>
        </div>

        <ul className="space-y-3 text-gray-700 mb-8">
          <li>6 Hour Coverage</li>
          <li>50 Edited Photos</li>
          <li>One Photographer</li>
          <li>Online Gallery</li>
          <li>Digital Delivery</li>
        </ul>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-[#000] px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          Book Now
        </Link>
      </div>

      <div className="group relative overflow-hidden rounded-3xl border-2 border-[#648855] bg-white/30 backdrop-blur-xl shadow-2xl p-8 text-center scale-100 lg:scale-105">

        <span className="absolute top-4 right-4 bg-[#648855] text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>

        <h3 className="text-2xl font-bold text-[#648855] mb-4">
          Diamond
        </h3>

        <div className="mb-6">
          <span className="text-5xl font-bold text-gray-900">
            Rs.180,000
          </span>
        </div>

        <ul className="space-y-3 text-gray-700 mb-8">
          <li>10 Hour Coverage</li>
          <li>100 Edited Photos</li>
          <li>Two Photographers</li>
          <li>Premium Online Gallery</li>
          <li>Drone Coverage</li>
        </ul>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-[#000] px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          Book Now
        </Link>
      </div>

      {/* Platinum */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/20 backdrop-blur-xl shadow-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        <h3 className="text-2xl font-bold text-[#648855] mb-4">
          Platinum
        </h3>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            Rs.250,000
          </span>
        </div>

        <ul className="space-y-3 text-gray-700 mb-8">
          <li>Full Day Coverage</li>
          <li>150 Edited Photos</li>
          <li>Three Photographers</li>
          <li>Luxury Online Gallery</li>
          <li>Drone + Video Coverage</li>
        </ul>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-[#000] px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          Book Now
        </Link>
      </div>

    </div>
  </div>
</section>


<section className="py-20 bg-gradient-to-b from-white to-[#648855]/5">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-14">
      <span className="text-[#648855] font-semibold uppercase tracking-widest">
        Client Reviews
      </span>

      <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
        What Our Clients Say
      </h2>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Real experiences from clients who trusted us to make their events
        memorable and stress-free.
      </p>
    </div>

    {/* Rating Summary */}
    <div className="mb-12 rounded-3xl bg-white border border-[#648855]/10 shadow-lg p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="text-center">
          <h3 className="text-5xl font-bold text-[#648855]">4.9</h3>
          <p className="text-yellow-500 text-xl">★★★★★</p>
          <p className="text-gray-500 mt-1">
            Based on 128 Reviews
          </p>
        </div>

        <div className="flex gap-8 text-center">
          <div>
            <h4 className="text-2xl font-bold text-gray-900">250+</h4>
            <p className="text-gray-500">Events Completed</p>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-gray-900">98%</h4>
            <p className="text-gray-500">Happy Clients</p>
          </div>
        </div>

      </div>
    </div>

    {/* Reviews Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Review Card */}
      <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-5">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-lg">Nethmi Perera</h4>
            <p className="text-sm text-gray-500">Wedding Event</p>
          </div>
        </div>

        <div className="text-yellow-500 mb-3">★★★★★</div>

        <p className="text-gray-600 leading-relaxed">
          Everything was handled perfectly. The decorations, photography,
          and coordination exceeded our expectations.
        </p>
      </div>

      <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-5">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-lg">Kasun Fernando</h4>
            <p className="text-sm text-gray-500">Corporate Event</p>
          </div>
        </div>

        <div className="text-yellow-500 mb-3">★★★★★</div>

        <p className="text-gray-600 leading-relaxed">
          Professional service from beginning to end. Communication was
          excellent and the event ran smoothly.
        </p>
      </div>

      <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-5">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-lg">Amara Silva</h4>
            <p className="text-sm text-gray-500">Birthday Party</p>
          </div>
        </div>

        <div className="text-yellow-500 mb-3">★★★★★</div>

        <p className="text-gray-600 leading-relaxed">
          Amazing experience. Guests loved the setup and the photos came
          out beautifully.
        </p>
      </div>

    </div>

    {/* Add Review Form */}
    <div className="mt-20 max-w-4xl mx-auto">
      <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-xl p-8">

        <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Leave a Review
        </h3>

        <p className="text-center text-gray-500 mb-8">
          Share your experience with this vendor.
        </p>

        <form className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#648855] focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#648855] focus:outline-none"
            />
          </div>

          <select
            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#648855] focus:outline-none"
          >
            <option>Select Rating</option>
            <option>★★★★★ (5 Stars)</option>
            <option>★★★★☆ (4 Stars)</option>
            <option>★★★☆☆ (3 Stars)</option>
            <option>★★☆☆☆ (2 Stars)</option>
            <option>★☆☆☆☆ (1 Star)</option>
          </select>

          <textarea
            rows="5"
            placeholder="Write your review..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none focus:border-[#648855] focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 rounded-full bg-[#648855] text-white font-semibold transition hover:scale-105"
          >
            Submit Review
          </button>

        </form>
      </div>
    </div>

  </div>
</section>

    </div>
  );
};

export default VendorDetails;