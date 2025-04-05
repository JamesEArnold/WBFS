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
      <section className="bg-[#fcd34b]/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CAMPAIGN EVENTS</h1>
          <p className="text-xl max-w-3xl mx-auto">Join Sheriff Weisburn at these upcoming events and help support the campaign.</p>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title">FEATURED EVENT</h2>
            <div className="bg-black rounded-lg overflow-hidden shadow-xl">
              <div className="bg-[#fcd34b] p-4 text-black">
                <div className="text-2xl font-bold">SAVE THE DATE</div>
              </div>
              <div className="p-6 text-white">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Date block */}
                  <div className="md:w-1/3">
                    {(() => {
                      const eventProps = getEventProps(featuredEvent.eventCard);
                      const dateInfo = extractDateInfo(eventProps.time);
                      
                      return (
                        <div className="bg-[#fcd34b] text-black p-4 rounded-lg text-center">
                          <div className="text-xl font-bold">{dateInfo.weekday.toUpperCase()}</div>
                          <div className="text-5xl font-black my-2">
                            {dateInfo.month.toUpperCase()} {dateInfo.day}
                          </div>
                          <div className="text-xl font-bold">{dateInfo.year}</div>
                        </div>
                      );
                    })()}
                  </div>
                  
                  {/* Event details */}
                  <div className="md:w-2/3">
                    {(() => {
                      const eventProps = getEventProps(featuredEvent.eventCard);
                      
                      return (
                        <>
                          <h3 className="text-3xl font-bold mb-3">{eventProps.eventName}</h3>
                          <div className="flex items-center mb-4">
                            <Calendar className="mr-2" size={20} />
                            <span>{eventProps.time.split(' - ')[1]} • {eventProps.addressLine1}</span>
                          </div>
                          <p className="text-xl mb-2">{eventProps.addressLine2}</p>
                          <p className="mb-6">
                            {eventProps.eventSubtitle}
                            {eventProps.eventSubtitleLine2 && ` ${eventProps.eventSubtitleLine2}`}
                            {eventProps.eventSubtitleLine3 && ` ${eventProps.eventSubtitleLine3}`}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <Link href={eventProps.link} className="bg-[#fcd34b] text-black font-bold py-2 px-6 rounded-md hover:bg-[#f7c948] transition">
                              Event Details
                            </Link>
                            <Link href="/contact" className="border border-white text-white font-bold py-2 px-6 rounded-md hover:bg-white/10 transition">
                              Contact Us
                            </Link>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="section-title">UPCOMING EVENTS</h2>
          
          <div className="grid grid-cols-1 gap-8 mt-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => {
                const eventProps = getEventProps(event.eventCard);
                const dateInfo = extractDateInfo(eventProps.time);
                
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Date column */}
                      <div className="bg-black text-[#fcd34b] p-6 md:w-1/5 flex flex-col justify-center items-center text-center">
                        <div className="text-lg font-semibold">
                          {dateInfo.weekday}
                        </div>
                        <div className="text-3xl font-bold my-1">
                          {dateInfo.shortMonth} {dateInfo.day}
                        </div>
                        <div className="text-lg">
                          {dateInfo.year}
                        </div>
                      </div>
                      
                      {/* Event details */}
                      <div className="p-6 md:w-4/5">
                        <h3 className="text-2xl font-bold mb-2">{eventProps.eventName}</h3>
                        <div className="flex items-center text-gray-600 mb-4">
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
                          <Link href="/contact" className="border border-black text-black font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition">
                            Contact Us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-10 text-center rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">No Upcoming Events</h3>
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
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title inline-block">CAMPAIGN CALENDAR</h2>
          <p className="max-w-3xl mx-auto mb-8 mt-4">
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
