import banner from "../../assets/banner.avif";
import weddingCard from "../../assets/wedding.jpg";
import cooperateCard from "../../assets/events.avif";
import birthdayCard from "../../assets/birthday.webp";
import pubertyCard from "../../assets/puberty.jpg";
import graduationCard from "../../assets/graduation.jpg";
import aboutUsImage from "../../assets/about.jpg";
import VerifyImgIcom from "../../assets/iconImage/verify.png";
import chatImgIcon from "../../assets/iconImage/chat.png";
import paymentImgIcon from "../../assets/iconImage/dollar.png";
import bookingImgIcon from "../../assets/iconImage/booking.png";
import responsiveImgIcon from "../../assets/iconImage/responsive.png";
import sonyImg from "../../assets/sony.jpg";
import commaImg from "../../assets/quotes.png";
import cameraIcon from "../../assets/iconImage/camera.png";
import balloonsImgIcon from "../../assets/iconImage/balloons.png";
import cateringIcon from "../../assets/iconImage/catering.png";
import cateringImg from "../../assets/catering1.jfif";
import djImg from "../../assets/dj.jfif";
import djIcon from "../../assets/iconImage/dj.png";
import yourImage from "../../assets/couple.jfif";
import hallIcon from "../../assets/iconImage/town-hall.png";
import hallImg from "../../assets/hall.jpg";

import makeupIcon from "../../assets/iconImage/makeup.png";
import makeupImg from "../../assets/makeup.jfif";



import storeImg from "../../assets/iconImage/store.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";


// icons

import { CiHeart } from "../../components/icons/icon";

// For now they all reuse sonyImg as a placeholder.
const testimonials = [
  {
    id: 1,
    name: "Sajee",
    tag: "Wedding",
    quote:
      "Each vendor had clear information, making it easy to make decisions without confusion. It made the whole event planning experience stress-free and enjoyable.",
    sideImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Amara",
    tag: "Birthday",
    quote:
      "Eventor helped me find the perfect photographer and decorator for my daughter's birthday. Everything went smoothly and the memories are priceless!",
    sideImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Rohan",
    tag: "Corporate Event",
    quote:
      "Booking vendors for our annual company event was a breeze. The platform is intuitive and the vendors are professional. Highly recommended!",
    sideImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Priya",
    tag: "Graduation",
    quote:
      "I planned my graduation party through Eventor and it exceeded every expectation. The catering and DJ were absolutely fantastic.",
    sideImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Kasun",
    tag: "Puberty",
    quote:
      "The verified vendors gave us great peace of mind. Our event was beautifully arranged and all guests were impressed with the setup.",
    sideImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    name: "Nethmi",
    tag: "Wedding",
    quote:
      "From the first click to the final celebration, Eventor made our wedding planning journey magical. Couldn't have asked for a better platform.",
    sideImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=60",
  },
];

//  Categories Data 
const categories = [
  {
    id: 1,
    title: "Photography",
    description: "Capture your special moments beautifully",
    image: sonyImg,
  },
  {
    id: 2,
    title: "Decoration",
    description: "Elegant decorations for every event",
    image: sonyImg,
  },
  {
    id: 3,
    title: "Catering",
    description: "Delicious food for your guests",
    image: sonyImg,
  },
  {
    id: 4,
    title: "Music & DJ",
    description: "Create the perfect party atmosphere",
    image: sonyImg,
  },
  {
    id: 5,
    title: "Videography",
    description: "Preserve memories forever",
    image: sonyImg,
  },
  {
    id: 6,
    title: "Wedding Planning",
    description: "Stress-free event management",
    image: sonyImg,
  },
];

