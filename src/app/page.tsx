"use client"
import AuthForm from "@/components/AuthForm";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { CrossIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthFormClicked, setIsAuthFormClicked] = useState<boolean>(false);
  const [isLearningClicked, setIsLearningClicked] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthFormClicked) {
      if (typeof window === 'object') {
      document.body.classList.add("overflow-hidden");
      }
    } else {
      if (typeof window === 'object') {
      document.body.classList.remove("overflow-hidden");
      }
    }
    return () => {
      if (typeof window === 'object') {
      document.body.classList.remove("overflow-hidden");
      }
    };
  }, [isAuthFormClicked]);

  return (
    <div className="min-h-screen bg-[#08040b] text-white">
      <div className="container mx-auto h-full w-full">
        <HeroSection
          isAuthFormClicked={isAuthFormClicked}
          setIsAuthFormClicked={setIsAuthFormClicked}
          setIsLearningClicked={setIsLearningClicked}
        />
        <FeaturesSection/>
        <Footer />
      </div>
      {isAuthFormClicked && (
  <div className="modal-overlay">
    <div className="relative w-full bg-blur-md p-8 rounded-lg shadow-xl">
    <AuthForm isLearningClicked={isLearningClicked} />
      <button
        onClick={() => setIsAuthFormClicked(false)}
        className="absolute top-[24%] right-[35%] text-gray-400 hover:text-white"
      >
        <CrossIcon className="rotate-180"/>
      </button>
    </div>
  </div>
)}

    </div>
  );
}
