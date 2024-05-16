import { EventCard } from "@/components/ui/event-card";

const GolfFundraiserEventCard = <EventCard 
  link="/events/golf-fundraiser"
  imgSrc="/event-golf-fundraiser-preview.png"
  imgStyling="relative w-[100%] h-[100%] scale-[1] pt-2"
  time="August 23, 2024 - 8 AM"
  addressLine1="Arrowhead Golf Club"
  addressLine2="1500 Rogwin Circle NW, Canton, Ohio 44720"
  eventName="2024 Golf Fundraiser"
  eventSubtitle="Registration begins at 8 AM"
  eventSubtitleLine2="Shotgun start at 9 AM" 
  eventSubtitleLine3="Lunch and dinner provided"
  eventSubtitleLine4="18 hole scramble format - Teams of 4"
/>;

export const GoldFundraiserEvent = {
  expirationTime: new Date(2024, 8, 24).valueOf(),
  eventCard: GolfFundraiserEventCard,
}
