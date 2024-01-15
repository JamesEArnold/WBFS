import { faCircleDollarToSlot, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"


export default function Home() {

  return (
  <div className="p-4 mx-auto">
    <div className="relative w-full h-full overflow-hidden shadow-lg md:w-fit md:mx-auto md:mb-8">
      <Image
        src="/kick-off.png"
        width="0"
        height="0"
        sizes="100vw"
        className="relative w-full h-full"
        alt="Weisburn for Sheriff Hero Image"
        priority
      />
    </div>
    <div className="flex px-4 ">
      <a className="flex justify-center w-full gap-4 py-4 mx-auto my-2 text-lg font-bold text-white uppercase bg-black rounded-md cursor-pointer drop-shadow-lg md:w-64" href="/kick-off.pdf">
        <FontAwesomeIcon icon={faPrint} className="w-4"/>
        PRINT A COPY
      </a>
    </div>
  </div>
  );
}
