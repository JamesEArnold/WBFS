import Image from "next/image";
import { EmailSignupForm } from "./ui/email-signup";
import { Video } from "./ui/videos";
import Link from "next/link";
import { GolfFundraiserEvent2 } from "./events/golf-fundraiser-2";
import { GolfEventFlyer } from "./ui/golf-event-flyer";

export const HeroSlide = () => {
  return (
    // <div className="relative max-h-[17rem] w-full p-3 overflow-hidden">
    <>
    { /* Mobile Hero Image */}
      <div className="relative max-h-[30rem] md:hidden max-w-md mx-auto md:w-full py-3 px-3 overflow-hidden">
        <Image
          src="/post-election/head-shot-with-hat.jpg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
          alt="Weisburn for Sheriff Hero Image" 
          priority
        />
      </div>
      { /* Desktop Hero Image */ }
      <div className="hidden p-3 md:flex">
        <div className="relative hidden max-w-[25rem] overflow-hidden md:inline-block mr-3">
          <Image
            src="/post-election/head-shot-with-hat.jpg"
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
            src="/post-election/ReElectWeisburnForSheriff.png"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full bg-yellow-400"
            alt="Weisburn for Sheriff Hero Image" />
        </div>
      </div>
      <div className="px-3">
        {/* <div className="z-20 hidden w-full min-h-full mb-3 text-center border-[22px] border-yellow-400 md:block md:mx-auto" id="tempVolunteer">
          <Video />
        </div> */}
        <div className="relative w-full h-full min-w-full p-6 overflow-hidden md:w-fit md:mx-auto md:mb-4">
          <div className="relative w-full md:w-[60%] mx-auto">
            {/* Ribbon button wrapping the top of the flyer */}
            <Link
              href="/events/golf-fundraiser-3"
              className="relative z-10 flex items-center justify-center w-[85%] mx-auto py-3 rounded-t-lg font-serif font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 ease-out hover:brightness-110 active:scale-[0.98]"
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                background: "linear-gradient(135deg, #facc15, #eab308, #facc15)",
                boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
              }}
            >
              View Event Details &rarr;
            </Link>
            <GolfEventFlyer mode="save-the-date" />
          </div>
        </div>
        <div className="z-20 hidden w-full min-h-full py-16 mb-3 text-center border-[22px] border-yellow-400 md:block md:mx-auto" id="tempVolunteer">
          <div className="max-w-3xl mx-auto">
            {/* <h2 className="uppercase font-bold tracking-[0.2em] text-yellow-400">stay updated</h2> */}
            <h2 className="text-4xl font-bold uppercase">Stay Updated</h2>
            <h2 className="text-4xl font-bold uppercase">Join our effort</h2>
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
