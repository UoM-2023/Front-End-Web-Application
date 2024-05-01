import React from "react";
import "./NoticesTable.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditButton from "../../../../Component/Buttons/EditButton";
import DeleteButton from "../../../../Component/Buttons/DeleteButton";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../../Component/Buttons/AddNewButton";
import { Link, useNavigate } from "react-router-dom";
import MiniNavBar from "../../MiniNavBar/MiniNaveBar";

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
  type,
  title,
  sDate,
  eDate,
  description,
  status,
  action,
) {
  return {
    type,
    title,
    sDate,
    eDate,
    description,
    status,
    action,
  };
}

const rows = [
  createData(
   'Proposal','Parking','20/10/2022','23/10/2022','Park vehicle properly','Not Yet',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    'Announcement','Maintenance','20/10/2022','24/10/2022','Do not use Elevator 02','Approved',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    'Announcement','Water issues','20/10/2022','24/10/2022','Repair in water pipes','Approved',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function NoticesTable() {
  const navigate = useNavigate();
  return (
    <div className="noticesTableContainer">
      <MiniNavBar/>
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton route="/news & notices/noticesForm"/>
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
              <StyledTableCell align="left">Notice Type</StyledTableCell>
              <StyledTableCell align="left">Notice Title</StyledTableCell>
              <StyledTableCell align="left">Start Date</StyledTableCell>
              <StyledTableCell align="left">End Date</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.u}>
                <StyledTableCell align="left">{row.type}</StyledTableCell>
                <StyledTableCell align="left">{row.title}</StyledTableCell>
                <StyledTableCell align="left">{row.sDate}</StyledTableCell>
                <StyledTableCell align="left">{row.eDate}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NoticesTable;
