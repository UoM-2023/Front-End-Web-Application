import axios from "axios";
import axiosInstance from "../Pages/LoginPage/LoginServices/authService";

export async function createComplain({ formData }) {
  try {
    console.log(formData);
    const data = await axiosInstance.post(
      "/complaints/newComplaint",
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




export async function getComplain() {
  try {
    const response = await axios.get("http://localhost:3001/complaints/newComplaint");

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no reservations or no 'result' in the response
    }

    const complains = response.data.result;

    // Function to compare dates
    const compareDates = (comDate) => {
      const complainDate = new Date(comDate);
      const today = new Date();
      // Check if the reservation start_date is today
      return (
        complainDate.getFullYear() === today.getFullYear() &&
        complainDate.getMonth() === today.getMonth() &&
        complainDate.getDate() === today.getDate()
      );
    };

    // Filter today's reservations
    const todayComplains = complains.filter((complain) => compareDates(complain.C_Date));

    const length = todayComplains.length;
    return length;
  } catch (error) {
    console.error('Error fetching complains:', error);
    return 0; // Return 0 in case of error
  }
}
