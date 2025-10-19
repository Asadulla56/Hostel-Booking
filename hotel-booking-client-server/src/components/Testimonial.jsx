import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRatting from "./StarRatting";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-24">
      <Title
        title="What our Guests Say"
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full max-w-7xl">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-lg sm:text-xl">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3">
              <StarRatting />
            </div>

            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed">
              “{testimonial.review}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
