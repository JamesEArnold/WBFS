import './notification-banner.css';

export const NotificationBanner = () => {
  return (
<div className="ticker-wrap">
        <div className="ticker">
          <div className="font-bold text-white uppercase ticker__item">
            <span>
              <span className="text-yellow-300">Upcoming events:</span>
              &nbsp;Campaign Picnic Fundraiser&nbsp;
              <span className="text-yellow-300">|</span>
              &nbsp;July 27th at V.F.W Pavilion&nbsp;
              <span className="text-yellow-300"> --- </span> 
              &nbsp;Golf Fundraiser&nbsp;
              <span className="text-yellow-300">|</span> 
              &nbsp;August 23rd at Arrowhead Golf Club&nbsp;
            </span>
            <br />
          </div>
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
