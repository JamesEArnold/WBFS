import { faGolfBall, faGolfBallTee, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"

export default function Home() {

  return (
    <div className="p-4 mx-auto">
          <a className="flex justify-center w-full gap-4 py-3 mx-auto my-4 text-lg font-bold text-center text-yellow-400 bg-black rounded-md cursor-pointer drop-shadow-lg md:w-72" href="/event-golf-fundraiser-registration-form.pdf">
            <FontAwesomeIcon icon={faGolfBallTee} className="w-4 ml-2" />
            Register Your Team Now!
          </a>
        <div className="relative w-full h-full overflow-hidden shadow-lg md:w-fit md:mx-auto md:mb-8">
          <Image
            src="/event-golf-fundraiser.jpg"
            width="0"
            height="0"
            sizes="50vw"
            className="relative w-full h-full"
            alt="Weisburn for Sheriff Hero Image"
            priority />
        </div>
        <div className="flex px-4 my-4">
          <a className="flex justify-center w-full gap-4 py-3 mx-auto my-4 text-lg font-bold text-center text-yellow-400 bg-black rounded-md cursor-pointer drop-shadow-lg md:w-72" href="/event-golf-fundraiser-registration-form.pdf">
            <FontAwesomeIcon icon={faGolfBallTee} className="w-4 ml-2" />
            Register Your Team Now!
          </a>
          {/* <AtcWrapper /> */}
        </div>
      </div>
  );
}
