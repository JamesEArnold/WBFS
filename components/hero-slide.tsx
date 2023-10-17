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
          alt="Weisburn for Sheriff Hero Image" 
          priority
        />
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
            alt="Weisburn for Sheriff Hero Image" 
            priority
            />
        </div>
        <div className="relative hidden w-full my-auto mr-3 overflow-hidden md:inline-block">
          <Image
            src="/ElectWeisburnForSheriff.png"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full bg-yellow-400"
            alt="Weisburn for Sheriff Hero Image" />
        </div>
      </div>
      <div className="px-3">
        <div className="z-20 hidden w-full min-h-full py-16 mb-3 text-center border-[22px] border-yellow-400 md:block md:mx-auto" id="tempVolunteer">
          <div className="max-w-3xl mx-auto">
            {/* <h2 className="uppercase font-bold tracking-[0.2em] text-yellow-400">stay updated</h2> */}
            <h2 className="text-4xl font-bold uppercase">Stay Updated</h2>
            <h2 className="text-4xl font-bold uppercase">Throughout my Campaign</h2>
            <EmailSignupForm />
            <div className="flex justify-center mt-4 flex-center">
              { /* TODO: Make these buttons, and then actually link them to the socials */}
              <a href="https://www.facebook.com/profile.php?id=61552050077933">
                <Image
                  src="/icon-facebook.svg"
                  width="50"
                  height="50"
                  alt="Weisburn for Sheriff Facebook"
                  className="mx-2"
                />
              </a>
              <a href="https://instagram.com/weisburnforsheriff">
                <Image
                  src="/icon-instagram.svg"
                  width="50"
                  height="50"
                  alt="Weisburn for Sheriff Twitter"
                  className="mx-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
  </>
  )
};
