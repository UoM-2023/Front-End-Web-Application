import React from "react";
import "./ComplaintsTable.css";
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
// import Minibar from "../Mininavbar/Minibar";

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

function createData(refno, nature, title, by, date, time, description, status, action) {
  return {refno, nature, title, by, date, time, description, status, action};
}

const rows = [
  createData('C-240024', 'Complaint', 'water issue', 'Tom Donald', '23/10/2022', '00:34', 'water issue', 'Closed',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData('C-240025', 'Suggestions', 'parking', 'David Johns', '03/02/2023', '09:00', 'N/A', 'Open',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData('C-240026', 'Request', 'clean garden', 'Bill Will', '25/06/2024', '14:30', 'N/A', 'Open',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function ComplaintsTable() {
  const navigate = useNavigate();
  return (
    <div className="complaintsContainer">
      {/* <Minibar /> */}
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton route="/complaints/complaintsForm"/>
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
            <StyledTableCell align="left">Reference No</StyledTableCell>
              <StyledTableCell align="left">Complaint Nature</StyledTableCell>
              <StyledTableCell align="left">Complaint Title</StyledTableCell>
              <StyledTableCell align="left">Complained By</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Time</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.u}>
                <StyledTableCell align="left">{row.refno}</StyledTableCell>
                <StyledTableCell align="left">{row.nature}</StyledTableCell>
                <StyledTableCell align="left">{row.title}</StyledTableCell>
                <StyledTableCell align="left">{row.by}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left">{row.time}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ComplaintsTable;
