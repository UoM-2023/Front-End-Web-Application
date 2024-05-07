import React, { useState } from "react";
import "./UtilityCharges.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditButton from "../../../Component/Buttons/EditButton";
import DeleteButton from "../../../Component/Buttons/DeleteButton";
import SearchBar from "../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../Component/Buttons/AddNewButton";
import { Link, useNavigate } from "react-router-dom";
import Minibar from "../Mininavbar/Minibar";
import UtilityDetailsButton from "../../../Component/Buttons/UtilityDetailsButton";

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
  unitID,
  utilityType,
  timePeriod,
  balance,
  monthlyPayment,
  totalAmount,
  action
) {
  return {
    no,
    unitID,
    utilityType,
    timePeriod,
    balance,
    monthlyPayment,
    totalAmount,
    action
  };
}

function UtilityCharges() {
  const navigate = useNavigate();
  const [utilityCharges, setUtilityCharges] = useState([]);
  return (
    <div className="utilityChargesContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar/>
        <div className="topButtons">
          <UtilityDetailsButton route="/finance/utilitycharges/viewUtilityDetails" />
          <AddNewButton route="/finance/utilitycharges/addUtility"/>
        </div>
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
              <StyledTableCell align="center">Unit ID</StyledTableCell>
              <StyledTableCell align="center">Utility Type</StyledTableCell>
              <StyledTableCell align="center">Time Period</StyledTableCell>
              <StyledTableCell align="center">Balance</StyledTableCell>
              <StyledTableCell align="center">Monthly Amount (Rs.)</StyledTableCell>
              <StyledTableCell align="center">Total Amount (Rs.)</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilityCharges.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{row.no}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.unitID}
                </StyledTableCell>
                <StyledTableCell align="center">{row.utilityType}</StyledTableCell>
                <StyledTableCell align="center">{row.timePeriod}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.balance}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.monthlyPayment}
                </StyledTableCell>
                <StyledTableCell align="center">{row.totalAmount}</StyledTableCell>
                <StyledTableCell align="center">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UtilityCharges;
