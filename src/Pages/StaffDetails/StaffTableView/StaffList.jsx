import * as React from "react";
import "./StaffList.css";
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

function createData(no, staffID, name, staffRole, mobileNo, email, createdDate, action) {
  return { no, staffID, name, staffRole, mobileNo, email, createdDate, action };
}

const rows = [
  createData(
    1,
    "A-214100",
    "A.W.G.Silva",
    "Finance Manager",
    "0767927004",
    "awg25silva1999@gmail.com",
    "05/29/2019",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    2,
    "A-214101",
    "A.W.G.Gamage",
    "Front Office Manager",
    "0711927004",
    "awgsilva1999@gmail.com",
    "10/03/2021",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    3,
    "S-214102",
    "A.W.G.Samaraweera",
    "Security Officer",
    "0767925504",
    "awgsilva1999@gmail.com",
    "03/30/2020",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    4,
    "S-214103",
    "A.W.Jerry Fernando",
    "Admin",
    "0117927004",
    "awgsilva1999@gmail.com",
    "01/19/2023",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    5,
    "S-214104",
    "A.W.Saman Abeykoon",
    "Maintenance Manager",
    "0787027004",
    "awgsilva1999@gmail.com",
    "07/23/2020",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function StaffList() {
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
              <StyledTableCell align="left">Staff ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Staff Role</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Created Date</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">{row.staffID}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.staffRole}</StyledTableCell>
                <StyledTableCell align="left">{row.mobileNo}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.createdDate}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StaffList;
