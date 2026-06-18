import React from "react";
import Image from "next/image";
import PaymentPage from "@/component/PaymentPage";
import { notFound, redirect } from "next/navigation";
import { fetchUser } from "@/actions/useractions";

const Username = async ({ params }) => {
  let params_data = await params; 

  let user = await fetchUser(params_data.username);
  console.log(user);

  if (!user) {
    // console.log('not found from navigation ');

    return notFound();
  } else if (user.razorpayID.length < 10 && user.razorpaySecret.length < 10) {
    redirect("/dashboard");
  }

  return (
    <>
      <PaymentPage params={params_data} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  let params_data = await params;

  return {
    title: params_data.username + " - Get Me A Tea",
  };
}
