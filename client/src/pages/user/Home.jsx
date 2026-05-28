import banner from "../../assets/banner.avif";
import weddingCard from "../../assets/wedding.jpg";
import cooperateCard from "../../assets/events.avif";
import birthdayCard from "../../assets/birthday.webp";
import pubertyCard from "../../assets/puberty.jpg";
import graduationCard from "../../assets/graduation.jpg";
import aboutUsImage from "../../assets/about.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#F0EAD6]">
      {/* HERO SECTION */}
      <div className="flex flex-col  md:flex-row items-center bg-white justify-between min-h-screen py-10 sm:py-4">
        {/* LEFT SIDE TEXT */}
        <div className="w-full md:w-3/4 px-6 md:px-20 py-4 sm:py-0 md:py-10 text-center md:text-left ">
          {/* H1 */}
          <h1
            style={{ fontFamily: "against" }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 leading-tight"
          >
            Discover Amazing <br /> Services Near You
          </h1>

          {/* PARAGRAPH */}
          <p
            style={{ fontFamily: "Montserrat" }}
            className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed"
          >
            Explore concerts, festivals, workshops, and more. Book your tickets
            and never miss out on unforgettable experiences.
          </p>

          {/* BUTTON */}
          <button className="mt-6 bg-[#789667] text-white px-6 py-3 rounded-[8px] hover:bg-[#678556] transition flex items-center gap-2 mx-auto md:mx-0">
            Explore Events
            <FaArrowRight />
          </button>
        </div>

        {/* RIGHT SIDE IMAGE (HIDDEN ON MOBILE) */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
          <img
            src={banner}
            alt="banner"
            className="w-full max-w-[500px] h-auto object-cover rounded-lg"
          />
        </div>
      </div>
      {/* for you section */}

      <div className="flex flex-col items-center md:mt-20 mt-2 bg-[#789667] min-h-screen py-10 px-4">

  {/* Heading */}
  <div className="flex flex-col items-center text-center">
    <h1
      className="
        text-[32px]
        sm:text-[42px]
        lg:text-[72px]
        text-white
      "
      style={{ fontFamily: "against" }}
    >
      For You
    </h1>

    <p className="text-white mt-4 text-[14px] sm:text-[16px]">
      Our Valuable Service For Your Events
    </p>
  </div>

  {/* Main Layout */}
  <div
    className="
      flex
      flex-col
      xl:flex-row
      items-center
      justify-center
      gap-6
      mt-10
      w-full
      max-w-[1400px]
    "
  >

    {/* WEDDING CARD */}
    <div
      className="
        relative
        w-full
        xl:max-w-[434px]
        h-[260px]
        sm:h-[500px]
        xl:h-[580px]
        rounded-[24px]
        overflow-hidden
        group
      "
    >
      <img
        src={weddingCard}
        alt="Wedding"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          group-hover:scale-110
          duration-500
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-black/10
        "
      ></div>

      <div
        className="
          relative
          z-10
          h-full
          flex
          flex-col
          justify-end
          items-center
          text-center
          p-6
          sm:p-8
          text-white
        "
      >
        <h3
          className="
            text-[30px]
            sm:text-[38px]
            lg:text-[45px]
            font-bold
          "
          style={{ fontFamily: "against" }}
        >
          Wedding
        </h3>

        <p
          className="
            mt-3
            text-[14px]
            text-gray-200
            leading-relaxed
            max-w-[320px]
          "
        >
          From vows to celebrations, we help you create your dream
          wedding effortlessly
        </p>

        <Link
          to="/Services"
          className="
            mt-5
            w-fit
            bg-[#DCDCC4]/80
            backdrop-blur-sm
            text-gray-900
            font-semibold
            text-[14px]
            px-6
            py-3
            rounded-[24px]
            hover:bg-[#678556]
            hover:text-white
            duration-300
          "
        >
          Book Now
        </Link>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex flex-col gap-6 w-full xl:w-auto">

      {/* CORPORATE CARD */}
      <div
        className="
          relative
          w-full
          xl:max-w-[750px]

          h-[260px]
          sm:h-[500px]
          xl:h-[265px]

          rounded-[24px]
          overflow-hidden
          group
        "
      >
        <img
          src={cooperateCard}
          alt="Corporate Event"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            group-hover:scale-110
            duration-500
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/30
            to-black/10
          "
        ></div>

        <div
          className="
            relative
            z-10
            h-full
            flex
            flex-col
            justify-end
            items-center
            text-center
            p-6
            sm:p-8
            text-white
          "
        >
          <h3
            className="
              text-[30px]
              sm:text-[38px]
              lg:text-[45px]
              font-bold
            "
            style={{ fontFamily: "against" }}
          >
            Corporate Events
          </h3>

          <p
            className="
              mt-3
              text-[12px]
              md:text-[14px]
              text-gray-200
              leading-tight
              max-w-[500px]
            "
          >
            Professional and seamless event planning for meetings,
            launches, and celebrations.
          </p>

          <Link
            to="/Services"
            className="
              mt-5
              w-fit
              bg-[#DCDCC4]/80
              backdrop-blur-sm
              text-gray-900
              font-semibold
              text-[14px]
              px-6
              py-3
              rounded-[24px]
              hover:bg-[#678556]
              hover:text-white
              duration-300
            "
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* SMALL CARDS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {/* CARD REUSABLE STYLE */}
        {[
          {
            title: "Birthday",
            image: birthdayCard,
            text: "Make your special day unforgettable with our personalized birthday celebration packages.",
          },
          {
            title: "Puberty",
            image: pubertyCard,
            text: "Celebrate this milestone with a fun and memorable event tailored for teenagers.",
          },
          {
            title: "Graduation",
            image: graduationCard,
            text: "Mark this important achievement with a memorable celebration tailored for graduates.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="
              relative
              w-full
              xl:max-w-[240px]

              h-[260px]
              sm:h-[500px]
              xl:h-[290px]

              rounded-[24px]
              overflow-hidden
              group
            "
          >
            <img
              src={card.image}
              alt={card.title}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                group-hover:scale-110
                duration-500
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-black/30
                to-black/10
              "
            ></div>

            <div
              className="
                relative
                z-10
                h-full
                flex
                flex-col
                justify-end
                items-center
                text-center
                p-6
                text-white
              "
            >
              <h3
                className="
                  text-[30px]
                  sm:text-[38px]
                  xl:text-[28px]
                  font-bold
                "
                style={{ fontFamily: "against" }}
              >
                {card.title}
              </h3>

              <p
                className="
                  mt-3
                  text-[14px]
                  text-gray-200
                  leading-tight
                "
              >
                {card.text}
              </p>

              <Link
                to="/Services"
                className="
                  mt-5
                  w-fit
                  bg-[#DCDCC4]/80
                  backdrop-blur-sm
                  text-gray-900
                  font-semibold
                  text-[14px]
                  px-6
                  py-3
                  rounded-[24px]
                  hover:bg-[#678556]
                  hover:text-white
                  duration-300
                "
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* About us */}

<div className="flex flex-col lg:px-[50px] lg:flex-row w-full min-h-screen bg-white items-center mt-30">

  {/* LEFT IMAGE */}
  <div className="w-full lg:w-1/2">
    <img
      src={aboutUsImage}
      alt="About Us"
      className="
        w-full
        h-full
        object-contain
        lg:h-screen
      "
    />
  </div>

  {/* RIGHT CONTENT */}
  <div
    className="
      w-full
      lg:w-1/2
      bg-white

      px-4
      sm:px-1
      md:px-1
      

      py-10
      flex
      flex-col
      justify-center
    "
  >
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
      Our Story
    </h1>

    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
      Eventor creates unforgettable event experiences. We plan with passion and precision. From weddings to birthday celebrations. Every detail is handled with care, making your moments truly special. Trusted team delivering seamless event planning. Creative ideas tailored to your vision. Professional service for every occasion. Turning dreams into beautiful reality. Eventor makes events simple and memorable.
    </p>

    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 text-justify">
      Eventor brings ideas to life. We design events with creativity. Every celebration is crafted with passion. Attention given to every detail. Elegant setups for memorable experiences. From concept to flawless execution. Your happiness is our priority. Creating moments that last forever. Delivering excellence in every single event. Professional team ensuring smooth event execution.
    </p>

    <Link
      to="/About"
      className="
        w-fit
        bg-[#DCDCC4]/80
        text-gray-900
        font-semibold
        px-6
        py-3
        rounded-[24px]
        hover:bg-[#678556]
        hover:text-white
        transition
      "
    >
      Learn More
    </Link>
  </div>

</div>


{/* how it work section */}
       <div className="relative w-full h-auto lg:h-[768px] mt-20 flex flex-col">

  {/* TOP HALF BACKGROUND */}
  <div className="absolute top-0 left-0 w-full h-1/3 bg-[#648855]"></div>

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col items-center px-5 py-8 lg:py-[30px]">

    {/* HEADER */}
    <div className="text-center text-white px-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        How it Works
      </h2>
      <p className="mt-2 text-sm sm:text-base">
        From planning to booking — everything made simple
      </p>
      
    </div>

    {/* CARDS CONTAINER */}
    <div className="mt-10 flex flex-col md:flex-row items-center   flex-wrap justify-center gap-6">

      {/* CARD 1 */}
      <div className="w-[240px] md:w-[263px]  h-[300px] bg-white rounded-xl shadow-md p-5 md:px-8 flex flex-col items-center text-center gap-3 md:gap-5">
        <div className="w-10 h-10 rounded-full bg-[#648855] text-white flex items-center justify-center font-bold">
          1
        </div>
        <h3 className="text-[24px] font-bold">
          Create Account and Login
        </h3>
        <p className="text-[14px] text-gray-500">
          Sign up or log in to access all features and manage your bookings easily in one place.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="w-[263px] h-[300px] bg-white rounded-xl shadow-md p-5 md:px-8 flex flex-col items-center text-center gap-3 md:gap-5">
        <div className="w-10 h-10 rounded-full bg-[#648855] text-white flex items-center justify-center font-bold">
          2
        </div>
        <h3 className="text-[24px] font-bold">
          Choose Your Category
        </h3>
        <p className="text-[14px] text-gray-500">
          Explore services like Photography, Decorations, DJ & Sound, and more.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="w-[263px] h-[300px] bg-white rounded-xl shadow-md p-5 md:px-8 flex flex-col items-center text-center gap-3 md:gap-5">
        <div className="w-10 h-10 rounded-full bg-[#648855] text-white flex items-center justify-center font-bold">
          3
        </div>
        <h3 className="text-[24px] font-bold">
          Select Your Vendor
        </h3>
        <p className="text-[14px] text-gray-500">
          Browse verified vendors, check portfolios, and pick the best one.
        </p>
      </div>

      {/* CARD 4 */}
      <div className="w-[263px] h-[300px] bg-white rounded-xl shadow-md p-5 md:px-8 flex flex-col items-center text-center gap-3 md:gap-5">
        <div className="w-10 h-10 rounded-full bg-[#648855] text-white flex items-center justify-center font-bold">
          4
        </div>
        <h3 className="text-[24px] font-bold">
          Book with Confidence
        </h3>
        <p className="text-[14px] text-gray-500">
          Confirm your booking through a smooth and secure process.
        </p>
      </div>

    </div>

  </div>
</div>
    </div>
  );
};

export default Home;
