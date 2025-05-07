"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { redirect } from "next/dist/server/api-utils";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("current session is : ", session);

  // useEffect(() => {
  //   console.log("hey sesesion useeffect is working ", session);
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session]);

  return (
    <nav className="bg-[#020a38] text-white font-bold  flex  h-14 items-center flex-wrap px-2.5 ">
      <div className="logo   w-1/2 ">Get Me A Tea </div>
      <ul className="flex    justify-end gap-9 w-1/2  flex-wrap   items-center  ">
        <Link href={"/"}>Home</Link>
        <li>About Dev.</li>
        <Link href={"/login"} className="cursor-pointer ">
          {session ? (
            <div className="text-sm   flex items-center">
              
              <button
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2 text-center    "
                onClick={() => {
                  signOut({ callbackUrl: '/' });

                  // .then(() => {
                  console.log("user signed out");

                  // router.push("/");
                  // })
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2 text-center    "
            >
              Login
            </button>
          )}
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
