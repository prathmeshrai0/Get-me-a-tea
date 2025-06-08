import React from "react";
import Dashboard from "@/component/Pages/Dashboard/Dashboard";
import { useSession } from "next-auth/react";

const dashboard = () => {
  return (
    <>
 
      <Dashboard />
      
    </>
  );
};

export default dashboard;


export const metadata = {
  title: 'Dashboard - Get Me A Tea',
 
}