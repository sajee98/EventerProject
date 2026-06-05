import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import weddingImg from "../../assets/weddingImage.png";
import grassImg from "../../assets/grassbottom.png";
import flowerBg from "../../assets/flowerBg.png";
import greenleaves from "../../assets/greenleaves.png";

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

import { CiStar, FaStar,FaPlus,
  FaTimes } from "../../components/icons/icon";

const Service = () => {

    const services = [
  {
    id: 1,
    title: "Photography",
    image: coupleCard,
    icon: cameraIconImg,
    description:
      "Capture every special moment with our professional photography services.",
  },
  {
    id: 2,
    title: "DJ & Music",
    image: djCard,
    icon: djIcon,
    description:
      "Create unforgettable experiences with live music and professional DJs.",
  },
  {
    id: 3,
    title: "Halls",
    image: hallCard,
    icon: hallIcon,
    description:
      "Find elegant venues perfect for weddings, parties, and corporate events.",
  },
  {
    id: 4,
    title: "Makeup & Beauty",
    image: makeupCard,
    icon: makeupIcon,
    description:
      "Professional makeup artists and beauty experts for your special day.",
  },
  {
    id: 5,
    title: "Catering",
    image: cateringCard,
    icon: cateringIcon,
    description:
      "Delicious menus and catering services tailored to your event needs.",
  },
  {
    id: 6,
    title: "Decoration",
    image: decorationCard,
    icon: balloonsImgIcon,
    description:
      "Beautiful decorations that transform your venue into a memorable space.",
  },
];


const faqs = [
  {
    id: 1,
    question: "How do I book a service?",
    answer:
      "You can book a service by clicking the 'Learn More' button and following the instructions."
  },
  {
    id: 2,
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking before 24 hours of the event."
  },
  {
    id: 3,
    question: "Do I need to pay advance?",
    answer:
      "Yes, a small advance payment is required to confirm your booking."
  },
  {
    id: 4,
    question: "How do I contact support?",
    answer:
      "You can contact support via email or phone provided in the contact section."
  }
];
 //for FAQ toggle
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#F0EAD6]">
      <div className="relative w-full min-h-[590px] flex items-center overflow-hidden">
        {/* 🌿 GRASS (real bottom layer - FIXED TOUCH) */}
        <img
          src={grassImg}
          alt="grass"
          className="absolute  left-0 w-full object-cover z-0"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-[#648855]/30 z-10" />

        {/*  Right vertical rectangle (clean fixed) */}
        <div className="absolute right-40 top-0 h-full w-32 lg:w-80 bg-[#BA201B] opacity-60 z-10" />

        {/* CONTENT */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Glass card */}
          <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md border mt-10 border-white/20 rounded-2xl p-8 text-white shadow-lg">
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "against" }}
            >
              What We Do
            </h1>

            <p
              className="text-gray-200 mb-6 leading-relaxed"
              style={{ fontFamily: "Montserrat" }}
            >
              Explore concerts, festivals, workshops, and more. Book your
              tickets and never miss out on unforgettable experiences.
            </p>

            <Link
              to="/contact"
              className="inline-block bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
              style={{ fontFamily: "Montserrat" }}
            >
              Contact Us
            </Link>
          </div>

        
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end relative z-20">
            <img
              src={weddingImg}
              alt="event"
              className="w-[400px] h-[400px] md:h-[600px] object-cover rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    <div className="text-center mt-20 px-4">
  
  <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
    Our Exceptional <span className="text-[#648855]">Services</span>
  </h1>

  <div className="mt-4 flex justify-center">
    <div className="w-16 h-[3px] bg-[#648855] rounded-full"></div>
  </div>

  <p
    className="mt-5 text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto"
    style={{ fontFamily: "Roboto" }}
  >
    We provide premium vendors and event planning solutions to make your
    celebrations truly unforgettable. From weddings to corporate events,
    we bring your vision to life with precision, creativity, and care.
  </p>

