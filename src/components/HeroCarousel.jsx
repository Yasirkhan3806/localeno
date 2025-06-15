import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    title: "Summer Tech Sale!",
    subtitle: "Up to 40% off selected gadgets",
  },
  {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
    title: "Fresh Looks for Home",
    subtitle: "Shop our new home & living arrivals",
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80",
    title: "Verified & Trusted Marketplace",
    subtitle: "Find original brands, verified sellers, best prices",
  },
];

function HeroCarousel() {
  const [curr, setCurr] = useState(0);
  const navigate = useNavigate();

  const goto = (i) => setCurr(i);
  const next = () => setCurr((curr + 1) % images.length);
  const prev = () => setCurr((curr - 1 + images.length) % images.length);

  // Replace gradientButton and buttonText for a vibrant look using your theme
  const gradientButton =
    "bg-gradient-to-tr from-primary via-gray-900 to-secondary shadow-lg hover:shadow-xl hover:from-gray-900 hover:via-primary hover:to-gray-900 focus-visible:ring-4 focus-visible:ring-primary/50 ring-offset-2 transition-all";
  const buttonText =
    "text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.23)]";

  return (
    <section className="relative w-full mx-auto max-w-6xl h-[340px] sm:h-[410px] rounded-2xl overflow-hidden shadow-sm bg-neutral-200 animate-fade-in">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 flex flex-col justify-end ${
            i === curr ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={img.src}
            alt={img.title}
            className="object-cover w-full h-full absolute inset-0"
            draggable="false"
            style={{ filter: "brightness(86%)", transition: "all 0.5s" }}
          />
          <div className="relative z-10 p-4 sm:p-10 pb-6 text-white max-w-md sm:max-w-lg">
            <h2 className="text-2xl sm:text-4xl font-extrabold drop-shadow">
              {img.title}
            </h2>
            <p className="text-base sm:text-lg opacity-90 mt-2 mb-5">{img.subtitle}</p>
            <div className="flex gap-3">
              <button
                className={`${gradientButton} ${buttonText} px-7 py-3 rounded-2xl text-lg shadow-lg transform hover:scale-105 active:scale-98 focus:outline-none outline-none transition-all duration-200 border border-transparent`}
                style={{
                  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
                  letterSpacing: "0.01em"
                }}
              >
                Shop Now
              </button>
              <button
                className="py-2 px-4 sm:px-5 rounded-lg border border-primary/60 bg-background/70 text-primary font-semibold text-sm shadow hover:bg-primary/10 focus:outline-none transition-all"
                onClick={() => navigate("/about")}
              >
                Learn More
              </button>
            </div>
          </div>
          {/* Buttons: Prev/Next */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full text-black shadow hover:scale-110 focus:outline-none"
            onClick={prev}
          >
            ‹
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full text-black shadow hover:scale-110 focus:outline-none"
            onClick={next}
          >
            ›
          </button>
          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {images.map((_, j) => (
              <button
                key={j}
                className={`w-3 h-3 rounded-full border-2 ${
                  curr === j
                    ? "bg-white border-white shadow"
                    : "bg-white/30 border-white/50"
                } transition-all`}
                aria-label={`Slide ${j + 1}`}
                onClick={() => goto(j)}
              ></button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default HeroCarousel;
