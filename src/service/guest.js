import axios from "axios";

export async function createGuest({ formData }) {
  try {
    console.log(formData);
    const data = await axios.post(
      "http://localhost:3001/GuestDetail/GuestDetails",
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

export async function getGuest() {
  try {
    const response = await axios.get(
      //get all guests
      "http://localhost:3001/GuestDetail/GuestDetails"
    );

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no guest or no 'result' in the response
    }

    const guests = response.data.result;

    console.log(guests);

    // Function to compare dates

    const compareDates = (checkIn) => {
      const guestDate = new Date(checkIn);
      const today = new Date();

      // Check if the guest start_date is today
      console.log(
        guestDate.getFullYear() + today.getFullYear(),
        guestDate.getMonth() + today.getMonth(),
        guestDate.getDate() + today.getDate()
      );
      // console.log(today.getFullYear(), today.getMonth(), today.getDate());
      return (
        guestDate.getFullYear() === today.getFullYear() &&
        guestDate.getMonth() === today.getMonth() &&
        guestDate.getDate() === today.getDate()
      );
    };

    // Filter today's guest
    // filter out the dates that
    const todayGuests = guests.filter((guest) => compareDates(guest.check_In));
    console.log(todayGuests);

    // get count of guest
    const length = todayGuests.length;
    
    return length;
  } catch (error) {
    console.error("Error fetching guest:", error);
    return 0; // Return 0 in case of error
  }
}
