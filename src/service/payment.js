import axios from "axios";

export async function createPayment({ formData }) {
  try {
    console.log(formData);
    const data = await axios.post(
      "http://localhost:3001/finance/payment",
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




export async function getPayment() {
  try {
    const response = await axios.get("http://localhost:3001/finance/payment");

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no reservations or no 'result' in the response
    }

    const payments = response.data.result;

    // Function to compare dates
    ////////add the date according to DB/////////////
    const compareDates = (payDate) => {
      const paymentDate = new Date(payDate);
      const today = new Date();
      // Check if the pay_date  is today
      return (
        paymentDate.getFullYear() == today.getFullYear() &&
        paymentDate.getMonth() == today.getMonth() &&
        paymentDate.getDate() == today.getDate()+1
      );
    };

    // Filter today's reservations
     ////////add the date according to DB/////////////
    const todayPayments = payments.filter((payment) => compareDates(payment.pay_date));

    const length = todayPayments.length;
    return length;
  } catch (error) {
    console.error('Error fetching payments:', error);
    return 0; // Return 0 in case of error
  }
}
