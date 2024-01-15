import './notification-banner.css';

export const NotificationBanner = () => {
  return (
    // <div className="py-2 font-bold text-center text-white uppercase bg-black">
    //   <span>Upcoming events: Campaign Kickoff Event</span>
    //   <br />
    //   <a href="#" className="text-yellow-300 underline">Reserve your spot now!</a>
    // </div>
    <div className="ticker-wrap">
      <div className="ticker">
        <div className="font-bold text-white uppercase ticker__item"><a href="/events/kick-off">Upcoming events: Campaign Kickoff Event - <span className="text-yellow-300 underline">Reserve your spot now!</span></a></div>
      </div>
    </div>
  );
}
