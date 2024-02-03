import * as React from "react";
import "./UnitList.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewButton from "../../../Component/Buttons/ViewButton";
import EditButton from "../../../Component/Buttons/EditButton";
import DeleteButton from "../../../Component/Buttons/DeleteButton";

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

function createData(no, unit, name, status, mobileNo, email, action) {
  return { no, unit, name, status, mobileNo, email, action };
}

const rows = [
  createData(
    1,
    "A-214100",
    "A.W.G.Silva",
    "Owner",
    "0767927004",
    "awg25silva1999@gmail.com",
    <div className="actionBtn">
      <ViewButton />
      &nbsp; &nbsp;
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    2,
    "A-214101",
    "A.W.G.Gamage",
    "Owner",
    "0711927004",
    "awgsilva1999@gmail.com",
    <div className="actionBtn">
      <ViewButton />
      &nbsp; &nbsp;
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    3,
    "B-214102",
    "A.W.G.Samaraweera",
    "Owner",
    "0767925504",
    "awgsilva1999@gmail.com",
    <div className="actionBtn">
      <ViewButton />
      &nbsp; &nbsp;
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    4,
    "B-214103",
    "A.W.Jerry Fernando",
    "Owner",
    "0117927004",
    "awgsilva1999@gmail.com",
    <div className="actionBtn">
      <ViewButton />
      &nbsp; &nbsp;
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    5,
    "A-214104",
    "A.W.Saman Abeykoon",
    "Owner",
    "0787027004",
    "awgsilva1999@gmail.com",
    <div className="actionBtn">
      <ViewButton />
      &nbsp; &nbsp;
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function UnitList() {
  return (
    <div className="unitListContainer">
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
              <StyledTableCell align="left">#No</StyledTableCell>
              <StyledTableCell align="left">Unit</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">{row.unit}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.mobileNo}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UnitList;
