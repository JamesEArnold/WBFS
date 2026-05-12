import { EventCard } from "@/components/ui/event-card";

const GolfFundraiserEventCard3 = <EventCard
  link="/events/golf-fundraiser-3"
  imgSrc="/post-election/events/arrow-head-golf-outing.png"
  imgStyling="relative w-[200%] h-[100%] scale-[1] pt-2"
  time="September 18, 2026"
  addressLine1="Arrowhead Country Club"
  addressLine2="1500 Rogwin Circle NW, Canton, Ohio 44720"
  eventName="2026 Golf Fundraiser"
  eventSubtitle="Save The Date!"
  eventSubtitleLine4="More details coming soon"
  overrideWidth={true}
/>;

export const GolfFundraiserEvent3 = {
  expirationTime: new Date(2026, 8, 18).valueOf(),
  eventCard: GolfFundraiserEventCard3,
}
