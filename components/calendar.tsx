import Calendar from "@ericz1803/react-google-calendar";

let calendars = [
  { calendarId: "09opmkrjova8h5k5k46fedmo88@group.calendar.google.com" }
];

const API_KEY = "poop";

let styles = {
  //you can use object styles
  calendar: {
    borderWidth: "3px", //make outer edge of calendar thicker
    color: 'red',
    border: '1px solid red',
  },
};

export const GoogleCalendar = () => {
  return <div
  style={{
    width: "90%",
    paddingTop: "50px",
    paddingBottom: "50px",
    margin: "auto",
    maxWidth: "1200px"
  }}
>
  <Calendar apiKey={API_KEY} calendars={calendars} styles={styles} />
</div>
};
