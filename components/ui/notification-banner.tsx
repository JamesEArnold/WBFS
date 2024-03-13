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
        <div className="font-bold text-white uppercase ticker__item">
          <span>Follow us on&nbsp;
            <a 
              className="text-yellow-300 underline" 
              href="https://www.facebook.com/people/Weisburn-For-Sheriff-2024/61552050077933/"
            >
              Facebook
            </a> and&nbsp;
            <a
              className="text-yellow-300 underline"
              href="https://www.instagram.com/weisburnforsheriff"
            >
              Instagram!
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
