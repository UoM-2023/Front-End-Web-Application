import React from "react";
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
  paymentID,
  unitID,
  residentName,
  method,
  chargeType,
  paymentDateTime,
  amount
) {
  return {
    no,
    paymentID,
    unitID,
    residentName,
    method,
    chargeType,
    paymentDateTime,
    amount,
  };
}

const rows = [
  createData(
    1,
    "P-205061",
    "A-214100",
    "A.W.G.Silva",
    "Online",
    "Gas",
    "05/29/2019, 12:55 PM",
    "4,500.00"
  ),
  createData(
    2,
    "P-205062",
    "A-214102",
    "A.W.G.Gamage",
    "Online",
    "Electricity",
    "10/03/2021, 10:50 PM",
    "14,800.00"
  ),
  createData(
    3,
    "P-205063",
    "A-214103",
    "A.W.G.Samaraweera",
    "Online",
    "Gas",
    "03/30/2020, 08:21 AM",
    "24,900.00"
  ),
  createData(
    4,
    "P-205065",
    "A-214104",
    "A.W.Jerry Fernando",
    "Online",
    "Water",
    "01/19/2023, 02:36 PM",
    "2,400.00"
  ),
  createData(
    5,
    "P-205066",
    "A-214105",
    "A.W.Saman Abeykoon",
    "Online",
    "Gas",
    "07/23/2020, 07:45 PM",
    "10,550.00"
  ),
];

function ResidentsPayments() {
  return (
    <div className="residentsPaymentsContainer">
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
              <StyledTableCell align="left">Payment ID</StyledTableCell>
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Resident Name</StyledTableCell>
              <StyledTableCell align="left">Method</StyledTableCell>
              <StyledTableCell align="left">Charge Type</StyledTableCell>
              <StyledTableCell align="left">
                Payment Date & Time
              </StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">{row.paymentID}</StyledTableCell>
                <StyledTableCell align="left">{row.unitID}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.residentName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.method}</StyledTableCell>
                <StyledTableCell align="left">{row.chargeType}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.paymentDateTime}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResidentsPayments;
