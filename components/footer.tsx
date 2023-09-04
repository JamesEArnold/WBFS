import { Button } from "./ui/button";
import Image from "next/image";

export const Footer = () => {
  return <div className="bg-yellow-400">
    <div className="flex flex-col w-10/12 mx-auto mt-6">
      <Button className="uppercase p-8 font-bold text-lg drop-shadow-lg rounded-md my-2">Volunteer</Button>
      <Button className="uppercase p-8 font-bold text-lg drop-shadow-lg rounded-md">Contribute</Button>
      <hr className="h-px my-8 bg-gray-800 opacity-25 border-0 dark:bg-gray-700"></hr>
    </div>
    <div className="flex flex-col mx-auto w-full h-full mt-4">
      <Image
          priority
          src="/logo.svg"
          alt="Weisburn For Sheriff"
          height={150}
          width={380}
          className="mx-auto"
        />
        <div className="flex w-8/12 uppercase mx-auto border-2 border-black opacity-40 my-2 rounded">
          <span className="mx-auto py-3 text-[11px] opacity-100">Paid for by Weisburn for Sheriff</span>
        </div>
        <div className="flex flex-col w-8/12 mx-auto text-sm opacity-60 mt-4">
          <span className="mx-auto">123 Fake Street Canton, OH 44701</span>
          <span className="mx-auto"> weisburnforsheriff@gmail.com</span>
        </div>
        <div className="flex flex-center justify-center mt-4 mb-20">
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
