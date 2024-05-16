'use client';

import { useState } from "react";
import { SwansonEvent } from "@/components/events/swanson-event"
import { GoldFundraiserEvent } from "@/components/events/golf-fundraiser";
import { JulyPicnicEvent } from "@/components/events/july-picnic";

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const eventExpirations = [SwansonEvent.expirationTime, GoldFundraiserEvent.expirationTime, JulyPicnicEvent.expirationTime];
const evets = [GoldFundraiserEvent, JulyPicnicEvent]

export default function Home() {
  const [rightNow, setRightNow] = useState(new Date().valueOf());
  const [expiration, setExpiration] = useState(SwansonEvent.expirationTime);
  console.log('right now: ', rightNow);
  console.log('expiration: ', expiration);

  return (
    <main className="relative flex flex-col max-w-full my-8 md:mx-auto md:max-w-5xl min-h-[50vh]">
      <div className="flex">
        <div className="max-h-fit">
          <div className="absolute z-20 max-w-3xl mx-auto shadow-md md:left-7">
            <h2 className="px-3 font-semibold tracking-widest uppercase bg-[#FAF9F6]">
              Support our
            </h2>
            <h2 className="px-3 py-3 text-3xl font-extrabold uppercase bg-yellow-400">
              UPCOMING EVENTS
            </h2>
          </div>
          {/* <div className="md:p-3 md:shadow-md bg-white/50">
            <div className="relative max-h-[50rem] md:h-[24rem] w-full h-full overflow-hidden">
              <Image
                  src="/weisburn-family-2-min.jpg"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="relative w-full h-full scale-125"
                  alt="Weisburn for Sheriff Hero Image"
                  priority
                  />
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col mx-10 mt-20 text-justify md:mt-32">
        <section className="mt-10 md:mt-0">
          {/* TODO: Uncomment this section when were ready to show monthly events.  But with the golf fundraiser
          in August were just going to show August instead of the current month */}
          {/* <h1 className="text-4xl font-bold">{ month[new Date().getMonth()] } 2024</h1> */}
          <h1 className="text-4xl font-bold">JULY 2024</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          { /* Place the event card here when there is some */}
          { (new Date().valueOf() < JulyPicnicEvent.expirationTime) && JulyPicnicEvent.eventCard }
          <br className="my-8" />
          <h1 className="text-4xl font-bold">AUGUST 2024</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          { /* Place the event card here when there is some */}
          { (new Date().valueOf() < GoldFundraiserEvent.expirationTime) && GoldFundraiserEvent.eventCard }
          { eventExpirations.every((expiration) => new Date().valueOf() > expiration) && 
          <div className="h-full p-12 my-auto mt-12 bg-slate-200">
            <h1 className="text-4xl font-bold text-center uppercase">No events scheduled</h1>
            <p className="text-3xl text-center uppercase">Check back soon</p>
          </div>
          }
        </section>
      </div>
    </main>
  )
};
