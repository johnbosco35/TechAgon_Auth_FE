import React from "react";
import img from "../assets/auth-image.jpg"; // Replace with your actual image
import NucleusLogo from "./NucleusLogo";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Side */}
      <div
        className="relative w-[40%]"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Top Logo Section */}
        <div className="absolute top-0 left-0 z-10 flex items-center gap-2 p-5 text-white">
          <NucleusLogo />
          <span className="text-3xl font-semibold">Nucleus</span>
        </div>

        {/* Quote Section */}
        <div className="absolute right-0 z-10 w-full px-6 text-white bottom-10">
          <blockquote className="mb-4 text-3xl font-medium leading-relaxed">
            "Simply all the tools that my team and I need."
          </blockquote>
          <div className="space-y-1">
            <div className="font-semibold">Karen Yue</div>
            <div className="text-sm opacity-90">
              Director of Digital Marketing Technology
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center  w-[60%]">
        {children}
      </div>
    </div>
  );
}
