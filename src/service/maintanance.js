import axios from "axios";

export async function createMaintanance({ formData }) {
  try {
    console.log(formData);
    const data = await axios.post(
      "http://localhost:3001/maintenance/New_Mnt_Req",
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

export async function getMaintanance() {
  try {
    const response = await axios.get(
      "http://localhost:3001/maintenance/New_Mnt_Req"
    );

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no maintanances or no 'result' in the response
    }

    const maintanances = response.data.result;

    // Function to compare dates
    const compareDates = (reqDate) => {
      const maintananceDate = new Date(reqDate);
      const today = new Date();
      // Check if the maintanances requested_date is today
      return (
        maintananceDate.getFullYear() === today.getFullYear() &&
        maintananceDate.getMonth() === today.getMonth() &&
        maintananceDate.getDate() === today.getDate()
      );
    };

    // Filter today's maintanances
    const todayMaintanances = maintanances.filter((maintanance) =>
      compareDates(maintanance.requested_date)
    );

    const length = todayMaintanances.length;
    return length;
  } catch (error) {
    console.error("Error fetching maintanances:", error);
    return 0; // Return 0 in case of error
  }
}
