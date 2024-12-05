"use client"

import React from "react";
import { Button } from "./ui/button";
import { BackgroundLines } from "./ui/background-lines";

import { Bot, Brain } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type HeroSectionProps = {
  isAuthFormClicked: boolean;
  setIsAuthFormClicked: (value: boolean) => void; // Function to update the state
  setIsLearningClicked:(value:boolean)=> void
};

const HeroSection: React.FC<HeroSectionProps> = ({  setIsAuthFormClicked , setIsLearningClicked}) => {
  const {status} = useSession()
  const router = useRouter()
  const loginPageHandler = (e:React.SyntheticEvent)=>{
    e.preventDefault();

    if(status === "authenticated"){
      router.push(`/dashboard/learning`)
    }else{
      setIsLearningClicked(true)
      setIsAuthFormClicked(true)
    }

  }
  return (
    <BackgroundLines className="bg-transparent w-full h-full">
      <section className="container mx-auto py-20 h-[80%] w-full flex flex-col items-center justify-center">
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight select-none">
          Level Up Your Tech Career with JobAlgorithma
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center select-none">
          Find your dream tech job, master DSA, and ace interviews with
          AI-powered learning.
        </p>
        <div className="mt-3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 relative">
        <Button onClick={loginPageHandler} className="relative bg-black dark:bg-white dark:text-black text-white flex items-center justify-center group overflow-hidden shadow-blue-400 shadow-2xl animate-bounce">
            <span className="text-center transition-transform duration-500 text-md transform group-hover:translate-x-40 select-none">
              Start Learning With AI
            </span>
            <div className="absolute inset-0 flex items-center justify-center gap-4 transition-transform duration-500 transform -translate-x-40 group-hover:translate-x-0 text-white z-20">
            <Bot className="" color="blue" size={30}/>
            <Brain className="" color="blue" size={30} />
            </div>
          </Button>

          <Button
            variant="outline"
            className="text-white border-white w-full absolute top-[99%] -left-[10%] md:flex hover:bg-white hover:text-[#08040b]"
          >
            Explore Jobs
          </Button>
        </div>
      </section>
    </BackgroundLines>
  );
};

export default HeroSection;
