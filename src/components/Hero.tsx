import React from 'react';
import { Carousel } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="hero bg-white h-[500px] mt-10">
      <Carousel
        placeholder=""
        onMouseEnter={() => {}}

        onMouseLeave={() => {}}


        className="rounded-none h-full"
        autoplay={true}
        loop={true}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-2 w-2 cursor-pointer rounded-full transition-colors ${
                  activeIndex === i ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {/* First Slide */}
        <div className="h-full">
          <div className="container mx-auto px-16 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2 space-y-4">
                <span className="text-gray-600 text-lg">
                  New Inspiration 2024
                </span>
                <h1 className="text-5xl font-bold">
                  PHONES MADE FOR YOU!
                </h1>
                <p className="text-gray-600 text-base max-w-md">
                  Trending from mobile and headphone style collection
                </p>
                <Link to="/shop">
                  <button className="bg-black text-white px-6 py-2 text-base 
                    hover:bg-gray-900 transition-colors">
                    SHOP NOW
                  </button>
                </Link>
              </div>
              <div className="w-1/2 flex justify-center">
                <img 
                  src="/images/banner_01.png" 
                  alt="banner" 
                  className="w-3/5 h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Slide */}
        <div className="h-full">
          <div className="container mx-auto px-16 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2 space-y-4">
                <span className="text-gray-600 text-lg">
                  New Inspiration 2024
                </span>
                <h1 className="text-5xl font-bold">
                  PHONES MADE FOR YOU!
                </h1>
                <p className="text-gray-600 text-base max-w-md">
                  Trending from mobile and headphone style collection
                </p>
                <Link to="/shop">
                  <button className="bg-black text-white px-6 py-2 text-base 
                    hover:bg-gray-900 transition-colors">
                    SHOP NOW
                  </button>
                </Link>
              </div>
              <div className="w-1/2 flex justify-center">
                <img 
                  src="/images/banner_02.png" 
                  alt="banner" 
                  className="w-3/5 h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
