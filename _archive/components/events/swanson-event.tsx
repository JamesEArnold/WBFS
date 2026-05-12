import { EventCard } from "@/components/ui/event-card";

const SwansonEventCard = <EventCard 
  link="/events/meet-and-greet"
  imgSrc="/weisburn-photo-1.jpg"
  imgStyling="relative w-[90%] h-[80%] scale-125 pt-2"
  time="April 20, 2024 - 4 PM - 6 PM"
  addressLine1="Tlaquepaque Mexican Restaurant- Oakwood Plaza"
  addressLine2="2682 Easton St N.E., Canton, Ohio 44721"
  eventName="Meet and Greet"
  eventSubtitle="Join Eric Weisburn with Special Guest Sheriff Timothy Swanson (Retired)"
/>;

export const SwansonEvent = {
  expirationTime: new Date(2024, 3, 20).valueOf(),
  eventCard: SwansonEventCard,
}
