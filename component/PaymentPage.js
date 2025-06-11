"use client";

import Script from "next/script";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import { fetchPyaments, fetchUser, initiate, top } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const PaymentPage = ({ params }) => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState([]); // needed when you display payment data with jsx 
  const [userData, setuserData] = useState({})
  const supporter = useRef();
  const [payment_form, setpayment_form] = useState({
    name: "",
    amount: "",
    message: "",
  });
  const router = useRouter()
  const searchParams = useSearchParams()
  const [payments, setpayments] = useState([])

//  console.log(session);
 

  const handelChange = e => {


    setpayment_form({ ...payment_form, [e.target.name]: e.target.value });
  };

  const pay = async amount => {
    let a = await initiate(amount, userData.username, payment_form);
    let order_id = a.id;

    let options = {
      key: userData.razorpayID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Buy Me A Tea", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // creating object of class Razorpay
    let rzp1 = new Razorpay(options);

    // This opens the Razorpay payment popup.
    rzp1.open();
  };





  useEffect(() => {
    getData()
    if (searchParams.get('payment-done')) {
      toast(`Thanks for your Donation 💖`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
      router.push(`${params.username}`)
    }

  }, []);





  const getData = async () => {

    // to fetch payments from db 
    let p = await fetchPyaments(params.username);
    setpayments(p)

    // to fetch user data from db 
    const user = await fetchUser(params.username);
    setuserData(user)



    if (p) {

      // we are using slice to make a shallow copy to avoid further errors 
      supporter.current.innerHTML = p.slice().reverse().map(item => {

        return `
      <li class="flex items-center gap-2.5  ">
        <lord-icon
          src="https://cdn.lordicon.com/hhljfoaj.json"
          trigger="hover"
          style="height: 25px; width: 25px"
        ></lord-icon>
        <span class="max-w-[90%]">
          ${item.name} donated
          <span class="font-bold text-green-400"> ₹${item.amount
          }</span> with
          message: "${item.message}" 
        </span>
      </li>`;
      })
        .join(""); // 🔑 This removes the commas



      if (p.length < 1) {


        supporter.current.innerHTML = 'No payments to display !'
      }
    }
  };



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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className=" ">
        <div className="w-full h-[40vh]   relative  ">
          {userData.coverPic &&
            (
              <Image
                src={userData.coverPic}
                fill={true}
                className="   sm:object-fill   object-cover    "
                alt="Cover picture "
                priority
                unoptimized
              />
            )}

          {userData.profilePic && (
            <Image
              src={userData.profilePic}
              height={150}
              width={120}
              // height and width are overwritten with tailwind classess
              className="  rounded-full size-16 absolute -bottom-5 left-1/2 -translate-x-[50%]   outline-4 outline-green-500 "
              alt="profile picture"
              unoptimized
            />
          )}
        </div>

        <div className="flex  flex-col items-center mt-6   text-center  ">
          <p className="font-bold text-2xl  ">@{userData.username && (userData.username)} </p>
          <p className="">
            {userData && `Let's help ${userData.username} to get a chai ☕ `}
          </p>
          <p className="  flex  flex-wrap       justify-center ">

            <span className="    before:content-['•']  before:mx-1.5">Total Fund Raised : {payments && payments.reduce((acc, num) => acc + num.amount, 0)} </span>

            <span className="  before:content-['•'] before:mx-1.5 before:text-gray-300 before:font-bold before:">
              Top Donor : {payments.length && payments[0].name}
            </span>
            <span className="  before:content-['•'] before:mx-1.5 before:text-gray-300 before:font-bold before:">
              Total Donations : {payments.length && payments.length}
            </span>
          </p>
        </div>

        <div className="flex   text-md    mt-20 border-black w-auto max-w-5xl mx-auto     max-h-[50%]      sm:justify-between  justify-around flex-col-reverse  sm:flex-row  sm:gap-0 gap-5   ">
          <div className="supporters   p-5 rounded-lg transition duration-300   hover:outline-2  outline-blue-400 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.5)]  overflow-hidden md:w-[40%] sm:w-1/2  border-blue-400  mb-20     ">
          {/* pointer-fine:border-none  */}
            <h2 className="font-bold mb-3.5">Supporters</h2>

            <ul className="flex gap-2.5 flex-col" ref={supporter}>
              {/* {currentUser.map((item,ind) => {
                return <li key={ind} className="flex items-center     gap-2.5        ">
                  <lord-icon
                    src="https://cdn.lordicon.com/hhljfoaj.json"
                    trigger="hover"
                    style={{ height: "25px", width: "25px" }}
                  ></lord-icon>
                  <span className="      max-w-[90%]">
                    {item.name} donated
                    <span className="font-bold text-green-400"> ₹{(item.amount)  }</span> with
                    message : {item.message}  
                  </span>
                </li>
              }
              )} */}
            </ul>
          </div>

          <div className="makepay md:w-[40%] sm:w-1/2  p-5  rounded-lg transition duration-300   hover:outline-2  outline-blue-400 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] flex flex-col   justify-center       ">
            <h2 className="font-bold mb-3.5">Make pay</h2>
            <div className="flex flex-col gap-3  ">
              {/* name of donor and message  */}
              <input
                className="w-[80%] p-1.5 rounded-lg  border"
                type="text"
                placeholder="Enter Your Name"
                onChange={handelChange}
                value={payment_form.name}
                name="name"
              />{" "}
              <input
                className="w-[80%] p-1.5 rounded-lg  border"
                type="text"
                placeholder="Any message"
                onChange={handelChange}
                value={payment_form.message}
                name="message"
              />{" "}
              {/* custom amount and pay  */}
              <div className="     flex  justify-between  ">
                <input
                  className="w-[80%] p-1.5 rounded-lg  border no-arrow"
                  type="number"


                  placeholder="Enter Amount"
                  onChange={handelChange}
                  value={payment_form.amount}
                  name="amount"

                />{" "}
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 cursor-pointer to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm p-1.5 w-11  rounded-lg disabled:from-black   disabled:cursor-not-allowed"
                  onClick={() => {
                    pay(payment_form.amount * 100);
                  }}

                  disabled={payment_form.name.length < 3 || payment_form.message.length < 4 || payment_form.amount < 1}
                >
                  Pay
                </button>
              </div>
              {/* pay with coins  */}
              <div className="flex   items-center">
                <h4>Or pay with coins</h4>
                <lord-icon
                  src="https://cdn.lordicon.com/kkdnopsh.json"
                  trigger="hover"
                ></lord-icon>
              </div>
              <div className="coins flex gap-3   flex-wrap">
                <button
                  className="text-white bg-gradient-to-br from-purple-600 cursor-pointer to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm p-2 w-11  rounded-lg disabled:from-black   disabled:cursor-not-allowed"
                  onClick={() => {
                    pay(100);
                  }} disabled={payment_form.name.length < 3 || payment_form.message.length < 4}
                >
                  ₹1
                </button>{" "}
                <button
                  className="text-white bg-gradient-to-br from-purple-600 cursor-pointer to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm p-2 w-11  rounded-lg disabled:from-black   disabled:cursor-not-allowed"
                  onClick={() => {
                    pay(200);
                  }} disabled={payment_form.name.length < 3 || payment_form.message.length < 4}
                >
                  ₹2
                </button>{" "}
                <button
                  className="text-white bg-gradient-to-br from-purple-600 cursor-pointer to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm p-2 w-11  rounded-lg disabled:from-black   disabled:cursor-not-allowed"
                  onClick={() => {
                    pay(500);
                  }} disabled={payment_form.name.length < 3 || payment_form.message.length < 4}
                >
                  ₹5
                </button>
                <button
                  className="text-white bg-gradient-to-br from-purple-600 cursor-pointer to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm p-2 w-11  rounded-lg   disabled:from-black   disabled:cursor-not-allowed"
                  onClick={() => {
                    pay(1000);
                  }} disabled={payment_form.name.length < 3 || payment_form.message.length < 4}
                >
                  ₹10
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