const vendors = [
  {
    id: 1,
    category: "Photography",
    title: "Standard Video",
    image: sonyImg,
    icon: cameraIcon,
    likes: "3.8k",
    rating: 4.5,
  },
  {
    id: 2,
    category: "Catering",
    title: "Royal Catering",
    image: cateringImg,
    icon: cateringIcon,
    likes: "2.5k",
    rating: 4.8,
  },
  {
    id: 3,
    category: "DJ",
    title: "DJ Beats",
    image: djImg,
    icon: djIcon,
    likes: "4.1k",
    rating: 4.7,
  },
  {
    id: 4,
    category: "Hall",
    title: "Grand Palace Hall",
    image: hallImg,
    icon: hallIcon,
    likes: "3.2k",
    rating: 4.6,
  },
  // {
  //   id: 5,
  //   category: "Decoration",
  //   title: "Luxury Decor",
  //   image: decorationImg,
  //   icon: balloonsImgIcon,
  //   likes: "5.4k",
  //   rating: 4.9,
  // },
  {
    id: 6,
    category: "Makeup",
    title: "Beauty Studio",
    image: makeupImg,
    icon: makeupIcon,
    likes: "2.9k",
    rating: 4.7,
  },
];


const Home = () => {
  const [activeReview, setActiveReview] = useState(0);
  const reviewSwiperRef = useRef(null);

  const handlePrev = () => {
    reviewSwiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    reviewSwiperRef.current?.swiper.slideNext();
  };

  const handleSlideChange = (swiper) => {
    setActiveReview(swiper.realIndex);
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#F0EAD6]">

      {/* ── HERO ── */}
      <div className="flex flex-col md:flex-row items-center bg-white justify-between min-h-screen py-10 sm:py-4">
        <div className="w-full md:w-3/4 px-6 md:px-20 py-4 sm:py-0 md:py-10 text-center md:text-left">
          <h1
            style={{ fontFamily: "against" }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 leading-tight"
          >
            Discover Amazing <br /> Services Near You
          </h1>
          <p
            style={{ fontFamily: "Montserrat" }}
            className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed"
          >
            Explore concerts, festivals, workshops, and more. Book your tickets
            and never miss out on unforgettable experiences.
          </p>
          <button className="mt-6 bg-[#789667] text-white px-6 py-3 rounded-[8px] hover:bg-[#678556] transition flex items-center gap-2 mx-auto md:mx-0">
            Explore Events
            <FaArrowRight />
          </button>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
          <img
            src={banner}
            alt="banner"
            className="w-full max-w-[500px] h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* ── FOR YOU ── */}
      <div className="flex flex-col items-center md:mt-20 mt-2 bg-[#789667] min-h-screen py-10 px-4">
        <div className="flex flex-col items-center text-center">
          <h1
            className="text-[32px] sm:text-[42px] lg:text-[72px] text-white"
            style={{ fontFamily: "against" }}
          >
            For You
          </h1>
          <p className="text-white mt-4 text-[14px] sm:text-[16px]">
            Our Valuable Service For Your Events
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-6 mt-10 w-full max-w-[1400px]">
          {/* Wedding Card */}
          <div className="relative w-full xl:max-w-[434px] h-[260px] sm:h-[500px] xl:h-[580px] rounded-[24px] overflow-hidden group">
            <img src={weddingCard} alt="Wedding" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            <div className="relative z-10 h-full flex flex-col justify-end items-center text-center p-6 sm:p-8 text-white">
              <h3 className="text-[30px] sm:text-[38px] lg:text-[45px] font-bold" style={{ fontFamily: "against" }}>Wedding</h3>
              <p className="mt-3 text-[14px] text-gray-200 leading-relaxed max-w-[320px]">
                From vows to celebrations, we help you create your dream wedding effortlessly
              </p>
              <Link to="/Services" className="mt-5 w-fit bg-[#DCDCC4]/80 backdrop-blur-sm text-gray-900 font-semibold text-[14px] px-6 py-3 rounded-[24px] hover:bg-[#678556] hover:text-white duration-300">
                Book Now
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6 w-full xl:w-auto">
            {/* Corporate */}
            <div className="relative w-full xl:max-w-[750px] h-[260px] sm:h-[500px] xl:h-[265px] rounded-[24px] overflow-hidden group">
              <img src={cooperateCard} alt="Corporate Event" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="relative z-10 h-full flex flex-col justify-end items-center text-center p-6 sm:p-8 text-white">
                <h3 className="text-[30px] sm:text-[38px] lg:text-[45px] font-bold" style={{ fontFamily: "against" }}>Corporate Events</h3>
                <p className="mt-3 text-[12px] md:text-[14px] text-gray-200 leading-tight max-w-[500px]">
                  Professional and seamless event planning for meetings, launches, and celebrations.
                </p>
                <Link to="/Services" className="mt-5 w-fit bg-[#DCDCC4]/80 backdrop-blur-sm text-gray-900 font-semibold text-[14px] px-6 py-3 rounded-[24px] hover:bg-[#678556] hover:text-white duration-300">
                  Book Now
                </Link>
              </div>
            </div>

            {/* Small Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { title: "Birthday", image: birthdayCard, text: "Make your special day unforgettable with our personalized birthday celebration packages." },
                { title: "Puberty", image: pubertyCard, text: "Celebrate this milestone with a fun and memorable event tailored for teenagers." },
                { title: "Graduation", image: graduationCard, text: "Mark this important achievement with a memorable celebration tailored for graduates." },
              ].map((card, index) => (
                <div key={index} className="relative w-full xl:max-w-[240px] h-[260px] sm:h-[500px] xl:h-[290px] rounded-[24px] overflow-hidden group">
                  <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="relative z-10 h-full flex flex-col justify-end items-center text-center p-6 text-white">
                    <h3 className="text-[30px] sm:text-[38px] xl:text-[28px] font-bold" style={{ fontFamily: "against" }}>{card.title}</h3>
                    <p className="mt-3 text-[14px] text-gray-200 leading-tight">{card.text}</p>
                    <Link to="/Services" className="mt-5 w-fit bg-[#DCDCC4]/80 backdrop-blur-sm text-gray-900 font-semibold text-[14px] px-6 py-3 rounded-[24px] hover:bg-[#678556] hover:text-white duration-300">
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT US ── */}
      <div className="flex flex-col lg:px-[50px] lg:flex-row w-full min-h-screen bg-white items-center mt-30">
        <div className="w-full lg:w-1/2">
          <img src={aboutUsImage} alt="About Us" className="w-full h-full object-contain lg:h-screen" />
        </div>
        <div className="w-full lg:w-1/2 bg-white px-4 sm:px-1 md:px-1 py-10 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
            Eventor creates unforgettable event experiences. We plan with passion and precision. From weddings to birthday celebrations. Every detail is handled with care, making your moments truly special. Trusted team delivering seamless event planning. Creative ideas tailored to your vision. Professional service for every occasion. Turning dreams into beautiful reality. Eventor makes events simple and memorable.
          </p>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 text-justify">
            Eventor brings ideas to life. We design events with creativity. Every celebration is crafted with passion. Attention given to every detail. Elegant setups for memorable experiences. From concept to flawless execution. Your happiness is our priority. Creating moments that last forever. Delivering excellence in every single event. Professional team ensuring smooth event execution.
          </p>
          <Link to="/About" className="w-fit bg-[#DCDCC4]/80 text-gray-900 font-semibold px-6 py-3 rounded-[24px] hover:bg-[#678556] hover:text-white transition">
            Learn More
          </Link>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="relative w-full h-auto lg:h-[600px] mt-20 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-full md:h-2/4 bg-[#648855]" />
        <div className="relative z-10 flex flex-col items-center px-5 py-8 lg:py-[30px]">
          <div className="text-center text-white px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">How it Works</h2>
            <p className="mt-2 text-sm sm:text-base">From planning to booking — everything made simple</p>
          </div>
          <div className="mt-10 flex flex-col md:flex-row items-center flex-wrap justify-center gap-6">
            {[
              { step: 1, title: "Create Account and Login", desc: "Sign up or log in to access all features and manage your bookings easily in one place." },
              { step: 2, title: "Choose Your Category", desc: "Explore services like Photography, Decorations, DJ & Sound, and more." },
              { step: 3, title: "Select Your Vendor", desc: "Browse verified vendors, check portfolios, and pick the best one." },
              { step: 4, title: "Book with Confidence", desc: "Confirm your booking through a smooth and secure process." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="w-[240px] md:w-[263px] h-[300px] bg-white rounded-xl shadow-md p-5 md:px-8 flex flex-col items-center text-center gap-3 md:gap-5">
                <div className="w-10 h-10 rounded-full bg-[#648855] text-white flex items-center justify-center font-bold">{step}</div>
                <h3 className="text-[24px] font-bold">{title}</h3>
                <p className="text-[14px] text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY US ── */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-10 lg:py-16 bg-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-10 font-medium" style={{ fontFamily: "against" }}>
          Why Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { img: storeImg, alt: "Wide Range of Vendors", title: "Wide Range of Vendors", desc: "Explore photographers, DJs, caterers, decorators and more in one place. Find the perfect match for your event without searching multiple platforms." },
            { img: VerifyImgIcom, alt: "Verified Professionals", title: "Verified Professionals", desc: "We connect you with trusted and experienced vendors. Every vendor is carefully reviewed to ensure quality and reliability." },
            { img: chatImgIcon, alt: "Easy Communication", title: "Easy Communication", desc: "Chat directly with vendors and discuss your requirements. Get quick responses and finalize details without hassle." },
            { img: paymentImgIcon, alt: "Flexible Pricing Options", title: "Flexible Pricing Options", desc: "Compare packages and choose services that fit your budget. Transparent pricing with no hidden surprises." },
            { img: bookingImgIcon, alt: "Quick & Easy Booking", title: "Quick & Easy Booking", desc: "Hire your preferred vendors in just a few clicks. A simple process designed to save time and effort." },
            { img: responsiveImgIcon, alt: "All-in-One Platform", title: "All-in-One Platform", desc: "Everything you need for your event is available in one place. From discovery to booking, manage everything seamlessly." },
          ].map(({ img, alt, title, desc }) => (
            <div key={title} className="flex items-start gap-4 p-5 bg-[#F8FAF6] rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <img src={img} alt={alt} className="w-12 h-12 sm:w-14 sm:h-14 object-contain flex-shrink-0" />
              <div>
                <h4 className="text-base md:text-lg font-semibold text-[#648855] mb-2" style={{ fontFamily: "Oswald" }}>{title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <div className="w-full px-4 lg:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl md:text-4xl font-medium" style={{ fontFamily: "against" }}>Categories</h1>
          <Link to="/categories" className="text-[#fff] text-sm md:font-medium hover:underline bg-black px-2 md:px-4 py-2 rounded-lg transition">
            View All
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".cat-prev", nextEl: ".cat-next" }}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative overflow-hidden rounded-3xl w-full max-w-[350px] h-[300px] md:h-[480px] group mx-auto">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#66666673] via-[#44444455] to-[#00000033]" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-2xl p-5">
                    <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base mb-5">{item.description}</p>
                    <Link to={`/categories/${item.id}`} className="inline-flex items-center px-5 py-2 rounded-lg bg-black hover:bg-white/35 text-white transition-all duration-300">
                      See More →
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-4 mt-8">
          <button className="cat-prev w-12 h-12 rounded-full bg-[#648855] text-white text-xl hover:scale-105 transition">←</button>
          <button className="cat-next w-12 h-12 rounded-full bg-[#648855] text-white text-xl hover:scale-105 transition">→</button>
        </div>
      </div>


      {/* ── TESTIMONIALS ── */}
      <div className="w-full bg-white  py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1200px]  mx-auto flex flex-col lg:flex-row  items-center gap-10 lg:gap-30">

          {/* LEFT — Swiper */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <img src={commaImg} alt="quote" className="w-16 sm:w-20 mb-6 opacity-80" />

            <Swiper
              ref={reviewSwiperRef}
              modules={[Navigation]}
              navigation={false}
              loop={true}
              onSlideChange={handleSlideChange}
              slidesPerView={1}
              className="w-full"
            >
              {testimonials.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="flex flex-col items-center text-center px-2 sm:px-6">
                    <p
                      className="text-[#555555] text-lg sm:text-[22px] italic leading-relaxed"
                      style={{ fontFamily: "Oswald" }}
                    >
                      "{review.quote}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation row */}
            <div className="flex items-center gap-6 mt-10">
              {/* Prev */}
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-[#648855] text-white text-xl hover:scale-105 transition flex items-center justify-center flex-shrink-0"
              >
                ←
              </button>

              {/* Active reviewer info */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#648855] shadow-md transition-all duration-500">
                  <img
                    src={testimonials[activeReview].sideImage}
                    alt={testimonials[activeReview].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-[#333]">
                  {testimonials[activeReview].name}
                </h4>
                <span className="text-xs font-medium text-[#648855] bg-[#648855]/10 px-3 py-1 rounded-full">
                  {testimonials[activeReview].tag}
                </span>
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#648855] text-white text-xl hover:scale-105 transition flex items-center justify-center flex-shrink-0"
              >
                →
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    reviewSwiperRef.current?.swiper.slideToLoop(i);
                    setActiveReview(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeReview ? "w-6 bg-[#648855]" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Side image changes with review */}
          <div className="w-full lg:w-[363px] flex-shrink-0 hidden md:block lg:block">
            <div className="relative w-full max-w-[363px] mx-auto overflow-hidden rounded-3xl shadow-xl"
              style={{ height: "480px" }}>
              {testimonials.map((review, i) => (
                <img
                  key={review.id}
                  src={review.sideImage}
                  alt={review.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === activeReview ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {/* Name badge overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white text-xl font-semibold">{testimonials[activeReview].name}</h4>
                <span className="text-[#a8c89a] text-sm">{testimonials[activeReview].tag}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

<div className="bg-[#648855] py-16 px-4 md:px-8 lg:px-16">
  {/* Header */}
  <div className="text-center">
    <h1 className="text-3xl md:text-5xl font-bold text-white">
      Top Rated Vendors
    </h1>

    <p className="text-gray-200 mt-3 text-sm md:text-base">
      Highly rated service providers from their field
    </p>
  </div>

  {/* Cards Container */}
  <div className="max-w-7xl mx-auto mt-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          className="w-full max-w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          {/* Vendor Image */}
          <div className="overflow-hidden">
            <img
              src={vendor.image}
              alt={vendor.title}
              className="w-full h-48 object-cover hover:scale-105 transition duration-500 p-6"
            />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col items-center text-center">
            <img
              src={vendor.icon}
              alt={vendor.category}
              className="w-8 h-8 "
            />

            <p className="text-sm text-gray-500 font-medium">
              {vendor.category}
            </p>

            <h3 className="text-lg font-bold text-[#648855] mt-1">
              {vendor.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-sm font-medium">
                {vendor.rating}
              </span>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-1 mt-2 text-gray-600">
              <CiHeart className="text-xl" />
              <span>{vendor.likes}</span>
            </div>

            {/* Button */}
            <Link
              to={`/VendorDetails/${vendor.id}`}
              className="mt-4 bg-[#648855] text-white px-5 py-2 rounded-lg hover:bg-[#4f6b43] transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="w-full flex justify-center mt-20 px-4">
  <div className="flex flex-col sm:flex-row w-full max-w-[1200px] h-auto sm:h-[535px] rounded-2xl overflow-hidden border border-gray-200">

    {/* Left — Image, full height */}
    <div className="sm:w-[42%] w-full h-56 sm:h-full flex-shrink-0">
      <img
        src={yourImage}
        alt="Newsletter"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right — Content */}
    <div className="flex-1 bg-white px-8 py-10 flex flex-col justify-center gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Subscribe to Our Newsletter
      </h1>
      <p className="text-sm text-gray-500 leading-relaxed">
        Get the latest event ideas, offers, and vendor updates straight to your inbox.
      </p>

      {/* Form — stacked inputs, button at right end */}
      <div className="flex flex-col gap-4 mt-2 w-full">

        {/* Name field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs font-medium text-gray-500" htmlFor="nl-name">
            Name
          </label>
          <input
            id="nl-name"
            type="text"
            placeholder="Your full name"
            className="h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#648855] w-full"
          />
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs font-medium text-gray-500" htmlFor="nl-email">
            Email
          </label>
          <input
            id="nl-email"
            type="email"
            placeholder="you@example.com"
            className="h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#648855] w-full"
          />
        </div>

        {/* Subscribe button — aligned right */}
        <div className="flex justify-end">
          <button className="h-11 px-8 bg-[#648855] hover:bg-[#4f6b43] text-white text-sm font-medium rounded-lg transition whitespace-nowrap">
            Subscribe
          </button>
        </div>

      </div>
    </div>

  </div>
</div>

    </div>
  );
};

export default Home;