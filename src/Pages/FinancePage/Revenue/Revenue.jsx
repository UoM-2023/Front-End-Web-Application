import React from "react";
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

function createData(
    no,
    revenueId,
    paidBy,
    amount,
    type,
    paymentMethod,
    staffID,
    Date,
    action
) {
  return {
    no,
    revenueId,
    paidBy,
    amount,
    type,
    paymentMethod,
    staffID,
    Date,
    action
  };
}

const rows = [
  createData(
    1,
    "R76536778",
    "Kamal Perera",
    "2500",
    "Pool",
    "Cash",
    "M2256",
    "16/12/2023",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    2,
    "R76536778",
    "Kamal Perera",
    "2500",
    "Pool",
    "Cash",
    "M2256",
    "16/12/2023",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    3,
    "R76536778",
    "Kamal Perera",
    "2500",
    "Pool",
    "Cash",
    "M2256",
    "16/12/2023",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    4,
    "R76536778",
    "Amal Kamal",
    "2500",
    "Gym",
    "Cash",
    "M2256",
    "16/12/2023",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    5,
    "R76536778",
    "Amal Perera",
    "250000000",
    "Residental Unit A-108",
    "Cash",
    "M2256",
    "16/12/2023",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function Revenue() {
  return (
    <div className="revenueContainer">
      <Minibar />
        <div className="pageTop">
            <SearchBar/>
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
                <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">{row.revenueId}</StyledTableCell>
                <StyledTableCell align="left">{row.paidBy}</StyledTableCell>
                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                <StyledTableCell align="left">{row.type}</StyledTableCell>
                <StyledTableCell align="left">{row.paymentMethod}</StyledTableCell>
                <StyledTableCell align="left">{row.staffID}</StyledTableCell>
                <StyledTableCell align="left">{row.Date}</StyledTableCell>
                <StyledTableCell align="right">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Revenue;