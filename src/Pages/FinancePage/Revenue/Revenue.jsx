import React, { useEffect, useState } from "react";
import "./Revenue.css";
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
import EditButton from "../../../Component/Buttons/EditButton";
import DeleteButton from "../../../Component/Buttons/DeleteButton";
import { Link, Outlet } from "react-router-dom";
import Minibar from "../Mininavbar/Minibar";
import axios from "axios";

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

function Revenue() {
  const [revenues, setRevenues] = useState([]);
  useEffect(() => {
    getRevenue();
  }, []);

  const getRevenue = () => {
    axios
      .get("http://localhost:3001/finance/revenue")
      .then((response) => {
        console.log("Called");
        console.log(response);
        setRevenues(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="revenueContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/finance/revenue/addRevenue" />
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
              <StyledTableCell align="left">#No</StyledTableCell>
              <StyledTableCell align="left">Revenue ID</StyledTableCell>
              <StyledTableCell align="left">Paid By</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Payment Method</StyledTableCell>
              <StyledTableCell align="left">Staff ID</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenues.map((revenue) => (
              <StyledTableRow key={revenue.revenue_id}>
                <StyledTableCell>{revenue.id}</StyledTableCell>
                <StyledTableCell>{revenue.revenue_id}</StyledTableCell>
                <StyledTableCell>{revenue.paid_by}</StyledTableCell>
                <StyledTableCell>{revenue.amount}</StyledTableCell>
                <StyledTableCell>{revenue.rType}</StyledTableCell>
                <StyledTableCell>{revenue.payment_method}</StyledTableCell>
                <StyledTableCell>{revenue.staff_id}</StyledTableCell>
                <StyledTableCell>
                  {revenue.added_date.slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell>{revenue.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Revenue;
