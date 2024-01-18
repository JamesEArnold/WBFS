'use client';

import { AddToCalendar } from "./add-to-calendar"

export const AtcWrapper = () => {
  return (
    <div onClick={() => {console.log('please god')}} className="relative">
      <AddToCalendar />
    </div>);
}
