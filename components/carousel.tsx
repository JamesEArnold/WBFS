import Image from "next/image";


export const Carousel = () => {
  return (
    <>
      <div className="relative max-h-[17rem] h-[40rem] w-full overflow-hidden md:hidden px-3">
        <Image
          src="/hof-bridge.jpg"
          width="0"
          height="0"
          sizes="100vw"
          className="relative w-full h-full"
          alt="Weisburn for Sheriff Hero Image"
        />
      </div>
      <div className="relative gap-4 max-h-[30rem] pt-4 px-3 overflow-hidden hidden md:flex">
          <Image
            src="/hof-bridge.jpg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[20.5rem]"
            alt="Weisburn for Sheriff Hero Image"
            objectFit="contain"
          />
          <Image
            src="/flag.jpg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[20.5rem]"
            alt="Weisburn for Sheriff Hero Image"
            objectFit="contain"
          />
        </div>
    </>
  )
};
