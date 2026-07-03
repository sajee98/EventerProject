import React, { useState } from "react";

import weddingImg from "../../assets/weddingImage.png";
import couples from "../../assets/couples.jpg";
import djIcon from "../../assets/iconImage/dj.png";
import cameraIconImg from "../../assets/iconImage/camera.png";
import makeupIcon from "../../assets/iconImage/makeup.png";
import hallIcon from "../../assets/iconImage/town-hall.png";
import cateringIcon from "../../assets/iconImage/catering.png";
import balloonsImgIcon from "../../assets/iconImage/balloons.png";
import photocategory from "../../assets/photocategory.png";
import { FaSearch, FaShareAlt, FaHeart, FaStar, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaCheck, FaArrowRight } from "react-icons/fa";

const categories = [
  { key: "Halls",       icon: hallIcon,        label: "Halls" },
  { key: "DJ & Music",  icon: djIcon,          label: "DJ & Music" },
  { key: "Photography", icon: cameraIconImg,   label: "Photography" },
  { key: "Makeup",      icon: makeupIcon,      label: "Makeup" },
  { key: "Catering",    icon: cateringIcon,    label: "Catering" },
  { key: "Decoration",  icon: balloonsImgIcon, label: "Decoration" },
];

const headings = {
  "Halls":       { title: "Find Your Perfect",  highlight: "Event Venue" },
  "DJ & Music":  { title: "Set the Mood With",  highlight: "Live Music" },
  "Photography": { title: "Capture Every",      highlight: "Precious Moment" },
  "Makeup":      { title: "Look Your",          highlight: "Absolute Best" },
  "Catering":    { title: "Delight Every",      highlight: "Single Guest" },
  "Decoration":  { title: "Transform Any",      highlight: "Space Beautifully" },
};

const cards = [
  {
    id: 1,
    title: "Standard 45 Cinematic Video",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    rating: "4.9",
    reviews: "5,300",
    price: "Rs.180,000",
    location: "Colombo",
    badge: "Top Rated",
  },
  {
    id: 2,
    title: "Wedding Highlight Package",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    rating: "4.8",
    reviews: "3,200",
    price: "Rs.150,000",
    location: "Kandy",
    badge: "Popular",
  },
  {
    id: 3,
    title: "Event Cinematic Shoot",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    rating: "4.7",
    reviews: "2,100",
    price: "Rs.120,000",
    location: "Galle",
    badge: "New",
  },
];







const faqs = [
  { id: 1, q: "Are all vendors verified?", a: "Yes — every vendor goes through a strict vetting process including reviews, certifications, and quality audits before being listed." },
  { id: 2, q: "Can I compare multiple vendors?", a: "Absolutely. You can shortlist vendors, compare their packages side by side, and read verified reviews before deciding." },
  { id: 3, q: "What if I need to cancel?", a: "Cancellations made 48+ hours in advance receive a full refund. Our support team handles all cancellation requests personally." },
  { id: 4, q: "Is there a booking fee?", a: "No platform fee is charged to clients. You only pay the vendor's quoted price, with a small refundable deposit to confirm." },
];

