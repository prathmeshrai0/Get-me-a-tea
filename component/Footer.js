"use client";
import React from "react";

const Footer = () => {

  return (
  <>
    <footer className="bg-[#020a38]  text-center  text-white flex justify-center items-center h-14 fixed  bottom-0 w-full   ">
      <p className=" ">
        © {new Date().getFullYear()} Buy Me a Tea. All rights reserved. Your
        support makes a difference!
      </p>
      {/* {session&& <p className='absolute right-0'>    Logged in as {session.user.name}  <br />{" "}</p>} */}
    </footer>
  </>
  );
};

export default Footer;
