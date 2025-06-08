import React from "react";
import Link from "next/link";
const Hero = () => {
  return (
    <>


      <div className="   h-72      gap-2  flex justify-center  items-center flex-col text-white text-sm flex-wrap   text-center">
        <div className="flex gap-1.5">
          <h1 className="my-title">Get Me A Tea</h1>
          <lord-icon
            src="https://cdn.lordicon.com/elcmkycs.json"
            trigger="hover"
            stroke="bold"
          ></lord-icon>
        </div>
        <p className="my-desc  ">
          Support the creator by donating and helping them continue their work!
        </p>
        <div>
          <Link href={'/login'}>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200   focus:outline-none focus:ring-lime-200     rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold cursor-pointer"
            >
              Start Now
            </button>
          </Link>
          <Link href={'/aboutdev'}>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200   focus:outline-none focus:ring-lime-200   rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold cursor-pointer"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>


    </>
  );
};

export default Hero;
