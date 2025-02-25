import { EventCard } from "@/components/ui/event-card";

const GolfFundraiserEventCard2 = <EventCard 
  link=""
  imgSrc="/post-election/events/arrow-head-golf-outing.png"
  imgStyling="relative w-[100%] h-[100%] scale-[1] pt-2"
  time="July 25, 2025 - 8 AM"
  addressLine1="Arrowhead Country Club"
  addressLine2="1500 Rogwin Circle NW, Canton, Ohio 44720"
  eventName="2025 Golf Fundraiser"
  eventSubtitle="Registration begins at 8 AM"
  eventSubtitleLine4="Teams of 4"
/>;

export const GolfFundraiserEvent2 = {
  expirationTime: new Date(2025, 7, 25).valueOf(),
  eventCard: GolfFundraiserEventCard2,
}
