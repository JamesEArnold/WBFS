import Image from "next/image";
import { Button } from "./ui/button";

export const AboutMe = () => {
  return (
    <section>
      <div className="px-3">
        <div className="relative max-h-[17rem] w-full pt-12 overflow-hidden">
            <Image
                src="/hero-image.jpg"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-1/2"
                alt="Weisburn for Sheriff Hero Image"
                />
        </div>
        <div className="px-3 pt-12">
          <h2 className="uppercase font-semibold tracking-widest">
            about me
          </h2>
          <h2 className="uppercase font-extrabold text-3xl py-3 bg-yellow-400">
            meet sheriff <br /> eric weisburn
          </h2>
          <p className="py-3">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
          Nulla vel elit ut dolor rhoncus varius. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. 
          Fusce vel urna sit amet tortor mattis tincidunt ac ut nulla. Cras rutrum quis tortor a accumsan. 
          </p>
        </div>
        <div className="py-3 mx-3">
          <Button className="uppercase rounded bg-yellow-400"><span className="px-6 text-black font-bold">Learn More</span></Button>
        </div>
      </div>
    </section>
  )
}
