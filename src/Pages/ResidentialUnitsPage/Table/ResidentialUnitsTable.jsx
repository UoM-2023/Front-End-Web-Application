import React from "react";
// import "./UtilityCharges.css";
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
import TopBar from "../../../Component/TopBar/TopBar";
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

function createData(unit, block, building, category, name, status, action) {
    return { unit, block, building, category, name, status, action };
  }

const rows = [
  createData(
    'A-102', 'A', 'C-Wing', 'One Bedroom', 'Tom Donald', 'Occupied',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    'A-103', 'A', 'C-Wing', 'One Bedroom', 'N/A', 'Unoccupied',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    'A-104', 'A', 'C-Wing', 'Duplex', 'N/A', 'Unoccupied',
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function ResidentialUnitsTable() {
  const navigate = useNavigate();
  return (
    <div className="residentialUnitsContainer">
      
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton route="/residential units/residentialUnitsForm"/>
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
              <StyledTableCell align="left">Unit</StyledTableCell>
              <StyledTableCell align="left">Block</StyledTableCell>
              <StyledTableCell align="left">Building</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Resident Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.u}>
                <StyledTableCell align="left">{row.unit}</StyledTableCell>
                <StyledTableCell align="left">{row.block}</StyledTableCell>
                <StyledTableCell align="left">{row.building}</StyledTableCell>
                <StyledTableCell align="left">{row.category}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResidentialUnitsTable;
