import React from "react";
import "./EditFunds.css";
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
  fundID,
  fundName,
  chargedBy,
  amount,
  timePeriod,
  modifiedDate,
  modifiedBy,
  action
) {
  return {
    no,
    fundID,
    fundName,
    chargedBy,
    amount,
    timePeriod,
    modifiedDate,
    modifiedBy,
    action
  };
}

const rows = [
  createData(
    1,
    "C-001",
    "Management Fund",
    "All Units",
    "2400.00",
    "1 Month",
    "12/1/2024",
    "M-102",
    <div className="actionBtn">
        <EditButton />
        &nbsp; &nbsp;
        <DeleteButton />
    </div>
  ),
  createData(
    1,
    "C-001",
    "Management Fund",
    "All Units",
    "2400.00",
    "1 Month",
    "12/1/2024",
    "M-102",
    <div className="actionBtn">
        <EditButton />
        &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function EditFunds() {
  return (
    <div className="editFundsContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton route="/finance/editFunds/newFund"/>
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
              <StyledTableCell align="left">Fund ID</StyledTableCell>
              <StyledTableCell align="left">Fund Name</StyledTableCell>
              <StyledTableCell align="left">Charged By</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Time Period</StyledTableCell>
              <StyledTableCell align="left">Modified Date</StyledTableCell>
              <StyledTableCell align="left">Modified By</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.fundID}
                </StyledTableCell>
                <StyledTableCell align="left">{row.fundName}</StyledTableCell>
                <StyledTableCell align="left">{row.chargedBy}</StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.timePeriod}
                </StyledTableCell>
                <StyledTableCell align="center">{row.modifiedDate}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.modifiedBy}
                </StyledTableCell>
                <StyledTableCell align="center">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EditFunds;