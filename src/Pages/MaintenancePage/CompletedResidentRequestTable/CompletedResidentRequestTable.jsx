import * as React from "react";
import "./CompletedResidentRequestTable.css";
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
  referenceNo,
  serviceProvider,
  mobileNo,
  requestedDate,
  completedDate,
  paymentStatus,
  paymemntID,
  action
) {
  return {
    no,
    referenceNo,
    serviceProvider,
    mobileNo,
    requestedDate,
    completedDate,
    paymentStatus,
    paymemntID,
    action,
  };
}

const rows = [
  createData(
    1,
    "M-220046",
    "K.K.Gas Sevice",
    "0112364445",
    "04 JAN 2024",
    "07 JAN 2024",
    "Paid",
    "P-205075",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    2,
    "M-220047",
    "S.M.Gas Service",
    "0112555222",
    "31 JAN 2024",
    "15 FEB 2024",
    "Pending",
    "P-205060",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    3,
    "M-220050",
    "J.K.Plummer",
    "0112555222",
    "25 JAN 2024",
    "15 FEB 2024",
    "Paid",
    "P-205060",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    4,
    "M-220049",
    "J.K.Plummer",
    "0112555222",
    "25 JAN 2024",
    "15 FEB 2024",
    "Paid",
    "P-205060",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    5,
    "M-220050",
    "Cane Electricians",
    "0112555222",
    "25 JAN 2024",
    "15 FEB 2024",
    "Paid",
    "P-205060",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function CompletedResidentRequestTable() {
  return (
    <div className="completedResidentRequestTableContainer">
      <div className="pageTop">
        <SearchBar />
        <AddNewButton />
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
              <StyledTableCell align="left">Reference No</StyledTableCell>
              <StyledTableCell align="left">Service Provider</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Requested Date</StyledTableCell>
              <StyledTableCell align="left">Completed Date</StyledTableCell>
              <StyledTableCell align="left">Payment Status</StyledTableCell>
              <StyledTableCell align="left">Payment ID</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.referenceNo}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.serviceProvider}
                </StyledTableCell>
                <StyledTableCell align="left">{row.mobileNo}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.requestedDate}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.completedDate}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.paymentStatus}
                </StyledTableCell>
                <StyledTableCell align="left">{row.paymemntID}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CompletedResidentRequestTable;
