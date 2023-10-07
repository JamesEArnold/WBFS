import { Button } from "./ui/button";
import Image from "next/image";

export const Footer = () => {
  return <div className="bg-white">
    <div className="bg-yellow-400">
      <div className="flex flex-col w-10/12 py-6 mx-auto md:flex-row md:max-w-5xl md:justify-center">
        <Button className="gap-4 p-8 my-2 text-lg font-bold uppercase bg-black rounded-md drop-shadow-lg md:w-64 md:mr-2">Volunteer</Button>
        <Button className="gap-4 p-8 my-2 text-lg font-bold uppercase bg-black rounded-md drop-shadow-lg md:w-64">Contribute</Button>
      </div>
    </div>
    {/* <hr className="w-8/12 h-px mx-auto my-8 bg-gray-800 border-0 opacity-25 dark:bg-gray-700"></hr> */}
    <div className="flex flex-col w-full h-full mx-auto mt-4">
      <Image
          priority
          src="/ElectWeisburnForSheriff.png"
          alt="Weisburn For Sheriff"
          height={150}
          width={380}
          className="mx-auto bg-yellow-400"
        />
        <div className="flex w-8/12 max-w-sm mx-auto my-2 uppercase border-2 border-black rounded opacity-40">
          <span className="mx-auto py-3 text-[11px] opacity-100">Paid for by Weisburn for Sheriff</span>
        </div>
        <div className="flex flex-col w-8/12 mx-auto mt-4 text-sm opacity-60">
          <span className="mx-auto">123 Fake Street Canton, OH 44701</span>
          <span className="mx-auto"> weisburnforsheriff@gmail.com</span>
        </div>
        <div className="flex justify-center mt-4 mb-10 flex-center">
          { /* TODO: Make these buttons, and then actually link them to the socials */}
          <a href="https://facebook.com/weisburnforsheriff">
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
              width="45"
              height="45"
              alt="Weisburn for Sheriff Twitter"
              className="mx-2 mt-[3px]"
            />
          </a>
        </div>
    </div>
  </div>
};
