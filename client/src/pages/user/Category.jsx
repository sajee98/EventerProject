import React, { useState } from "react";
import djIcon from "../../assets/iconImage/dj.png";
import cameraIconImg from "../../assets/iconImage/camera.png";
import makeupIcon from "../../assets/iconImage/makeup.png";
import hallIcon from "../../assets/iconImage/town-hall.png";
import cateringIcon from "../../assets/iconImage/catering.png";
import balloonsImgIcon from "../../assets/iconImage/balloons.png";
import photocategory from "../../assets/photocategory.png";
import samplePhoto from "../../assets/samplePhoto.jpg"

import { FaSearch,FaShareAlt, FaHeart,  FaStar, FaFilter, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const categories = [
  { key: "Halls",       icon: hallIcon,       label: "Halls" },
  { key: "DJ & Music",  icon: djIcon,         label: "DJ & Music" },
  { key: "Photography", icon: cameraIconImg,  label: "Photography" },
  { key: "Makeup",      icon: makeupIcon,     label: "Makeup" },
  { key: "Catering",    icon: cateringIcon,   label: "Catering" },
  { key: "Decoration",  icon: balloonsImgIcon,label: "Decoration" },
];

const headings = {
  "Halls":       { title: "Find Your Perfect",  highlight: "Event Venue" },
  "DJ & Music":  { title: "Set the Mood With",  highlight: "Live Music" },
  "Photography": { title: "Capture Every",      highlight: "Precious Moment" },
  "Makeup":      { title: "Look Your",          highlight: "Absolute Best" },
  "Catering":    { title: "Delight Every",      highlight: "Single Guest" },
  "Decoration":  { title: "Transform Any",      highlight: "Space Beautifully" },
};


//for categiry cards
const cards = [
  {
    id: 1,
    title: "Standard 45 Cinematic Video",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    rating: "4.9",
    reviews: "5,300",
    price: "Rs.180,000",
  },
  {
    id: 2,
    title: "Wedding Highlight Package",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    rating: "4.8",
    reviews: "3,200",
    price: "Rs.150,000",
  },
  {
    id: 3,
    title: "Event Cinematic Shoot",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    rating: "4.7",
    reviews: "2,100",
    price: "Rs.120,000",
  },
];



const Category = () => {
  const [activeFilter, setActiveFilter] = useState("Photography");
  const heading = headings[activeFilter];

  return (
    <div className="w-full overflow-x-hidden bg-white font-['Montserrat',_sans-serif]">

      {/* ── Hero ── */}
      <div className="relative w-full h-[300px] sm:min-h-[520px] bg-white overflow-hidden flex items-stretch">

        {/* Soft green wash background */}
        <div className="absolute inset-0 bg-[#648855]/[0.06] pointer-events-none" />

        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#648855]/[0.08] pointer-events-none" />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#648855]/[0.06] pointer-events-none" />

        <div
          className="absolute top-0 right-0 h-full hidden md:block"
          style={{
            width: "42%",
            background: "linear-gradient(135deg, transparent 18%, #648855 18%)",
            opacity: 0.08,
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 pt-12 pb-24 md:pb-28">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 w-fit bg-[#648855]/10 border border-[#648855]/30 text-[#648855] text-[10px] font-semibold tracking-[1.8px] uppercase px-4 py-[6px] rounded-full mb-5">
            ✦ Premium Services
          </span>

          <h1
            key={activeFilter}
            className="font-['Playfair_Display',_serif] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] text-gray-900"
          >
            {heading.title}
            <br />
            <span className="text-[#648855]">{heading.highlight}</span>
          </h1>

          {/* Underline accent */}
          <div className="mt-4 w-14 h-[3px] bg-[#648855] rounded-full" />

          {/* Subtitle */}
          <p className="mt-4 max-w-[420px] text-sm md:text-[15px] text-gray-500 font-light leading-relaxed">
            Professional event services tailored for your most memorable
            occasions — from intimate gatherings to grand celebrations.
          </p>

        </div>

        {/* ── RIGHT: Green block + Image ── */}
        <div className="hidden md:flex relative w-[280px] lg:w-[360px] xl:w-[420px] flex-shrink-0 items-end justify-center overflow-hidden">
          {/* Green geometric panel */}
          <div
            className="absolute inset-0 bg-[#648855]"
            style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          {/* Light texture dots on green */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* Photo */}
          <img
            src={photocategory}
            alt={activeFilter}
            className="relative z-10 h-full w-auto object-cover object-top"
          />
          {/* Left fade into white */}
          <div
            className="absolute inset-y-0 left-0 w-16 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.15), transparent)",
            }}
          />
        </div>
      </div>

    <div className="w-full max-w-[1200px] mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-5">
  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">

    {/* Search */}
    <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
      <FaSearch className="text-[#648855]" />
      <input
        type="text"
        placeholder="Search events..."
        className="w-full bg-transparent outline-none text-sm"
      />
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-px h-12 bg-gray-200" />

    {/* From Date */}
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
      <FaCalendarAlt className="text-[#648855]" />
      <input
        type="date"
        className="bg-transparent outline-none text-sm"
      />
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-px h-12 bg-gray-200" />

    {/* To Date */}
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
      <FaCalendarAlt className="text-[#648855]" />
      <input
        type="date"
        className="bg-transparent outline-none text-sm"
      />
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-px h-12 bg-gray-200" />

    {/* Location */}
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
      <FaMapMarkerAlt className="text-[#648855]" />
      <input
        type="text"
        placeholder="Location"
        className="bg-transparent outline-none text-sm"
      />
    </div>

    {/* Search Button */}
    <button className="bg-[#648855] hover:bg-[#557247] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
      Search
    </button>

  </div>
</div>

    {/* ── Filter Bar ── */}
      <div className="w-full flex flex-col lg:flex-row gap-6 px-4 sm:px-8 md:px-14 lg:px-20 py-6">

  {/* LEFT FILTER PANEL */}
  <div className="w-full lg:w-[253px] bg-white border border-gray-100 rounded-xl shadow-sm p-4 h-fit">

 <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center justify-between w-full">
  <span>Filter</span>

  <span className="p-1 bg-[#648855]/10 rounded-md">
    <FaFilter className="text-[#648855] text-xs" />
  </span>
</h2>

    {/* CATEGORY FILTER */}
    <div className="flex flex-col gap-3">

      {categories.map((cat) => {
        const isActive = activeFilter === cat.key;

        return (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            className="flex items-center justify-between text-left"
          >
            <span className="text-sm text-[#648855] font-medium">
              {cat.label}
            </span>

            {/* checkbox style */}
            <div
              className={`w-4 h-4 flex items-center justify-center rounded border transition-all duration-200
                ${
                  isActive
                    ? "bg-[#648855] border-[#648855]"
                    : "border-gray-300"
                }`}
            >
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-sm" />
              )}
            </div>
          </button>
        );
      })}
    </div>

    {/* Divider */}
    <div className="my-4 border-t border-gray-100" />

    {/* PRICE RANGE */}
    <div className="flex flex-col gap-3">

      <h3 className="text-sm font-semibold text-gray-500 uppercase">
        Price Range
      </h3>

      <input
        type="range"
        min="0"
        max="1000"
        className="w-full accent-[#648855]"
      />

      <div className="flex justify-between text-xs text-gray-500">
        <span>$0</span>
        <span>$1000</span>
      </div>

    </div>

  </div>

{/* RIGHT CARDS SECTION */}
<div className="flex-1 w-full">
  <div className="grid grid-cols-1 gap-5">

    {cards.map((item) => (
      <div
        key={item.id}
         className="w-full flex flex-col md:flex-row border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
      >

        {/* IMAGE */}
{/* IMAGE */}
<div className="w-full md:w-[260px] h-[180px] flex-shrink-0 overflow-hidden">
  <img
    src={item.image}
    alt="service"
    className="w-full h-full object-cover"
  />
</div>

        {/* CONTENT */}
        <div className="flex flex-1 p-4 justify-between flex-col md:flex-row gap-4">

          {/* LEFT */}
          <div className="flex flex-col justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h2>

              <span className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <FaStar className="text-yellow-400" />
                {item.rating} <small>({item.reviews})</small>
              </span>

              {/* PACKAGES */}
              <div className="mt-3">
                <h2 className="text-sm font-semibold text-gray-700">
                  Packages
                </h2>

                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="px-2 py-1 text-xs border rounded-md text-[#648855] border-[#648855]">
                    Gold
                  </span>
                  <span className="px-2 py-1 text-xs border rounded-md text-[#648855] border-[#648855]">
                    Diamond
                  </span>
                  <span className="px-2 py-1 text-xs border rounded-md text-[#648855] border-[#648855]">
                    Platinum
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between items-end w-full md:w-auto">

            {/* PRICE */}
            <div className="text-right">
              <small className="text-gray-400 text-xs">starting from</small>
              <h1 className="text-xl font-bold text-[#648855]">
                {item.price}
              </h1>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between w-full md:w-auto gap-6 mt-4 md:mt-0">

              <div className="flex gap-3 text-gray-400">
                <FaHeart className="text-xl hover:text-red-500 cursor-pointer transition" />
                <FaShareAlt className="text-xl hover:text-[#648855] cursor-pointer transition" />
              </div>

              <button className="bg-[#648855] text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-[#557247] transition">
                View Details
              </button>

            </div>

          </div>

        </div>

      </div>
    ))}

  </div>
</div>
</div>

    </div>
  );
};

export default Category;