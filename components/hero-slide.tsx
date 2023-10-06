import Image from "next/image";
import { EmailSignupForm } from "./ui/email-signup";

export const HeroSlide = () => {
  return (
    // <div className="relative max-h-[17rem] w-full p-3 overflow-hidden">
    <>
    { /* Mobile Hero Image */}
      <div className="relative max-h-[30rem] md:hidden max-w-md mx-auto md:w-full p-3 overflow-hidden">
        <Image
          src="/sheriffweisburn1.jpg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-1/2"
          alt="Weisburn for Sheriff Hero Image" />
      </div>
      { /* Desktop Hero Image */ }
      <div className="relative hidden p-3 mx-auto overflow-hidden md:inline-block md:w-full">
        <Image
          src="/GradientHeroImagePerfect.png"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full"
          alt="Weisburn for Sheriff Hero Image" />
      </div>
        <div className="min-h-[48vh] absolute hidden md:block w-1/2 h-1/2 z-20 py-16 text-center md:max-w-3xl md:mx-auto top-0 left-0 translate-x-3/4">
          <h2 className="uppercase font-bold tracking-[0.2em] text-white">stay updated</h2>
          <h2 className="text-4xl font-bold uppercase">Protecting</h2>
          <h2 className="text-4xl font-bold uppercase">Stark County</h2>
          <EmailSignupForm />
          <div className="flex justify-center mt-4 flex-center">
            { /* TODO: Make these buttons, and then actually link them to the socials */}
            <Image
              src="/icon-facebook.svg"
              width="50"
              height="50"
              alt="Weisburn for Sheriff Facebook"
              className="mx-2"
            />
            <Image
              src="/icon-instagram.svg"
              width="50"
              height="50"
              alt="Weisburn for Sheriff Twitter"
              className="mx-2"
            />
          </div>
        </div>
  </>
  )
};
