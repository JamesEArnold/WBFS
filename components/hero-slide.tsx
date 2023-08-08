import Image from "next/image";

export const HeroSlide = () => {
  return (
    <div className="relative max-h-[17rem] w-full p-3 overflow-hidden">
      <Image
          src="/hero-image.jpg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-1/2"
          alt="Weisburn for Sheriff Hero Image"
      />
    </div>
  )
};
