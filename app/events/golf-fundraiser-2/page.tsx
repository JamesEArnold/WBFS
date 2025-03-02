import { faGolfBall, faGolfBallTee, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"

export default function Home() {

  return (
    <div className="p-4 mx-auto">
      <div className="flex flex-col items-center justify-center">
        {/* <Image src="/post-election/events/arrow-head-golf-outing.png" alt="Arrowhead Country Club" width={1000} height={1000} /> */}
          <div className="relative w-full h-full overflow-hidden shadow-lg md:w-fit md:mx-auto md:mb-8">
          <Image
            src="/post-election/events/arrow-head-golf-outing.png"
            width="0"
            height="0"
            sizes="50vw"
            className="relative w-full h-full"
            alt="Weisburn for Sheriff Hero Image"
            priority />
        </div>
      </div>
      <span className="flex justify-center w-full gap-4 py-3 mx-auto my-4 text-lg font-bold text-center text-yellow-400 bg-black rounded-md drop-shadow-lg md:w-72">
        <FontAwesomeIcon icon={faGolfBallTee} className="w-4 ml-2" />
        Register Your Team Below!
      </span>
      <div className="flex justify-center w-full my-4">
        <div className="w-full max-w-[500px] md:ml-20">
          <iframe 
            src="https://donorbox.org/embed/golf-outing-july-2025-2-2?" 
            name="donorbox" 
            seamless={true}
            frameBorder="0"
            scrolling="no" 
            height="900px" 
            width="100%" 
            style={{maxWidth: "500px", minWidth: "250px", maxHeight: "none!important"}} 
            allow="payment"
          />
        </div>
      </div>
        <div className="flex px-4 my-4">
          {/* <AtcWrapper /> */}
        </div>
      </div>
  );
}
