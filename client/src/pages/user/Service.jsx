import React, { useState } from "react";
import { Link } from "react-router-dom";


// ─── Replace these with your actual asset imports ───
import weddingImg from "../../assets/weddingImage.png";
import coupleCard from "../../assets/coupleCard.jpg";
import hallCard from "../../assets/hall.jpg";
import djCard from "../../assets/DjCard.Webp";
import cateringCard from "../../assets/catering1.jfif";
import decorationCard from "../../assets/decoration.jpg";
import makeupCard from "../../assets/makeup.jfif";
import djIcon from "../../assets/iconImage/dj.png";
import cameraIconImg from "../../assets/iconImage/camera.png";
import makeupIcon from "../../assets/iconImage/makeup.png";
import hallIcon from "../../assets/iconImage/town-hall.png";
import cateringIcon from "../../assets/iconImage/catering.png";
import balloonsImgIcon from "../../assets/iconImage/balloons.png";

//  Data 
const services = [
  {
    id: 1,
    title: "Photography",
    image: coupleCard,
    icon: cameraIconImg,
    description:
      "Award-winning photographers who capture golden-hour portraits, candid laughter, and every tear of joy — so your memories live forever.",
  },
  {
    id: 2,
    title: "DJ & Music",
    image: djCard,
    icon: djIcon,
    description:
      "From romantic first dances to high-energy dance floors — our curated DJs and live artists set the perfect mood for every moment.",
  },
  {
    id: 3,
    title: "Event Halls",
    image: hallCard,
    icon: hallIcon,
    description:
      "Grand ballrooms, garden courtyards, and intimate spaces — handpicked venues that turn your vision into a breathtaking reality.",
  },
  {
    id: 4,
    title: "Makeup & Beauty",
    image: makeupCard,
    icon: makeupIcon,
    description:
      "Expert artists who believe beauty means feeling completely yourself — radiant, confident, and stunning for every lens and eye.",
  },
  {
    id: 5,
    title: "Catering",
    image: cateringCard,
    icon: cateringIcon,
    description:
      "Seasonal menus crafted with passion — from lavish buffets to intimate plated dinners, every bite tells a delicious story.",
  },
  {
    id: 6,
    title: "Decoration",
    image: decorationCard,
    icon: balloonsImgIcon,
    description:
      "Transformative décor that turns any venue into a world of wonder — from lush florals to bespoke installations that steal the spotlight.",
  },
];

const reviews = [
  {
    id: 1,
    name: "Sajee & Ravan",
    event: "Wedding · March 2025",
    initials: "SR",
    rating: 5,
    text: "Planning our wedding felt overwhelming until we found this platform. Every vendor was exceptional — our day was truly beyond what we imagined. Highly recommended!",
  },
  {
    id: 2,
    name: "Nimesha Fernando",
    event: "Corporate Gala · Jan 2025",
    initials: "NF",
    rating: 5,
    text: "The catering and decoration team were absolutely flawless. Our 300-guest gala ran perfectly. The attention to detail was something I've never experienced before.",
  },
  {
    id: 3,
    name: "Ashan & Dilki",
    event: "Engagement · Nov 2024",
    initials: "AD",
    rating: 4,
    text: "Booking was effortless, the photography team was phenomenal. We had our engagement photos back within a week — stunning quality. Will use again for our wedding!",
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I book a service?",
    answer:
      "Browse our service categories, select your preferred vendor, and follow the guided booking flow. A confirmation arrives in your inbox within minutes.",
  },
  {
    id: 2,
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes — cancellations made more than 48 hours before the event receive a full refund. Rescheduling is always free with advance notice.",
  },
  {
    id: 3,
    question: "Is an advance payment required?",
    answer:
      "A small deposit (typically 20%) is required at booking to secure your date. The balance is due 7 days before your event.",
  },
  {
    id: 4,
    question: "How do I contact customer support?",
    answer:
      "Our support team is available 7 days a week via live chat, or by email at hello@eventplanner.lk.",
  },
  {
    id: 5,
    question: "Do you handle destination events?",
    answer:
      "Absolutely. We coordinate vendors across Sri Lanka and can assist with international destination weddings on request.",
  },
];


