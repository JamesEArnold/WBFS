"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Calendar } from 'lucide-react';

// Import actual event data
import { GoldFundraiserEvent } from "@/components/events/golf-fundraiser";
import { JulyPicnicEvent } from "@/components/events/july-picnic";
import { FalconesFundraiserEvent } from "@/components/events/falcones-fundraiser";
import { GolfFundraiserEvent2 } from "@/components/events/golf-fundraiser-2";

const EventsPreviewSection = () => {
  // Function to get current events that haven't expired
  const getCurrentEvents = () => {
    const now = new Date().valueOf();
    const allEvents = [GoldFundraiserEvent, JulyPicnicEvent, FalconesFundraiserEvent, GolfFundraiserEvent2];
    
    // Filter events that haven't expired
    const availableEvents = allEvents.filter(event => now < event.expirationTime);
    
    // Sort by expiration date (closest first)
    availableEvents.sort((a, b) => a.expirationTime - b.expirationTime);
    
    // Return up to 3 events
    return availableEvents.slice(0, 3);
  };

  // Get events for display
  const eventsToShow = getCurrentEvents();

  // Function to extract date information from event time string
  // Example format: "August 23, 2024 - 8 AM"
  const extractDateInfo = (timeString: string) => {
    const parts = timeString.split(' - ')[0].split(', ');
    const monthDay = parts[0].split(' ');
    
    return {
      month: monthDay[0].substring(0, 3), // First three letters of month
      day: monthDay[1],
      year: parts[1]
    };
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title">UPCOMING EVENTS</h2>
          <Link 
            href="/events"
            className="text-black font-bold hover:text-gray-700 transition-colors duration-200"
          >
            View All Events →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {eventsToShow.length > 0 ? (
            eventsToShow.map((event, index) => {
              // Extract props from the event card component
              // This is a workaround since we can't directly access props from a JSX element
              const eventCard = event.eventCard;
              const eventProps = eventCard.props;
              
              const dateInfo = extractDateInfo(eventProps.time);
              
              return (
                <Card key={index} className="overflow-hidden border-0 shadow-md">
                  <div className="flex flex-col md:flex-row">
                    {/* Date column with yellow background */}
                    <div className="bg-[#fcd34b] p-6 flex flex-col items-center justify-center md:w-48 text-black">
                      <span className="text-lg font-semibold uppercase">{dateInfo.month}</span>
                      <span className="text-4xl font-bold my-1">{dateInfo.day}</span>
                      <span className="text-lg">{dateInfo.year}</span>
                    </div>
                    
                    {/* Event details */}
                    <CardContent className="flex-1 p-6">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-black text-[#fcd34b] text-xs font-bold rounded">
                          SAVE THE DATE
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{eventProps.eventName}</h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Calendar className="mr-2" size={16} />
                        <span>{eventProps.time.split(' - ')[1]} • {eventProps.addressLine1}</span>
                      </div>
                      <p className="mb-4">
                        {eventProps.eventSubtitle}
                        {eventProps.eventSubtitleLine2 && <span> {eventProps.eventSubtitleLine2}</span>}
                      </p>
                      <Link 
                        href={eventProps.link}
                        className="inline-block bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition"
                      >
                        Event Details
                      </Link>
                    </CardContent>
                  </div>
                </Card>
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
  );
};

export default EventsPreviewSection; 
