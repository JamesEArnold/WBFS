import { Button } from "./ui/button";
import Image from "next/image";

export const Footer = () => {
  return <div className="bg-yellow-400">
    <div className="flex flex-col w-10/12 pt-6 mx-auto md:flex-row md:max-w-5xl md:justify-center">
      <Button className="gap-4 p-8 my-2 text-lg font-bold uppercase rounded-md drop-shadow-lg md:w-64 md:mr-2">Volunteer</Button>
      <Button className="gap-4 p-8 my-2 text-lg font-bold uppercase rounded-md drop-shadow-lg md:w-64">Contribute</Button>
      <hr className="h-px my-8 bg-gray-800 border-0 opacity-25 dark:bg-gray-700"></hr>
    </div>
    <div className="flex flex-col w-full h-full mx-auto mt-4">
      <Image
          priority
          src="/logo.svg"
          alt="Weisburn For Sheriff"
          height={150}
          width={380}
          className="mx-auto"
        />
        <div className="flex w-8/12 max-w-sm mx-auto my-2 uppercase border-2 border-black rounded opacity-40">
          <span className="mx-auto py-3 text-[11px] opacity-100">Paid for by Weisburn for Sheriff</span>
        </div>
        <div className="flex flex-col w-8/12 mx-auto mt-4 text-sm opacity-60">
          <span className="mx-auto">123 Fake Street Canton, OH 44701</span>
          <span className="mx-auto"> weisburnforsheriff@gmail.com</span>
        </div>
        <div className="flex justify-center mt-4 mb-20 flex-center">
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
};
