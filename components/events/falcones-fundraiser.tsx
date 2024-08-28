import { EventCard } from "@/components/ui/event-card";

const FalconesFundraiserEventCard = <EventCard 
  link="/events/falcones-fundraiser"
  imgSrc="/event-falcones-flyer.jpg"
  imgStyling="relative w-[100%] h-[100%] scale-[1] pt-2"
  time="September 26, 2024 - 5 PM to 7 PM"
  addressLine1="5029 Tuscarawas St. W"
  addressLine2="Canton, OH 44708"
  eventName="Falcone's Tavern Fundraiser"
  eventSubtitle="Appetizers & Cash Bar"
  eventSubtitleLine2="Learn more about our candidate!" 
/>;

export const FalconesFundraiserEvent = {
  expirationTime: new Date(2024, 9, 27).valueOf(),
  eventCard: FalconesFundraiserEventCard,
}
