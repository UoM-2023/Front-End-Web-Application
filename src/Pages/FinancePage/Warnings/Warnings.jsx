import React from "react";
import "./Warning.css";
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
  unitID,
  ownerName,
  chargeType,
  dueDate,
  delayedTime,
  warning1,
  warning2,
  warning3,
  action
) {
  return {
    no,
    unitID,
    ownerName,
    chargeType,
    dueDate,
    delayedTime,
    warning1,
    warning2,
    warning3,
    action
  };
}

const rows = [
  createData(
    1,
    "A-102",
    "Miller Donald",
    "Charge Type",
    "15 JAN 2024",
    "7 Days",
    "sent",
    " ",
    " ",
    <div className="actionBtn">
      <DeleteButton />
    </div>
  ),
  createData(
    1,
    "A-102",
    "Miller Donald",
    "Charge Type",
    "15 JAN 2024",
    "7 Days",
    "sent",
    " ",
    " ",
    <div className="actionBtn">
      <DeleteButton />
    </div>
  ),
  createData(
    1,
    "A-102",
    "Miller Donald",
    "Charge Type",
    "15 JAN 2024",
    "7 Days",
    "sent",
    " ",
    " ",
    <div className="actionBtn">
      <DeleteButton />
    </div>
  ),
  createData(
    1,
    "A-102",
    "Miller Donald",
    "Charge Type",
    "15 JAN 2024",
    "7 Days",
    "sent",
    " ",
    " ",
    <div className="actionBtn">
      <DeleteButton />
    </div>
  ),
  createData(
    1,
    "A-102",
    "Miller Donald",
    "Charge Type",
    "15 JAN 2024",
    "7 Days",
    "sent",
    " ",
    " ",
    <div className="actionBtn">
      <DeleteButton />
    </div>
  ),
];

function Warnings() {
  return (
    <div className="utilityChargesContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton/>
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
              <StyledTableCell align="left">Owner Name</StyledTableCell>
              <StyledTableCell align="left">Charge Type</StyledTableCell>
              <StyledTableCell align="left">Due Date</StyledTableCell>
              <StyledTableCell align="left">Delayed Time</StyledTableCell>
              <StyledTableCell align="left">Warning 01</StyledTableCell>
              <StyledTableCell align="left">Warning 02</StyledTableCell>
              <StyledTableCell align="left">Warning 03</StyledTableCell>
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
                <StyledTableCell align="left">{row.ownerName}</StyledTableCell>
                <StyledTableCell align="left">{row.chargeType}</StyledTableCell>
                <StyledTableCell align="left">{row.dueDate}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.delayedTime}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{color:"red"}}>{row.warning1}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.warning2}
                </StyledTableCell>
                <StyledTableCell align="center" >{row.warning3}</StyledTableCell>
                <StyledTableCell align="center">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Warnings;