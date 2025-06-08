import React from "react";

const Services = () => {
  return (
    <>

      <div className="flex flex-col   items-center p-6 gap-3.5    ">
        <h2 className="my-title-s">Your fans are here to help you </h2>
        <div className="flex gap-5  max-w-5xl  mx-auto    flex-wrap justify-center items-center">
          <div className=" flex flex-col gap-1 underline-offset-4 w-  items-center  text-center text-sm min-w-[25%] w-60 flex-wrap  ">
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
          <div className=" flex flex-col gap-1 underline-offset-4 w-  items-center  text-center text-sm min-w-[25%] w-60 flex-wrap  ">
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
          <div className=" flex flex-col gap-1 underline-offset-4 w-  items-center  text-center text-sm min-w-[25%] w-60 flex-wrap  ">
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
        <div className=" my-24   flex gap-3.5    flex-wrap items-center justify-center    ">
          <iframe className=" w-80 min-w-36" height="215" src="https://www.youtube.com/embed/ID4L6ClMTj4?si=stCk7G6-aGkiz3V_" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

          <iframe className=" w-80 min-w-36" height="215" src="https://www.youtube.com/embed/iBmnSclSjVE?si=kskgI8aKZPZUa5n4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        </div>
      </div>

    </>
  );
};

export default Services;