const StarRating = ({ count }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-4 h-4 ${s <= count ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div
    className={`rounded-xl overflow-hidden border transition-all duration-300 ${
      isOpen ? "border-[#648855]/40 bg-[#648855]/5" : "border-gray-200 bg-white"
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center px-5 py-4 text-left gap-4 hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-800 text-sm md:text-base">
        {faq.question}
      </span>
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-300 ${
          isOpen ? "bg-red-500 rotate-45" : "bg-[#648855]"
        }`}
      >
        +
      </span>
    </button>
    <div
      className={`px-5 text-gray-500 text-sm leading-relaxed transition-all duration-500 overflow-hidden ${
        isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {faq.answer}
    </div>
  </div>
);

 

const Service = () => {
  const [openFaqId, setOpenFaqId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-white font-sans">

      {/* ── HERO ── */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden bg-white">

        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#648855]" />

        {/* Diagonal divider */}
        <div
          className="absolute w-[260px] lg:w-[180px] top-0 bottom-0 z-10"
          style={{
            left: "calc(50% - 80px)",
            background: "linear-gradient(to bottom right, #648855 50%, white 50%)",
          }}
        />

        {/* Dot pattern on green side */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/2 opacity-10 z-[1]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">

          {/* Left: text */}
          <div className="flex-1 text-white lg:pr-16">
            <span className="inline-block bg-white/20 border border-white/30 text-white text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Premium Event Planning
            </span>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              We Craft <br />
              <span className="italic font-normal text-white/80">
                Unforgettable
              </span>
              <br />
              Celebrations.
            </h1>

            <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-sm mb-8">
              From intimate weddings to grand galas — our curated vendor
              network brings your vision to life with artistry and precision.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#648855] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Contact Us →
              </Link>
              <Link
                to="/category"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Our Services
              </Link>
            </div>

          </div>

          {/* Right: image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#648855]/20 rounded-2xl" />
              <img
                src={weddingImg}
                alt="Wedding celebration"
                className="relative w-72 md:w-96 h-80 md:h-[460px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES HEADING ── */}
      <div className="text-center pt-20 pb-2 px-4">
        <span className="inline-block bg-[#648855]/10 text-[#648855] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          What We Offer
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Our Exceptional{" "}
          <span className="text-[#648855] italic font-normal">Services</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#648855] mx-auto mb-5 rounded-full" />
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Premium vendors and end-to-end planning to make your celebrations
          truly unforgettable — from weddings to corporate galas.
        </p>
      </div>

      {/* ── SERVICE CARDS ── */}
      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative w-full h-[460px] overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              {/* Background image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/90" />

              {/* Green accent strip on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#648855] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

              {/* Glass content box */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[75%] h-[100px] group-hover:h-[280px] transition-all duration-500 ease-in-out rounded-2xl backdrop-blur-md bg-white/15 border border-white/25 shadow-xl overflow-hidden flex flex-col items-center text-center px-5 py-4">

                {/* Icon */}
                <div className="w-20 h-10 rounded-full bg-[#648855]/80 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-2 text-lg font-bold text-white tracking-wide flex-shrink-0">
                  {service.title}
                </h3>

                {/* Hidden on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-3 flex flex-col items-center">
                  <p className="text-white/80 text-xs leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/category"
                    className="inline-block px-6 py-2 text-xs font-semibold bg-[#648855] text-white rounded-lg hover:bg-[#4f6e42] transition-colors duration-200 tracking-wide"
                  >
                    Explore Service →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>




      {/* ── REVIEWS ── */}
      <section className="bg-[#648855] py-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Client Stories
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              What Our Clients{" "}
              <span className="italic font-normal text-white/75">Say</span>
            </h2>
            <div className="w-12 h-0.5 bg-white/40 mx-auto mt-4 rounded-full" />
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-6 shadow-xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Stars */}
                <StarRating count={r.rating} />

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  "{r.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#648855] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      {r.name}
                    </div>
                    <div className="text-xs text-gray-400">{r.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary bar */}
          <div className="mt-12 bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-wrap justify-center gap-10 text-center text-white">
            {[
              { num: "500+", label: "Happy Clients" },
              { num: "4.9/5", label: "Average Rating" },
              { num: "98%", label: "Would Recommend" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.num}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <span className="inline-block bg-[#648855]/10 text-[#648855] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
                Got Questions?
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Frequently Asked{" "}
                <span className="text-[#648855] italic font-normal">
                  Questions
                </span>
              </h2>
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0 w-full sm:w-56">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenFaqId(null);
                }}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#648855]/30 focus:border-[#648855] transition-all"
              />
            </div>
          </div>

          {/* FAQ list */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={() =>
                    setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                  }
                />
              ))
            ) : (
              <div className="text-center py-10 text-gray-400 text-sm">
                No questions match your search.
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#648855]/8 border border-[#648855]/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Our team is available 7 days a week to help you plan the perfect
              event.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#648855] text-white font-semibold px-7 py-3 rounded-lg hover:bg-[#4f6e42] transition-colors text-sm"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;