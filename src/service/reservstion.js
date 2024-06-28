import axios from "axios";

export async function createReservation({ formData }) {
  try {
    console.log(formData);
    const data = await axios.post(
      "http://localhost:3001/Reservation/Reservations",
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




export async function getReservation() {
  try {
    const response = await axios.get("http://localhost:3001/Reservation/Reservations");

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no reservations or no 'result' in the response
    }

    const reservations = response.data.result;

    // Function to compare dates
    const compareDates = (startDate) => {
      const reservationDate = new Date(startDate);
      const today = new Date();
      // Check if the reservation start_date is today
      return (
        reservationDate.getFullYear() == today.getFullYear() &&
        reservationDate.getMonth() == today.getMonth() &&
        
        reservationDate.getDate() == today.getDate()+1
      );
    };

    // Filter today's reservations
    const todayReservations = reservations.filter((reservation) => compareDates(reservation.start_date));

    const length = todayReservations.length;
    return length;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return 0; // Return 0 in case of error
  }
}
