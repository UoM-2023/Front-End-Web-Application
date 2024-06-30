import axios from "axios";
import axiosInstance from "../Pages/LoginPage/LoginServices/authService";

export async function createGuest({ formData }) {
  try {
    console.log(formData);
    const data = await axiosInstance.post(
      "/GuestDetail/GuestDetails",
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
      return true ;
  } 
}




export async function getGuest() {
  try {
    const response = await axiosInstance.get("/GuestDetail/GuestDetails");

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no guest or no 'result' in the response
    }

    const guests = response.data.result;

    // Function to compare dates
    const compareDates = (checkIn) => {
      const guestDate = new Date(checkIn);
      const today = new Date();
      // Check if the guest start_date is today
      return (
        guestDate.getFullYear() === today.getFullYear() &&
        guestDate.getMonth() === today.getMonth() &&
        guestDate.getDate() === today.getDate()
      );
    };

    // Filter today's guest
    const todayGuests = guests.filter((guest) => compareDates(guest.check_In));

    const length = todayGuests.length;
    return length;
  } catch (error) {
    console.error('Error fetching guest:', error);
    return 0; // Return 0 in case of error
  }
}
