import Image from "next/image";


export const Carousel = () => {
  return (<div className="relative max-h-[17rem] w-full pt-16 overflow-hidden">
      { /* TODO: Make this a sliding carousel of Stark County images. Just implement
      the flow for now and we'll put the real pictures in later.  */}
      <Image
      src="/canton-image-1.jpg"
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-1/2"
      alt="Weisburn for Sheriff Hero Image"
      />
</div>)
};
