import Image from "next/image";
import { Button } from "./ui/button";

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
            meet <br /> eric weisburn
          </h2>
          <p className="py-3">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
          Nulla vel elit ut dolor rhoncus varius. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. 
          Fusce vel urna sit amet tortor mattis tincidunt ac ut nulla. Cras rutrum quis tortor a accumsan. 
          </p>
        </div>
        <div className="py-3 mx-3 mb-8">
          <Button className="text-black uppercase bg-yellow-400 rounded hover:bg-black hover:text-yellow-400"><span className="px-6 font-bold">Learn More</span></Button>
        </div>
      </div>
    </section>
  )
}
