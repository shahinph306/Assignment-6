import Image from 'next/image';
import React from 'react';
import Img from '@/Image/banner.png'

const Banner = () => {
      return (
    <div className="container mx-auto text-white bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 bg-gray-900 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
      
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-yellow-400 font-bold text-lg sm:text-xl">
            WORKOUT LIBRARY
          </h2>
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            TRAIN WITH INTENT. LOG <br className="hidden sm:inline" /> EVERY SET.
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into todays plan, and watch the weeks work add up.
          </p>
          <button className="border-2 border-yellow-500 px-8 py-3 mt-4 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
            BROWSE WORKOUTS
          </button>
        </div>

        <div className="flex-1 relative w-full max-w-md mx-auto md:mx-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={Img}
              alt="Banner Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );

};

export default Banner;


