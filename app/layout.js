import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import SessionWrapper from "@/component/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me A Tea - A website for getting funds with tip as Tea",
  description: "This website is for crowdfunding for Heartist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   border-red-700 h-auto `}
      // className="relative border-red-600     min-h-fit "
      >
        <SessionWrapper>
          <Navbar />

          <div className=" relative border-red-600       h-auto     ">
        



            <div className="area min-h-screen   absolute top-0 h-full w-full ">
              <ul className="circles  -z-[10]">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>



            </div>
            {children}
          </div>

          <Footer />
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
        </SessionWrapper>
      </body>
    </html>
  );
}
