"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { redirect } from "next/dist/server/api-utils";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [LoggedIn, setLoggedIn] = useState(false);

  const showDropDown = useRef();
  const toggleshowDropDown = () => {
    showDropDown.current.classList.toggle("hidden");
  };

  return (
    <nav className="bg-[#020a38] text-white font-bold  flex  h-14 items-center flex-wrap px-2.5 ">
      <Link href="/" className="logo   w-1/2 ">
        Get Me A Tea{" "}
      </Link>
      <ul className="flex    justify-end gap-9 w-1/2  flex-wrap   items-center  ">
        {!session && (
          <>
            {" "}
            <Link href={"/"}>Home</Link>
            <Link href={"/aboutdev"}>About Dev.</Link>
          </>
        )}
        <div className="  relative z-10    ">
          {session ? (
            <>
              <button
                id="dropdownInformationButton"
                data-dropdown-toggle="dropdownInformation"
                className="text-white bg-gradient-to-br from-green-400  hover:bg-gradient-to-bl  focus:outline-none    font-medium rounded-lg text-sm px-3 py-2 text-center  cursor-pointer       focus:ring-blue-300     inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800   "
                type="button"
                onClick={() => {
                  toggleshowDropDown();
                }}
                onBlur={() => {
                  setTimeout(() => {
                     toggleshowDropDown()
                  }, 150);
                }}
              >
                <img
                  className="size-5 rounded-full"
                  src={session.user.image}
                  alt=""
                />

                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div className="absolute right-0">
                <div
                  id="dropdownInformation"
                  className="  hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                  ref={showDropDown}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{session.user.name}</div>
                    <div className="font-medium  break-words">
                      {session.user.email}
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" 
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"users/" + session.user.name}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/aboutdev"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        About DEV.
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white "
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link href={"/login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none    font-medium rounded-lg text-sm px-3 py-2 text-center  cursor-pointer  "
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
