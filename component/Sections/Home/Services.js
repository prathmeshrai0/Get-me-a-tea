import React from "react";

const Services = () => {
  return (
    <div className="flex flex-col   items-center p-6 gap-3.5  ">
      <h2 className="my-title-s">Your fans are here to help you </h2>
      <div className="flex gap-5  w-5xl">
        <div className=" flex flex-col gap-1 underline-offset-4  items-center  text-center text-sm w-[35%]">
          <button className=" rounded-full w-min   ">
            <lord-icon
              src="https://cdn.lordicon.com/mwhabkof.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </button>
          <p className="underline my-desc">Fans wanted to help</p>
          <p className="my-desc">Keep your Motivation high with a cup of tea !!!</p>
        </div>
        <div className=" flex flex-col gap-1 underline-offset-4  items-center  text-center text-sm w-[35%]">
          <button className=" rounded-full w-min   ">
            <lord-icon
              src="https://cdn.lordicon.com/cukgelaw.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </button>
          <p className="underline my-desc">Fans wanted to help</p>
          <p className="my-desc">Keep your Motivation high with a cup of tea !!!</p>
        </div>
        <div className=" flex flex-col gap-1 underline-offset-4  items-center  text-center text-sm w-[35%]">
          <button className=" rounded-full w-min   ">
            <lord-icon
              src="https://cdn.lordicon.com/xjkryxnf.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </button>
          <p className="underline my-desc">Fans wanted to help</p>
          <p className="my-desc">Keep your Motivation high with a cup of tea !!!</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
