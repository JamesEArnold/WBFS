"use client";

import Image from "next/image";
import Link from "next/link";
import { SheriffStar } from "./ui/icons";
import { GolfFundraiserEvent2 } from "./events/golf-fundraiser-2";

export const HeroSlide = () => {
  return (
    <>
      {/* Full-width hero section with no external constraints */}
      <section className="bg-gradient-to-b from-[#fcd34b] to-[#fcd34b]/70 py-16 w-full">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
            {/* Text column - order-2 on mobile, order-1 on desktop */}
            <div className="order-2 md:order-1">
              <div className="flex items-center mx-auto mb-4">
                <SheriffStar size={28} color="#000000" />
                <SheriffStar size={28} color="#000000" />
                <span className="ml-3 text-4xl italic font-bold">Re-Elect</span>
                <SheriffStar size={28} color="#000000" className="ml-4" />
                <SheriffStar size={28} color="#000000" />
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">SHERIFF WEISBURN</h1>
              <p className="mb-6 text-xl">Dedicated to protecting our community with integrity and experience.</p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/about" 
                  className="bg-black text-[#fcd34b] font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-200 text-center"
                >
                  Learn More
                </Link>
                <Link 
                  href="/donate" 
                  className="bg-[#fcd34b] text-black border-2 border-black font-bold py-3 px-6 rounded-md hover:bg-[#f7c948] transition duration-200 text-center"
                >
                  Support Our Campaign
                </Link>
              </div>
            </div>
            
            {/* Image column with stylized border - order-1 on mobile, order-2 on desktop */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative">
                {/* Black background with rotation for styling effect */}
                {/* <div className="absolute inset-0 transform translate-x-2 translate-y-2 bg-black rounded-lg rotate-3"></div> */}
                <div className="relative overflow-hidden bg-white border-4 border-black rounded-lg shadow-xl w-72 h-100 md:w-[26rem] md:h-[32rem]">
                  <Image
                    src="/post-election/head-shot-with-hat.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    alt="Sheriff Eric Weisburn Portrait"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event card in a container matching the main content width
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="relative p-6 overflow-hidden bg-black md:w-fit md:mx-auto md:mb-4">
          {GolfFundraiserEvent2.eventCard}
        </div>
      </div> */}
    </>
  );
};
