import { EventCard } from "@/components/ui/event-card";

const JulyPicnicEventCard = <EventCard 
  link="/events/campaign-picnic"
  imgSrc="/event-july-picnic-preview2.avif"
  imgStyling="relative w-[100%] max-h-[300px] scale-[1.2] pt-2 md:h-[100%] overflow-auto"
  time="July 27, 2024 - 12 PM - 3 PM"
  addressLine1="V.F.W Pavilion"
  addressLine2="1935 Avalon Ave NE, Canton, Ohio 44705"
  eventName="Campaign Picnic Fundraiser"
  eventSubtitle="Burgers - Hot Dogs - Sides - Cash Bar"
/>;

export const JulyPicnicEvent = {
  expirationTime: new Date(2024, 7, 28).valueOf(),
  eventCard: JulyPicnicEventCard,
}
