'use client';

import { faGolfBall, faGolfBallTee, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"

export default function Home() {
  const handleSignupClick = () => {
    const subject = encodeURIComponent("Golf Outing Team Signup Request");
    const body = encodeURIComponent(
      "I'm reaching out to sign up for the July 25, 2025 Sheriff Weisburn golf outing.\n\n- Team Name: [Your Team Name]\n\nThe teammates that will be joining me are:\n- Golfer 1\n- Golfer 2\n- Golfer 3\n- Golfer 4\n\nI understand that teams are limited and signup is on a first come first serve basis."
    );
    window.location.href = `mailto:weisburnforsheriff@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-4 mx-auto">
      <div className="flex flex-col items-center justify-center">
        {/* <Image src="/post-election/events/arrow-head-golf-outing.png" alt="Arrowhead Country Club" width={1000} height={1000} /> */}
          <div className="relative w-full h-full overflow-hidden shadow-lg md:w-fit md:mx-auto md:mb-8">
          <Image
            src="/post-election/events/arrow-head-golf-outing.png"
            width="0"
            height="0"
            sizes="50vw"
            className="relative w-full h-full"
            alt="Weisburn for Sheriff Hero Image"
            priority />
        </div>
      </div>
      {/* <span className="flex justify-center w-full gap-4 py-3 mx-auto my-4 text-lg font-bold text-center text-yellow-400 bg-black rounded-md drop-shadow-lg md:w-72">
        <FontAwesomeIcon icon={faGolfBallTee} className="w-4 ml-2" />
        Register Your Team Below!
      </span> */}

      <Image src="/golf-flyer-page-2-20251.jpg" alt="Golf Fundraiser Flyer" width="0" height="0" sizes="50vw" className="w-full md:w-[50%] mx-auto" priority />

      
      <div className="flex flex-col items-center w-full max-w-3xl p-6 mx-auto my-8 bg-white border-2 border-yellow-400 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="mb-4 text-2xl font-bold">Golf Outing - July 25, 2025</h2>
          <p className="mb-4 text-gray-700">
            To sign up for the Sheriff Weisburn golf outing, please click the button below to send us an email with your team information.
          </p>
          <p className="mb-6 text-gray-700">
            <strong>Please Note:</strong> Teams are limited and spots are filled on a first-come, first-served basis. <br />After submitting your request, we will reach out to confirm your registration.
          </p>
          <div className="p-4 mb-6 text-center border border-yellow-200 rounded-lg bg-yellow-50">
            <h3 className="mb-2 text-xl font-bold text-gray-800">Donation Levels</h3>
            <p className="text-gray-700">Per Golfer: $125</p>
            <p className="text-gray-700">Full Team (4 Players): $500</p>
          </div>
        </div>
        
        <button
          onClick={handleSignupClick}
          className="flex items-center px-6 py-3 mb-4 text-lg font-bold text-yellow-400 transition bg-black rounded-md hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-5 mr-2" />
          Send Team Signup Email
        </button>
        
        <div className="p-4 mt-2 text-sm text-gray-600 bg-gray-100 rounded-md">
          <p>The email will include a template with spots for up to 4 team members. <br />Please edit with your actual team members' names before sending.</p>
        </div>
      </div>
        
      <div className="flex px-4 my-4">
        {/* <AtcWrapper /> */}
      </div>
    </div>
  );
}
