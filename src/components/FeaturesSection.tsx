import Image from "next/image"
import {WobbleCard} from "@/components/ui/wobble-card"
import headerBoy from "@/assets/header-boy.webp"
import headerRobot from "@/assets/header-robot.webp"
import headerWave from "@/assets/header-wave.webp"

export function FeaturesSection() {

  return(
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full p-4">
    <WobbleCard
      containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
    >
      <div className="max-w-sm">
        <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Discover Jobs That Match Your Skills
        </h2>
        <p className="mt-4 text-left text-sm sm:text-base text-neutral-200">
          Browse curated tech job listings tailored to your expertise and preferences. From startups to MNCs, we&apos;ve got you covered.
        </p>
      </div>
      <Image
        src={headerBoy}
        alt="headerBoy image"
        className="absolute -right-4 bottom-0 grayscale filter object-contain rounded-2xl w-[150px] md:w-[200px]"
      />
    </WobbleCard>
    <WobbleCard
      containerClassName="col-span-1 min-h-[300px] md:min-h-[400px]"
    >
      <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Master DSA and Crack Interviews.
      </h2>
      <p className="mt-4 text-sm sm:text-base text-neutral-200">
        Access a comprehensive library of Data Structures and Algorithms (DSA) problems and solutions, crafted for all experience levels.
      </p>
    </WobbleCard>
    <WobbleCard
      containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] md:min-h-[400px] xl:min-h-[500px]"
    >
      <div className="max-w-md">
        <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Learn Smarter with AI-Powered Hints.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-200">
          Stuck on a problem? Get instant, personalized hints from our AI assistant to keep you moving forward.
        </p>
      </div>
      <Image
        src={headerRobot}
        alt="headerRobot image"
        className="absolute right-0 -bottom-0 object-contain rounded-2xl w-[150px] md:w-[200px]"
      />
    </WobbleCard>
    <WobbleCard
      containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] md:min-h-[400px] xl:min-h-[500px]"
    >
      <div className="max-w-md">
        <Image
          src={headerWave}
          alt="header wave image"
          className="absolute right-0 -bottom-10 object-contain rounded-2xl w-[150px] md:w-[200px]"
        />
        <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Custom Tests for Real Interview Prep
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-200">
          Simulate real interviews with AI-generated tests tailored to your job role. Analyze your performance and improve.
        </p>
      </div>
    </WobbleCard>
  </div>
  
  )
  }
  