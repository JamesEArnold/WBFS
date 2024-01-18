import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative flex flex-col max-w-full my-8 md:mx-auto md:max-w-5xl">
      <div className="flex">
        <div className="max-h-fit">
          <div className="absolute z-20 max-w-3xl mx-auto shadow-md md:left-7">
            <h2 className="px-3 font-semibold tracking-widest uppercase bg-[#FAF9F6]">
              Support our
            </h2>
            <h2 className="px-3 py-3 text-3xl font-extrabold uppercase bg-yellow-400">
              UPCOMING EVENTS
            </h2>
          </div>
          {/* <div className="md:p-3 md:shadow-md bg-white/50">
            <div className="relative max-h-[50rem] md:h-[24rem] w-full h-full overflow-hidden">
              <Image
                  src="/weisburn-family-2-min.jpg"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="relative w-full h-full scale-125"
                  alt="Weisburn for Sheriff Hero Image"
                  priority
                  />
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col mx-10 mt-20 text-justify md:mt-32">
        <section className="mt-10 md:mt-0">
          <h1 className="text-4xl font-bold">February 2024</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <Link href="/events/kick-off" legacyBehavior passHref>
            <div className="bg-[#FAF9F6] border rounded shadow-lg cursor-pointer border-gray-50 md:max-w-md">
              <div className="p-4">
                <div className="relative max-h-[50rem] md:h-[20rem] w-full h-full overflow-hidden">
                    <Image
                      src="/arrowhead.jpg"
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="relative w-full h-full scale-125"
                      alt="Weisburn for Sheriff Hero Image"
                      priority
                    />
                </div>
                <div className="mt-2 text-sm italic text-gray-500">
                  February 28, 2024 - 5 PM - 7 PM
                </div>
                {/* <div className="mt-2 text-sm italic text-gray-500">
                  1500 Rogwin Circle S.W., <br /> North Canton, Ohio 44720
                </div> */}
                <hr className="w-20 border-2 border-yellow-400"/>
                <div className="relative mt-4 text-2xl font-extrabold text-black">
                  Campaign Kick Off Event
                </div>
                <div className="mt-1 text-sm">
                  Join us as we kick off the Weisburn for Sheriff Campaign with friends and family.
                </div>
              </div>
              <hr className="w-full border border-gray-200" />
              <div className="flex justify-between p-4">
                <span className="my-auto text-gray-500">READ MORE</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-6 text-gray-500"/>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  )
};
