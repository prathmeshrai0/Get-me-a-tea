"use client";
import React, { useState, useEffect } from "react";
import { updateProfile, fetchUser } from "@/actions/useractions";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
 

  const [formData, setformData] = useState({
    email: "",
    username: "",
    profilePic: "",
    coverPic: "/default-picture.gif",
    phoneNo: "",
    razorpayID: "",
    razorpaySecret: "",
  });

  const handleFormData = e => {
    const { name, value } = e.target;

    setformData({ ...formData, [name]: value });
  };

  const getData = async () => {
    let u = await fetchUser(session.user.name);
    if (u.profilePic.length == 0) {
      

    }
    // console.log(u.profilePic.length == 0);


    setformData(prev => ({
      ...prev,

      ...u,
    }));
  };
 
 
  
  const handleSubmit = async e => {
    if (
      formData.razorpayID.length < 15 ||
      formData.razorpaySecret.length < 20
    ) {
      alert("you must add  razorpayID and razorpaySecret to receive payments");
      return 0;
    }
    let a = await updateProfile(e, session.user.name);

    toast(`${a.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    update();
  };

  useEffect(() => {
    if (session) {
      getData();
      // setformData({...formData, profilePic: session.user.image})
    }
  }, [session]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="  min-h-[80vh] flex items-center  mx-1.5 ">
        <form className="max-w-md mx-auto    " action={handleSubmit}>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.email || ""}
              onChange={handleFormData}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
            >
              Email address
            </label>
          </div>

          <div className="grid sm:grid-cols-2 sm:gap-6 gap-3 grid-cols-2">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="username"
                id="username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.username || ""}
                onChange={handleFormData}
              />
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
              >
                Username
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="profilePic"
              id="profilePic"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "

              value={formData.profilePic || ""}
              onChange={handleFormData}
            />
            <label
              htmlFor="profilePic"
              className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
            >
              Profile picture Link
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="coverPic"
              id="coverPic"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "

              value={formData.coverPic || ""}
              onChange={handleFormData}
            />
            <label
              htmlFor="coverPic"
              className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
            >
              Cover picture Link
            </label>
          </div>

          <div className="relative z-0 w-full mb-3 group">
            <input
              type="tel"
              pattern="[0-9]{10}"
              name="phoneNo"
              id="phoneNo"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "

              value={formData.phoneNo || ""}
              onChange={handleFormData}
            />
            <label
              htmlFor="phoneNo"
              className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
            >
              Phone number
            </label>
          </div>

          {/* razorpay id  */}
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="razorpayID"
              id="razorpayID"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.razorpayID || ""}
              onChange={handleFormData}
            />
            <label
              htmlFor="razorpayID"
              className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
            >
              Razorpay ID
            </label>
          </div>

          {/* razorpay secret  */}
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="razorpaySecret"
              id="razorpaySecret"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.razorpaySecret || ""}
              onChange={handleFormData}
            />
            <label
              htmlFor="razorpaySecret"
              className="peer-focus:font-medium absolute text-base dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white "
            >
              Razorpay SECRET
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
