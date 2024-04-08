import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface EventProps {
  link: string;
  imgSrc: string;
  imgStyling: string;
  time: string;
  addressLine1: string;
  addressLine2: string;
  eventName: string;
  eventSubtitle: string;
}

export const EventCard = ({ link, imgSrc, imgStyling, time, addressLine1, addressLine2, eventName, eventSubtitle }: EventProps) => {
  return <Link href={link} legacyBehavior passHref>
            <div className="bg-[#FAF9F6] border rounded shadow-lg cursor-pointer border-gray-50 md:max-w-md">
              <div className="p-4">
                <div className="relative max-h-[50rem] md:h-[20rem] w-full h-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className={imgStyling}
                      alt="Weisburn for Sheriff Hero Image"
                      priority
                    />
                </div>
                <div className="mt-2 text-sm italic text-gray-500">
                  {time}
                </div>
                <div className="mt-2 text-sm italic text-gray-500">
                  {addressLine1} <br /> {addressLine2}
                </div>
                <hr className="w-20 border-2 border-yellow-400"/>
                <div className="relative mt-4 text-2xl font-extrabold text-black">
                  {eventName}
                </div>
                <div className="mt-1 text-sm">
                  {eventSubtitle}
                </div>
              </div>
              <hr className="w-full border border-gray-200" />
              <div className="flex justify-between p-4">
                <span className="my-auto text-gray-500">READ MORE</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-6 text-gray-500"/>
              </div>
            </div>
          </Link>
}
