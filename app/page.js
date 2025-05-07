import Hero from "@/component/Sections/Home/Hero";
import Services from "@/component/Sections/Home/Services";
import Image from "next/image";
 
export default function Home() {
  return (
    <> 
      <div className="h-full text-white font-mono ">
        <Hero />
        <div className="h-[1px] bg-white"></div>
        <Services />
      </div>
    </>
  ); 
} 
