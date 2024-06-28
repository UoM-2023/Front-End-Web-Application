import React, { useEffect, useState } from "react";
import "./ResidentsPayments.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../Component/Buttons/AddNewButton";
import { Outlet, useOutlet } from "react-router-dom";
import Minibar from "../Mininavbar/Minibar";
import axiosInstance from "../../LoginPage/LoginServices/authService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f9f4f0",
    color: "#605D5D",
    fontSize: "16px",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#ECE1D9",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


function ResidentsPayments() {
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    console.log("Payment use effect");
    getPaymentDetails();
  })

  const getPaymentDetails = () => {
    axiosInstance.get('/finance/getAllPayments')
    .then((response) => {
      console.log("response:",response);
      setPaymentList(response.data.result[0]);
    })
    .catch((error) => {
      console.log("Error fetching payment data: ", error);
    })
  }
  return (
    <div className="residentsPaymentsContainer">
      <Minibar />
        <div className="pageTop">
            <SearchBar/>
            <AddNewButton route="/finance/addNew"/>
        </div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: "93.5vw",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 0,
            paddingTop: "1rem",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#No</StyledTableCell>
              <StyledTableCell align="center">Payment ID</StyledTableCell>
              <StyledTableCell align="center">Unit ID</StyledTableCell>
              <StyledTableCell align="center">Resident Name</StyledTableCell>
              <StyledTableCell align="center">Method</StyledTableCell>
              <StyledTableCell align="center">Charge Type</StyledTableCell>
              <StyledTableCell align="center">
                Payment Date
              </StyledTableCell>
              <StyledTableCell align="right">Amount(LKR.)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentList.map((Payments, index) => (
              <StyledTableRow key={Payments.payment_id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{Payments.payment_id}</StyledTableCell>
                <StyledTableCell align="center">{Payments.unit_id}</StyledTableCell>
                <StyledTableCell align="center">
                  {Payments.name_with_initials}
                </StyledTableCell>
                <StyledTableCell align="center">{Payments.method}</StyledTableCell>
                <StyledTableCell align="center">{Payments.charge_type}</StyledTableCell>
                <StyledTableCell align="center">
                  {Payments.payment_date.slice(0,10)}
                </StyledTableCell>
                <StyledTableCell align="right">{Payments.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    </div>
  );
}

export default ResidentsPayments;