const Category = () => {
  const [activeFilter, setActiveFilter] = useState("Photography");
  const [openFaq, setOpenFaq] = useState(null);
  const [liked, setLiked] = useState({});
  const heading = headings[activeFilter];

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="w-full overflow-x-hidden bg-white font-sans">

      {/* ── HERO ── */}
      <div className="relative w-full min-h-[340px] sm:min-h-[520px] bg-white overflow-hidden flex items-stretch">
        <div className="absolute inset-0 bg-[#648855]/[0.06] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#648855]/[0.08] pointer-events-none" />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#648855]/[0.06] pointer-events-none" />
        <div
          className="absolute top-0 right-0 h-full hidden md:block"
          style={{ width: "42%", background: "linear-gradient(135deg, transparent 18%, #648855 18%)", opacity: 0.08 }}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 pt-12 pb-24 md:pb-28">
          <span className="inline-flex items-center gap-2 w-fit bg-[#648855]/10 border border-[#648855]/30 text-[#648855] text-[10px] font-semibold tracking-[1.8px] uppercase px-4 py-[6px] rounded-full mb-5">
            ✦ Premium Services
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
            {heading.title}
            <br />
            <span className="text-[#648855] italic font-normal">{heading.highlight}</span>
          </h1>
          <div className="mt-4 w-14 h-[3px] bg-[#648855] rounded-full" />
          <p className="mt-4 max-w-[420px] text-sm md:text-[15px] text-gray-500 font-light leading-relaxed">
            Professional event services tailored for your most memorable occasions — from intimate gatherings to grand celebrations.
          </p>
        </div>

        <div className="hidden md:flex relative w-[280px] lg:w-[360px] xl:w-[420px] flex-shrink-0 items-end justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#648855]" style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }} />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <img src={photocategory} alt={activeFilter} className="relative z-10 h-full w-auto object-cover object-top" />
          <div className="absolute inset-y-0 left-0 w-16 z-20 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)" }} />
        </div>
      </div>

 <section className="bg-[#648855]/5 border-t border-[#648855]/10 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[#648855]/10 text-[#648855] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Ready to Begin?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Let's Plan Your{" "}
            <span className="text-[#648855] italic font-normal">Perfect Event</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Join thousands of happy clients who trusted us to make their celebrations extraordinary. Start exploring vendors today — it's completely free.
          </p>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <div className="w-full max-w-[1200px] mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
              <FaSearch className="text-[#648855] flex-shrink-0" />
              <input type="text" placeholder="Search vendors..." className="w-full bg-transparent outline-none text-sm" />
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
              <FaCalendarAlt className="text-[#648855] flex-shrink-0" />
              <input type="date" className="bg-transparent outline-none text-sm w-full" />
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
              <FaCalendarAlt className="text-[#648855] flex-shrink-0" />
              <input type="date" className="bg-transparent outline-none text-sm w-full" />
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
              <FaMapMarkerAlt className="text-[#648855] flex-shrink-0" />
              <input type="text" placeholder="Location" className="bg-transparent outline-none text-sm w-full" />
            </div>
            <button className="bg-[#648855] hover:bg-[#557247] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── FILTER + CARDS ── */}
      <div className="w-full max-w-[1200px] bg-[#F7F9F6] mx-auto flex flex-col lg:flex-row gap-6 px-4 py-8">

        {/* LEFT FILTER PANEL */}
        <div className="w-full lg:w-[253px] flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 h-fit sticky top-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Filter</span>
              <span className="p-1 bg-[#648855]/10 rounded-md">
                <FaFilter className="text-[#648855] text-xs" />
              </span>
            </h2>

            <div className="flex flex-col gap-3">
              {categories.map((cat) => {
                const isActive = activeFilter === cat.key;
                return (
                  <button key={cat.key} onClick={() => setActiveFilter(cat.key)} className="flex items-center justify-between text-left group">
                    <div className="flex items-center gap-2">
                      <img src={cat.icon} alt={cat.label} className="w-4 h-4 object-contain opacity-70" />
                      <span className={`text-sm font-medium transition-colors ${isActive ? "text-[#648855]" : "text-gray-500 group-hover:text-[#648855]"}`}>
                        {cat.label}
                      </span>
                    </div>
                    <div className={`w-4 h-4 flex items-center justify-center rounded border transition-all duration-200 ${isActive ? "bg-[#648855] border-[#648855]" : "border-gray-300"}`}>
                      {isActive && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="my-4 border-t border-gray-100" />

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Price Range</h3>
              <input type="range" min="0" max="500000" className="w-full accent-[#648855]" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Rs.0</span>
                <span>Rs.500,000</span>
              </div>
            </div>

            <div className="my-4 border-t border-gray-100" />

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Rating</h3>
              {[5, 4, 3].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#648855] w-3.5 h-3.5" />
                  <span className="flex gap-0.5">
                    {[...Array(r)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-xs" />)}
                    {[...Array(5 - r)].map((_, i) => <FaStar key={i} className="text-gray-200 text-xs" />)}
                  </span>
                  <span className="text-xs text-gray-400">& up</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="flex-1">

          {/* Result count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500"><span className="font-semibold text-gray-800">{cards.length} vendors</span> found for <span className="text-[#648855] font-medium">{activeFilter}</span></p>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none text-gray-600 focus:border-[#648855]">
              <option>Sort: Top Rated</option>
              <option>Sort: Price Low-High</option>
              <option>Sort: Price High-Low</option>
              <option>Sort: Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {cards.map((item) => (
              <div key={item.id} className="w-full flex flex-col md:flex-row border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md hover:border-[#648855]/30 transition-all duration-300">

                {/* IMAGE */}
                <div className="relative w-full md:w-[260px] h-[200px] flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt="service" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#648855] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                    {item.badge}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 p-4 justify-between flex-col md:flex-row gap-4">
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <FaStar className="text-yellow-400" />
                          {item.rating} <small>({item.reviews})</small>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <FaMapMarkerAlt className="text-[#648855]" /> {item.location}
                        </span>
                      </div>

                      <div className="mt-3">
                        <h2 className="text-sm font-semibold text-gray-700">Packages</h2>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {["Gold", "Diamond", "Platinum"].map((pkg) => (
                            <span key={pkg} className="px-2.5 py-1 text-xs border rounded-md text-[#648855] border-[#648855] hover:bg-[#648855] hover:text-white transition-colors cursor-pointer">
                              {pkg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end w-full md:w-auto">
                    <div className="text-right">
                      <small className="text-gray-400 text-xs">starting from</small>
                      <h1 className="text-xl font-bold text-[#648855]">{item.price}</h1>
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto gap-6 mt-4 md:mt-0">
                      <div className="flex gap-3 text-gray-300">
                        <FaHeart
                          onClick={() => toggleLike(item.id)}
                          className={`text-xl cursor-pointer transition-colors ${liked[item.id] ? "text-red-500" : "hover:text-red-400"}`}
                        />
                        <FaShareAlt className="text-xl hover:text-[#648855] cursor-pointer transition-colors" />
                      </div>
                      <button className="bg-[#648855] text-white text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#557247] transition-colors flex items-center gap-1.5">
                        View Details <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  
                <div className="flex flex-col items-center mt-20 p-4 ">
      <h1 className="text-xl text-center md:text-3xl lg:text-4xl font-bold">Who’s Behind Your {" "}
            <span className="text-[#648855]">Perfect Event</span></h1>
      <p className="text-sm text-gray-500 text-center max-w-200 leading-[1.5]">Get to know the talented people working behind the scenes to make your event truly special. 
Their expertise and commitment help turn your ideas into a memorable celebration.</p>
     </div>


  <div className="flex justify-center bg-white py-10">

  <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full px-6">

    {/* LEFT CONTENT */}
    <div className="flex flex-col gap-5 w-full lg:w-1/2">

      <div className="flex items-start gap-3">
        <FaCheck className="text-6xl text-green-500 mt-1" />
        <div>
          <h2 className="font-semibold text-base">COMPETITIVE RATES</h2>
          <p className="text-gray-600 text-sm">
            In our industry, contacts, negotiating clout and experience mean that you’ll always get the best prices...
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaCheck className="text-6xl text-green-500 mt-1" />
        <div>
          <h2 className="font-semibold text-base">REDUCTION OF STRESS</h2>
          <p className="text-gray-600 text-sm">
            We guide you through the entire process which means your wedding planning will be fun, exciting and stress-free.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaCheck className="text-6xl text-green-500 mt-1" />
        <div>
          <h2 className="font-semibold text-base">PROFESSIONAL CONSULTANCY</h2>
          <p className="text-gray-600 text-sm">
            We work with the top vendors in Sri Lanka which means you have access to the best service providers.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaCheck className="text-6xl text-green-500 mt-1" />
        <div>
          <h2 className="font-semibold text-base">SAVE YOUR PRECIOUS TIME</h2>
          <p className="text-gray-600 text-sm">
            Don’t waste hours trying to find reliable vendors. We present you with perfect matches.
          </p>
        </div>
      </div>

    </div>

    {/* RIGHT IMAGE */}
<div className="w-full lg:w-1/2 flex justify-center items-stretch">
      <img
        src={couples}
        alt="Wedding"
        className="w-full max-w-sm h-full object-cover rounded-lg shadow-md"
      />
    </div>

  </div>
</div>


      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#648855]/10 text-[#648855] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              Frequently Asked <span className="text-[#648855] italic font-normal">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <div key={faq.id} className={`rounded-xl overflow-hidden border transition-all duration-300 ${openFaq === faq.id ? "border-[#648855]/40 bg-[#648855]/5" : "border-gray-200 bg-white"}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 text-sm md:text-base">{faq.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-base font-bold transition-all duration-300 ${openFaq === faq.id ? "bg-red-500 rotate-45" : "bg-[#648855]"}`}>
                    +
                  </span>
                </button>
                <div className={`px-5 text-gray-500 text-sm leading-relaxed overflow-hidden transition-all duration-500 ${openFaq === faq.id ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   

    </div>
  );
};

export default Category;