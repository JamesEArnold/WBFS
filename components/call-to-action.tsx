import Image from "next/image";
import { EmailSignupForm } from "./ui/email-signup";

export const CallToActionTop = () => {
  return (
    <section className="p-3 min-h-[50vh]">
      <div className="bg-yellow-400 min-h-[48vh] py-16 text-center">
        <div className="mx-auto md:max-w-3xl">
          <h2 className="uppercase font-bold tracking-[0.2em] text-white">Stay Updated</h2>
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
              src="/icon-twitter.png"
              width="50"
              height="50"
              alt="Weisburn for Sheriff Twitter"
              className="mx-2"
            />
          </div>
        </div>
      </div>
    </section>
  )
};

export const CallToActionBottom = () => {
  return (
    <section className="p-3 min-h-[50vh]">
      <div className="min-h-[48vh] py-16 text-center">
        <h2 className="uppercase font-bold tracking-[0.2em] text-yellow-400">join the team</h2>
        <h2 className="text-4xl font-bold uppercase">Get Involved</h2>
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
            src="/icon-twitter.png"
            width="50"
            height="50"
            alt="Weisburn for Sheriff Twitter"
            className="mx-2"
          />
        </div>
      </div>
    </section>
  )
};
