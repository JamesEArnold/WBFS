import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link"

export const AboutMe = () => {
  return (
    <section>
      <div className="px-3 mt-3">
        <div className="relative max-h-[17rem] h-[40rem] w-full overflow-hidden md:hidden">
          <Image
              src="/cruiser.jpg"
              width="0"
              height="0"
              sizes="100vw"
              className="relative w-full h-full"
              alt="Weisburn for Sheriff Hero Image"
              />
        </div>
        <div className="relative gap-4 max-h-[30rem] pt-4 overflow-hidden hidden md:flex">
          <Image
            src="/cruiser.jpg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[20.5rem]"
            alt="Weisburn for Sheriff Hero Image"
          />
          <Image
            src="/canton-image-3.jpg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-1/2"
            alt="Weisburn for Sheriff Hero Image"
          />
        </div>
        <div className="px-3 pt-12">
          <h2 className="font-semibold tracking-widest uppercase">
            about me
          </h2>
          <h2 className="py-3 text-3xl font-extrabold uppercase bg-yellow-400">
            meet <br className="hidden"/> GOP Candidate <br /> eric weisburn
          </h2>
          <p className="py-6 text-lg text-justify md:px-12">
          Republican candidate Eric Weisburn has proven experience and commitment to the citizens of Stark County. 
          With Eric's strong sense of duty, he will always lead the Sheriff’s Office from the frontline.
          Place your trust in Eric Weisburn. He is the right choice… a Sheriff who will work for 
            <span className="relative mx-3">
              <span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span>
              <span className="relative font-bold text-black">YOU!</span>
            </span>
          <br />
          <br />
          <span className="text-2xl text-center">
            Action starts 
            <span className="relative mx-3">
                <span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span>
                <span className="relative font-bold text-black">NOW!</span>
            </span>
          </span>
          </p>
        </div>
        <div className="py-3 mx-3 mb-8">
          {/* <Link href="/about" legacyBehavior passHref>
            <Button className="text-black uppercase bg-yellow-400 rounded hover:bg-black hover:text-yellow-400"><span className="px-6 font-bold">Learn More</span></Button>
          </Link> */}
        </div>
      </div>
    </section>
  )
}
