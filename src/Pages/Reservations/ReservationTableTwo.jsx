
import * as React from "react";
import "./reservationtableTwo.css"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditButton from "../../Component/Buttons/EditButton";
import DeleteButton from "../../Component/Buttons/DeleteButton";
import SearchBar from "../../Component/SearchBar/SearchBar";
import AddNewButton from "../../Component/Buttons/AddNewButton";
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

function createData(n, REF_NO, FACILITY_NAME, AMOUNT_CHARGE, CHARGE_PER, STATUS, ACTION) {
  return { n, REF_NO, FACILITY_NAME, AMOUNT_CHARGE, CHARGE_PER, STATUS, ACTION };
}


const rows = [
  createData(
    "W764783",
    "James Thomas",
    "Event Hall",
    "22/06/2022",
    "23/06/2022",
    "24/06/2022",
 
    <div className="actionBtn">

      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    "E764583",
    "Cane Electricians",
    "Event Hall",
    "22/06/2022",
    "25/06/2022",
    "29/06/2022",

   
    <div className="actionBtn">

      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    "G345678",
    "Patrick Stefans",
    "Gym",
    "22/06/2022",
    "27/06/2022",
    "28/06/2022",

   
    <div className="actionBtn">

      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  
 
];

function ReservationTableTwo() {
  return (
    
    <div className="GuestTableContainer">


  <div className="FaciAndReser">
    <span className="Faci"><h4>Facilities</h4></span>
    <span className="Reser"><h4>Reservations</h4></span>
</div>

<div className="SearchBarAndADDnewButton">
    <span className="SearchBar">
    <SearchBar/>
    </span>

    <span className="AddNewButton">
    <AddNewButton/>
    </span>
</div>

      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: "95vw",
            marginTop: 5,
            marginLeft: 9,
            marginRight: 0,
            paddingTop: "100px",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">REF NO</StyledTableCell>
              <StyledTableCell align="left">FACILITY NAME</StyledTableCell>
              <StyledTableCell align="left">AMOUNT CHARGE</StyledTableCell>
              <StyledTableCell align="left">CHARGE PER</StyledTableCell>
              <StyledTableCell align="left">STATUS</StyledTableCell>
              <StyledTableCell align="left">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.n}</StyledTableCell>
                <StyledTableCell align="left">{row.REF_NO}</StyledTableCell>
                <StyledTableCell align="left">{row.FACILITY_NAME}</StyledTableCell>
                <StyledTableCell align="left">{row.AMOUNT_CHARGE}</StyledTableCell>
                <StyledTableCell align="left">{row.CHARGE_PER}</StyledTableCell>
                <StyledTableCell align="left">{row.STATUS}</StyledTableCell>
                <StyledTableCell align="left">{row.ACTION}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReservationTableTwo;
