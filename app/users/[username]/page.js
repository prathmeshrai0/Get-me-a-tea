import React from "react";
import Image from "next/image";
import PaymentPage from "@/component/PaymentPage";
import { notFound } from "next/navigation";
import { fetchUser } from "@/actions/useractions";

const Username = async ({ params }) => {


  let params_data = await params
 
  // console.log(params_data);
  
  let user = await fetchUser(params_data.username)
  if (!user) {
    // console.log('not found from navigation ');
    
    return notFound()
  }

  return (


    <>
      <PaymentPage params={params_data} />



    </>
  );
};

export default Username;


export async function generateMetadata({ params }) {

  let params_data = await params

  return {
    title: params_data.username  + ' - Get Me A Tea',

  }
}
