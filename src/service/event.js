import axios from "axios";

export async function createEvent({ formData }) {
  try {
    console.log(formData);
    const data = await axios.post(
      "http://localhost:3001/newsNotices/newEvent",
      formData
    );

    if (!data.data) {
      return null;
    }

    return data.data;
  } catch (e) {
    console.log(e);
  }
}

function compareDates(dateString) {
  // Parse the input date string
  const inputDate = new Date(dateString);

  // Get today's date and reset time part to 00:00:00 for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Compare the two dates
  if (inputDate == today) {
    return true;
  }
}

export async function getEvent() {
  try {
    const response = await axios.get(
      "http://localhost:3001/newsNotices/newEvent"
    );

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no events or no 'result' in the response
    }

    const events = response.data.result;

    // Function to compare dates
    const compareDates = (startDate) => {
      const eventDate = new Date(startDate);
      const today = new Date();
      // Check if the event start_date is today
      // console.log(eventDate.getFullYear())
      // console.log(eventDate.getMonth())
      // console.log(eventDate.getDate())
      // console.log(today.getFullYear())
      // console.log(today.getMonth())
      // console.log(today.getDate())

      return (
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate()
      );
    };

    // Filter today's events
    const todayEvents = events.filter((event) => compareDates(event.S_Date));

    const length = todayEvents.length;
    return length;
  } catch (error) {
    console.error("Error fetching events:", error);
    return 0; // Return 0 in case of error
  }
}
