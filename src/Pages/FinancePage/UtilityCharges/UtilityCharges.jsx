import React from "react";
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
  noOfUnits,
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
    noOfUnits,
    monthlyPayment,
    totalAmount,
    action
  };
}

function UtilityCharges() {
  const navigate = useNavigate();
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
              <StyledTableCell align="left">#No</StyledTableCell>
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Utility Type</StyledTableCell>
              <StyledTableCell align="left">Time Period</StyledTableCell>
              <StyledTableCell align="left">Balance</StyledTableCell>
              <StyledTableCell align="left">No. of Units</StyledTableCell>
              <StyledTableCell align="left">Monthly Amount (Rs.)</StyledTableCell>
              <StyledTableCell align="right">Total Amount (Rs.)</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.unitID}
                </StyledTableCell>
                <StyledTableCell align="left">{row.utilityType}</StyledTableCell>
                <StyledTableCell align="left">{row.timePeriod}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.balance}
                </StyledTableCell>
                <StyledTableCell align="left">{row.noOfUnits}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.monthlyPayment}
                </StyledTableCell>
                <StyledTableCell align="right">{row.totalAmount}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UtilityCharges;
