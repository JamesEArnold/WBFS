"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';

// This is a placeholder for the EventsPreviewSection component that will be implemented in Phase 2.3
const EventsPreviewSection = () => {
  // Example events - will be replaced with actual upcoming events
  const events = [
    {
      id: 1,
      title: 'Community Town Hall',
      date: new Date('2023-06-15T18:00:00'),
      location: 'Stark County Community Center',
      description: 'Join Sheriff Weisburn for a discussion on community safety initiatives.'
    },
    {
      id: 2,
      title: 'County Fair Meet & Greet',
      date: new Date('2023-07-02T10:00:00'),
      location: 'Stark County Fairgrounds',
      description: 'Stop by our booth at the county fair to meet Sheriff Weisburn and the team.'
    },
    {
      id: 3,
      title: 'Campaign Fundraiser Dinner',
      date: new Date('2023-07-20T19:00:00'),
      location: 'Riverside Hotel Ballroom',
      description: 'Annual fundraiser dinner supporting the re-election campaign.'
    }
  ];

  // Function to format date display
  const formatDate = (date: Date) => {
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wide">Upcoming Events</h2>
          <Link 
            href="/events"
            className="text-black font-bold hover:text-gray-700 transition-colors duration-200"
          >
            View All Events →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => {
            const { day, month, year } = formatDate(event.date);
            
            return (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Date column with yellow background */}
                  <div className="bg-[#fcd34b] p-6 flex flex-col items-center justify-center md:w-48">
                    <span className="text-4xl font-bold">{day}</span>
                    <span className="text-xl">{month}</span>
                    <span className="text-lg">{year}</span>
                  </div>
                  
                  {/* Event details */}
                  <CardContent className="flex-1 p-6">
                    <div className="mb-1">
                      <span className="inline-block px-2 py-1 bg-black text-[#fcd34b] text-xs font-bold rounded">
                        SAVE THE DATE
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.location}</p>
                    <p className="mb-4">{event.description}</p>
                    <Link 
                      href={`/events#event-${event.id}`}
                      className="inline-block text-black font-bold hover:text-gray-700 transition-colors duration-200"
                    >
                      Event Details →
                    </Link>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsPreviewSection; 
