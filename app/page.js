import Hero from "@/component/Pages/Home/Hero";
import Services from "@/component/Pages/Home/Services";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="  text-white font-mono ">
        <div  >
          <Hero />
          <div className="h-[1px] bg-white"></div>
          <Services />
        </div>
      </div>
    </>
  );
} 
