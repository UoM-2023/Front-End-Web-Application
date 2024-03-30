import * as React from "react";
import "./RequestsTable.css";
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
import Minibar from "../mininavbar/minibar.maintenance";

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
  unitID,
  residentName,
  maintenanceType,
  requestedDate,
  status,
  action
) {
  return {
    no,
    referenceNo,
    unitID,
    residentName,
    maintenanceType,
    requestedDate,
    status,
    action,
  };
}

const rows = [
  createData(
    1,
    "M-120046",
    "A-214112",
    "P.O.Nimal Fernando",
    "Water Supply",
    "08 FEB 2024",
    "Done",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    2,
    "M-120047",
    "A-214004",
    "Q.Z.Ghotabhaya",
    "Electricity Service",
    "01 FEB 2024",
    "Pending",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function RequestsTable() {
  return (
    <div className="requestsTableContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/maintenance/newRequest"/>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: "92.5vw",
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
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Resident Name</StyledTableCell>
              <StyledTableCell align="left">Maintenance Type</StyledTableCell>
              <StyledTableCell align="left">Requested Date</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
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
                <StyledTableCell align="left">{row.unitID}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.residentName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.maintenanceType}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.requestedDate}
                </StyledTableCell>
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

export default RequestsTable;
