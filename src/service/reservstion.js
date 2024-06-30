import axios from "axios";
import axiosInstance from "../Pages/LoginPage/LoginServices/authService";

export async function createReservation({ formData }) {
  try {
    console.log(formData);
    const response = await axiosInstance.post(
      "/Reservation/Reservations",
      formData
    );  

    if (!response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
}

function compareDates(dateString) {
  const inputDate = new Date(dateString);

  // Get today's date and reset time part to 00:00:00 for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Compare the two dates
  return inputDate.getTime() === today.getTime();
}

export async function getReservation() {
  try {
    const response = await axiosInstance.get(
      "/Reservation/Reservations"
    );

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no reservations or no 'result' in the response
    }

    const reservations = response.data.result;

    // Function to compare dates (checks if the requested date is tomorrow)
    const isRequestedDateTomorrow = (reqDate) => {
      const reservationDate = new Date(reqDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setDate(today.getDate());

      return (
        reservationDate.getFullYear() === today.getFullYear() &&
        reservationDate.getMonth() === today.getMonth() &&
        reservationDate.getDate() === today.getDate() 
      );
    };

    // Filter reservations for tomorrow
    const tomorrowReservations = reservations.filter((reservation) =>
      isRequestedDateTomorrow(reservation.requested_date)
    );

    console.log(tomorrowReservations.length);

    return tomorrowReservations.length;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return 0; // Return 0 in case of an error
  }
}
