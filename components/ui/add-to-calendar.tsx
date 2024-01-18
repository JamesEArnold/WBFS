'use client';

import { AddToCalendarButton } from 'add-to-calendar-button-react';
import './add-to-calendar.css';
import { useState } from 'react';

export const AddToCalendar = () => {
  const [isPromoTextShowing, setIsPromoTextShowing] = useState(false);


  return (
    <button className="flex flex-col mt-4 -mb-2" onMouseEnter={() => { setIsPromoTextShowing(!isPromoTextShowing); console.log('seee')}}>
      <AddToCalendarButton
        name="Weisburn For Sheriff Kick-off Event"
        location="Arrowhead Country Club 1500 Rogwin Circle S.W., North Canton, OH 44720"
        startDate="2024-02-28"
        endDate="2024-02-28"
        startTime="17:00"
        endTime="19:00"
        options={['Apple', 'Google', 'iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com', 'Yahoo']} 
      />
      <div content='' className="p-2 bg-yellow-400 blur-sm z-[25000000] absolute inset-x-0 bottom-[-39px] right-4 max-h-[4px]"/>
      <div content='' className="p-2 bg-black/20 blur-sm z-[25000000] absolute inset-x-0 bottom-[-39px] right-4 max-h-[4px]"/>
    </button>
  );
}
