import axios from "axios";
import axiosInstance from "../Pages/LoginPage/LoginServices/authService";

export async function createPayment({ formData }) {
  try {
    console.log(formData);
    const data = await axios.post(
      "http://localhost:3001/finance/getAllPayments",
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

export async function getPayment() {
  console.log("Getting payment");
  try {
    const response = await axiosInstance.get(
      "http://localhost:3001/finance/getAllPayments"
    );

    if (!response.data || !response.data.result) {
      return 0; // Return 0 if there are no guest or no 'result' in the response
    }

    const payments = response.data.result[0];

    console.log(payments);

    // Function to compare dates
    const compareDates = (PayDate) => {
      const paymentDate = new Date(PayDate);
      const today = new Date();

      console.log(
        paymentDate.getFullYear(),
        paymentDate.getMonth(),
        paymentDate.getDate()
      );

      console.log(today.getFullYear(), today.getMonth(), today.getDate());
      return (
        paymentDate.getFullYear() === today.getFullYear() &&
        paymentDate.getMonth() === today.getMonth() &&
        paymentDate.getDate() === today.getDate()
      );
    };

    // Filter today's payment
    const todayPayments = payments?.filter((payment) => {
      console.log(payment);
      return compareDates(payment.payment_date);
    });

    console.log(todayPayments);

    const length = todayPayments.length;
    return length;
  } catch (error) {
    console.error(error);
    console.error("Error fetching payment:", error);
    return 0; // Return 0 in case of error
  }
}

// import axios from "axios";

// export async function createPayment({ formData }) {
//   try {
//     console.log(formData);
//     const response = await axios.post(
//       "http://localhost:3001/finance/getAllPayments",
//       formData
//     );

//     if (!response.data) {
//       return null;
//     }

//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// function compareDates(dateString) {
//   // Parse the input date string
//   const inputDate = new Date(dateString);

//   // Get today's date and reset time part to 00:00:00 for accurate comparison
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   // Compare the two dates
//   return inputDate.getTime() === today.getTime();
// }

// export async function getPayment() {
//   try {
//     const response = await axios.get(
//       "http://localhost:3001/finance/getAllPayments"
//     );

//     if (!response.data || !response.data.result) {
//       return 0; // Return 0 if there are no reservations or no 'result' in the response
//     }

//     const payments = response.data.result;

//     // Function to compare dates
//     ////////add the date according to DB/////////////
//     const isRequestedDateTomorrow = (reqDate) => {
//       const reservationDate = new Date(reqDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       today.setDate(today.getDate());

//       return (
//         paymentDate.getFullYear() === today.getFullYear() &&
//         paymentDate.getMonth() === today.getMonth() &&
//         paymentDate.getDate() === today.getDate()-1
//       );
//     };

//     // Filter today's reservations
//     ////////add the date according to DB/////////////
//     const todayPayments = payments.filter((payment) =>
//       isRequestedDateTomorrow(payment.payment_date)
//     );

//     // const length = todayPayments.length;

//     console.log(todayPayments.length);
//     return todayPayments.length;
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     return 0; // Return 0 in case of error
//   }
// }
