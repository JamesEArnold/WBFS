import Image from "next/image";
import { EmailSignupForm } from "./ui/email-signup";

export const HeroSlide = () => {
  return (
    // <div className="relative max-h-[17rem] w-full p-3 overflow-hidden">
    <>
    { /* Mobile Hero Image */}
      <div className="relative max-h-[30rem] md:hidden max-w-md mx-auto md:w-full py-3 px-3 overflow-hidden">
        <Image
          src="/sheriffweisburn1.jpg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-1/2"
          alt="Weisburn for Sheriff Hero Image" />
      </div>
      { /* Desktop Hero Image */ }
      <div className="hidden p-3 md:flex">
        <div className="relative hidden max-w-[25rem] overflow-hidden md:inline-block mr-3">
          <Image
            src="/sheriffweisburn1.jpg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full"
            alt="Weisburn for Sheriff Hero Image" />
        </div>
        <div className="z-20 hidden w-full min-h-full py-16 text-center bg-yellow-400 md:block md:max-w-3xl md:mx-auto">
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
      </div>
  </>
  )
};
