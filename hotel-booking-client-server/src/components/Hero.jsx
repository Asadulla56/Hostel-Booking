import React from "react";
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
    <section
      className='relative flex flex-col items-start justify-center 
      px-6 md:px-16 lg:px-24 xl:px-32 text-white 
      bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center 
      min-h-[80vh] md:h-screen pt-24 md:pt-0'
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="relative z-10 max-w-2xl">
        <p className="font-bold px-3.5 py-1 rounded-full">
          The Ultimate Hotel Experience
        </p>

        <h1 className="font-playfair text-3xl md:text-5xl font-bold mt-4">
          Discover Your Perfect Getaway Destination
        </h1>

        <p className="mt-3 text-sm md:text-base text-gray-200">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>

        <form className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row gap-4">
          <div>
            <div className="flex items-center gap-2">
              <img src={assets.locationIcon} alt="" className="h-4" />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input
              list="destinations"
              id="destinationInput"
              type="text"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
              placeholder="Type here"
              required
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <img src={assets.calenderIcon} alt="" className="h-4" />
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input
              id="checkIn"
              type="date"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <img src={assets.calenderIcon} alt="" className="h-4" />
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input
              id="checkOut"
              type="date"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="guests">Guests</label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full max-w-[70px]"
              placeholder="0"
            />
          </div>

          <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white w-full md:w-auto">
            <img src={assets.searchIcon} alt="searchIcon" className="h-5" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