</div>


 <div className="w-full flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-3 gap-y-8 px-5 py-10 w-[1200px]">
    {services.map((service) => (
      <div
        key={service.id}
        className="
          group
          relative
          w-full
          h-[450px]
          sm:h-[500px]
          lg:h-[540px]
          overflow-hidden
          rounded-xl
          shadow-xl
        "
      >
      {/* Background Image */}
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
      />

      {/* Glass Content Box */}
      <div
        className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          w-[260px]
          sm:w-[280px]
          h-[100px]
          group-hover:h-[280px]
          sm:group-hover:h-[300px]
          transition-all
          duration-500
          ease-in-out
          rounded-xl
          backdrop-blur-lg
          bg-white/20
          border
          border-white/30
          shadow-lg
          overflow-hidden
          flex
          flex-col
          items-center
          text-center
          p-4
          sm:p-5
        "
      >
        {/* Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center border border-white/30">
          <img
            src={service.icon}
            alt={service.title}
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="mt-2 text-lg sm:text-xl font-bold text-white ">
          {service.title}
        </h2>

        {/* Hidden Content */}
        <div
          className="
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            mt-4
          "
        >
          <p className="text-gray-100 text-xs sm:text-sm leading-relaxed mb-4">
            {service.description}
          </p>

          <Link
            to="/category"
            className="
              inline-block
              px-5
              py-2
              text-sm
              backdrop-blur-md
              bg-[#648855]
              border
              border-white/30
              text-white
              font-medium
              hover:bg-white/30
              hover:text-black
              transition
              duration-300
            "
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
</div>

<div
  className="relative h-[430px] w-full bg-cover overflow-hidden"
  style={{
    backgroundImage: `url(${flowerBg})`,
    backgroundPosition: "center 70%"   
  }}
>
 <div className="absolute inset-0 bg-white/40"></div>
  <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
    
    <h2
      className="text-2xl md:text-4xl font-bold mb-4"
      style={{ fontFamily: "Roboto" }}
    >
      What Customer Says
    </h2>

    <div className="flex justify-center mb-4 text-yellow-400 text-3xl gap-1">
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <CiStar />
</div>

    <p className="max-w-xl text-sm md:text-base text-gray-800">
      “Planning our wedding was so stressful until we found this platform.
      It made everything super easy — from photographers to decorators.
      Highly recommended for anyone who wants a smooth experience!”
    </p>

    <div className="flex gap-2 mt-4 font-semibold">
      <h4>Sajee</h4>
      <strong>|</strong>
      <p>Wedding</p>
    </div>
  </div>
</div>


{/* FAQ */}

    <div className="w-full px-4">

  <div className="w-full flex flex-col items-center py-10 bg-[#648855] mt-10 rounded-xl">

    {/* TITLE */}
    <h1 className="text-3xl font-bold text-white text-center mb-6">
      FAQ
    </h1>

    {/* SEARCH */}
    <input
      type="text"
      placeholder="Search FAQs..."
      className="w-full max-w-2xl bg-white p-3 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-white/40"
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* FAQ LIST */}
    <div className="space-y-2 w-full max-w-4xl">

      {filteredFaqs.map((faq) => (
        <div
          key={faq.id}
          className="rounded-lg overflow-hidden bg-white shadow-sm"
        >

          {/* QUESTION */}
          <button
            onClick={() => toggle(faq.id)}
            className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
          >
            <span className="font-medium text-left">
              {faq.question}
            </span>

            {openId === faq.id ? (
              <FaTimes className="text-red-500" />
            ) : (
              <FaPlus className="text-black" />
            )}
          </button>

          {/* ANSWER */}
          <div
            className={`px-4 overflow-hidden transition-all duration-500 ${
              openId === faq.id
                ? "max-h-40 py-3 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600 text-sm">
              {faq.answer}
            </p>
          </div>

        </div>
      ))}

    </div>

  </div>

</div>
    </div>
  );
};

export default Service;
