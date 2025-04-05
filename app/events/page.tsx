'use client';

import { useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { SwansonEvent } from "@/components/events/swanson-event"
import { GoldFundraiserEvent } from "@/components/events/golf-fundraiser";
import { JulyPicnicEvent } from "@/components/events/july-picnic";
import { FalconesFundraiserEvent } from "@/components/events/falcones-fundraiser";
import { GolfFundraiserEvent2 } from "@/components/events/golf-fundraiser-2";

// List of all events
const allEvents = [GoldFundraiserEvent, JulyPicnicEvent, FalconesFundraiserEvent, GolfFundraiserEvent2];

// Function to extract date information from event time string
const extractDateInfo = (timeString: string) => {
  const parts = timeString.split(' - ')[0].split(', ');
  const monthDay = parts[0].split(' ');
  
  return {
    month: monthDay[0],
    shortMonth: monthDay[0].substring(0, 3).toUpperCase(),
    day: monthDay[1],
    year: parts[1],
    weekday: new Date(`${monthDay[0]} ${monthDay[1]}, ${parts[1]}`).toLocaleDateString('en-US', { weekday: 'long' })
  };
};

// Function to get event props from event card component
const getEventProps = (eventCard: React.ReactElement) => {
  return eventCard.props;
};

export default function Events() {
  const [currentTime] = useState(new Date().valueOf());
  
  // Filter to get future events
  const upcomingEvents = allEvents.filter(event => currentTime < event.expirationTime);
  
  // Sort by expiration date (closest first)
  upcomingEvents.sort((a, b) => a.expirationTime - b.expirationTime);
  
  // Get featured event (if available)
  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-wider text-black uppercase md:text-5xl">CAMPAIGN EVENTS</h1>
          <div className="h-1 w-32 bg-[#fcd34b] mx-auto mb-4"></div>
          <p className="max-w-3xl mx-auto text-xl">Join Sheriff Weisburn at these upcoming events and help support the campaign.</p>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
              <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="section-title">FEATURED EVENT</h2>
          <div className="relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[#fcd34b]/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-8 my-12 transform bg-black -rotate-12" style={{ width: '150%' }} />
                ))}
              </div>
            </div>
            
            <div className="relative border-4 border-[#fcd34b] rounded-lg overflow-hidden shadow-xl">
              {/* Top ribbon */}
              <div className="bg-gradient-to-r from-[#fcd34b] to-[#f7c948] p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">★</span>
                  <span className="text-xl font-bold uppercase">Featured Event</span>
                  <span className="text-lg font-bold">★</span>
                </div>
                <div className="bg-black text-[#fcd34b] px-4 py-1 rounded-full text-sm font-bold">SAVE THE DATE</div>
              </div>
              
              <div className="p-8 bg-white">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  {/* Date box */}
                  <div className="md:w-1/3">
                    <div className="relative">
                      <div className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black rounded-lg rotate-2"></div>
                      <div className="relative bg-[#fcd34b] text-black p-6 rounded-lg text-center border-2 border-black shadow-lg">
                        <div className="text-xl font-bold uppercase">Friday</div>
                        <div className="my-2 text-5xl font-black">JULY 25</div>
                        <div className="text-xl font-bold">2025</div>
                        <div className="pt-2 mt-2 text-lg font-semibold border-t-2 border-black/30">
                          8:00 AM - 4:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event details */}
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-black text-[#fcd34b] rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold">!</span>
                      </div>
                      <h3 className="text-3xl font-bold">Golf Outing</h3>
                    </div>
                    
                    <div className="flex items-center mb-4 text-gray-700">
                      <Calendar className="mr-2 text-black" size={20} />
                      <span className="font-medium">Arrowhead Country Club</span>
                    </div>
                    
                    <p className="mb-6 text-lg">
                      Join Sheriff Weisburn for a day of golf to support the campaign. 
                      Early registration available with special pricing. All skill levels welcome!
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link href="/events/golf-fundraiser-2" className="px-8 py-3 font-bold text-black transition bg-white border-2 border-black rounded-md hover:bg-gray-100">
                        More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* All Events */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="section-title">UPCOMING EVENTS</h2>
          
          <div className="grid grid-cols-1 gap-8 mt-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => {
                const eventProps = getEventProps(event.eventCard);
                const dateInfo = extractDateInfo(eventProps.time);
                
                return (
                  <div key={index} className="overflow-hidden bg-white rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row">
                      {/* Date column */}
                      <div className="bg-black text-[#fcd34b] p-6 md:w-1/5 flex flex-col justify-center items-center text-center">
                        <div className="text-lg font-semibold">
                          {dateInfo.weekday}
                        </div>
                        <div className="my-1 text-3xl font-bold">
                          {dateInfo.shortMonth} {dateInfo.day}
                        </div>
                        <div className="text-lg">
                          {dateInfo.year}
                        </div>
                      </div>
                      
                      {/* Event details */}
                      <div className="p-6 md:w-4/5">
                        <h3 className="mb-2 text-2xl font-bold">{eventProps.eventName}</h3>
                        <div className="flex items-center mb-4 text-gray-600">
                          <Calendar className="mr-2" size={16} />
                          <span>{eventProps.time.split(' - ')[1]} • {eventProps.addressLine1}, {eventProps.addressLine2}</span>
                        </div>
                        <p className="mb-4">
                          {eventProps.eventSubtitle}
                          {eventProps.eventSubtitleLine2 && ` ${eventProps.eventSubtitleLine2}`}
                          {eventProps.eventSubtitleLine3 && ` ${eventProps.eventSubtitleLine3}`}
                        </p>
                        <div className="flex gap-4">
                          <Link href={eventProps.link} className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition">
                            Event Details
                          </Link>
                          <Link href="/contact" className="px-6 py-2 font-semibold text-black transition border border-black rounded-md hover:bg-gray-100">
                            Contact Us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-2xl font-bold">No Upcoming Events</h3>
                <p className="mb-6">Check back soon for new campaign events.</p>
                <Link 
                  href="/contact"
                  className="inline-block bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition"
                >
                  Get Updates
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Calendar CTA */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="inline-block section-title">CAMPAIGN CALENDAR</h2>
          <p className="max-w-3xl mx-auto mt-4 mb-8">
            For a complete list of campaign events and appearances, 
            sign up for email notifications to stay updated.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-black text-[#fcd34b] font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition">
              Subscribe to Updates
            </Link>
            <Link href="/volunteer" className="bg-[#fcd34b] text-black border-2 border-black font-bold py-3 px-6 rounded-md hover:bg-[#f7c948] transition">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
