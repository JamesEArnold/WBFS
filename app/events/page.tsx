'use client';

import { useState } from "react";
import { SwansonEvent } from "@/components/events/swanson-event"
import { GoldFundraiserEvent } from "@/components/events/golf-fundraiser";
import { JulyPicnicEvent } from "@/components/events/july-picnic";
import { FalconesFundraiserEvent } from "@/components/events/falcones-fundraiser";
import { GolfFundraiserEvent2 } from "@/components/events/golf-fundraiser-2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const eventExpirations = [SwansonEvent.expirationTime, GoldFundraiserEvent.expirationTime, JulyPicnicEvent.expirationTime, FalconesFundraiserEvent.expirationTime, GolfFundraiserEvent2.expirationTime];
const events = [GoldFundraiserEvent, JulyPicnicEvent, FalconesFundraiserEvent, GolfFundraiserEvent2]

export default function Home() {
  const [rightNow, setRightNow] = useState(new Date().valueOf());
  const [expiration, setExpiration] = useState(SwansonEvent.expirationTime);
  console.log('right now: ', rightNow);
  console.log('expiration: ', expiration);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <><main className="relative flex flex-col max-w-full my-8 md:mx-auto md:max-w-5xl min-h-[50vh] mb-20">
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
        {/* <h1 className="text-4xl font-bold">{ month[new Date().getMonth()] } { new Date().getFullYear() }</h1> */}
        <h1 className="text-4xl font-bold">July { new Date().getFullYear() }</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          {/* Place the event card here when there is some */}
          {(new Date().valueOf() < FalconesFundraiserEvent.expirationTime) && FalconesFundraiserEvent.eventCard}
          {(new Date().valueOf() < GolfFundraiserEvent2.expirationTime) && GolfFundraiserEvent2.eventCard}
          {/* { eventExpirations.every((expiration) => new Date().valueOf() > expiration) &&  */}
          {/* <div className="h-full p-12 my-auto mt-12 bg-slate-200">
      <h1 className="text-4xl font-bold text-center uppercase">No events scheduled</h1>
      <p className="text-3xl text-center uppercase">Check back soon</p>
    </div> */}
          {/* } */}
        </section>
      </div>
      {/* <div className="flex mt-24">
        <div className="max-h-fit">
          <div className="absolute z-20 max-w-3xl mx-auto shadow-md md:left-7">
            <h2 className="px-3 font-semibold tracking-widest uppercase bg-[#FAF9F6]">
              View our
            </h2>
            <h2 className="px-3 py-3 text-3xl font-extrabold uppercase bg-yellow-400">
              PAST EVENTS
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-10 mt-20 text-justify md:mt-32">
        <section className="mt-10 md:mt-0">
          <div className="slider-container">
            <Slider {...settings} centerMode centerPadding>
              <div className="relative flex justify-center mx-auto text-center left-5">
                <img src="/past-events/golf-1.jpg" className="max-w-lg" />
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
          </div>
        </section>
      </div> */}
    </main>                   
    </>
  )
};
