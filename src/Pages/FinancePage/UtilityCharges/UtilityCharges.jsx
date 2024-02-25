import React from "react";
import "./UtilityCharges.css";
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
  utilityChargesID,
  unitID,
  ownerName,
  utilityType,
  date,
  noOfUnits,
  amount,
  action
) {
  return {
    no,
    utilityChargesID,
    unitID,
    ownerName,
    utilityType,
    date,
    noOfUnits,
    amount,
    action,
  };
}

const rows = [
  createData(
    1,
    "U-256580",
    "A-214100",
    "A.W.G.Silva",
    "Gas",
    "15 JAN 2024",
    "15",
    "1456.85",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    2,
    "U-256581",
    "A-214101",
    "A.W.G.Gamage",
    "Water",
    "15 JAN 2024",
    "27",
    "2,458.75",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    3,
    "U-256582",
    "S-214102",
    "A.W.G.Samaraweera",
    "Gas",
    "15 JAN 2024",
    "38",
    "5,500.70",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    4,
    "U-256583",
    "S-214103",
    "A.W.Jerry Fernando",
    "Electricity",
    "15 JAN 2024",
    "51",
    "12,500.00",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
  createData(
    5,
    "U-256584",
    "A-214104",
    "A.W.Saman Abeykoon",
    "Water",
    "15 JAN 2024",
    "29",
    "2,450.75",
    <div className="actionBtn">
      <EditButton />
      &nbsp; &nbsp;
      <DeleteButton />
    </div>
  ),
];

function UtilityCharges() {
  const navigate = useNavigate();
  return (
    <div className="utilityChargesContainer">
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton route="/finance/utilitycharges/addUtility"/>
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
              <StyledTableCell align="left">Utility Charges ID</StyledTableCell>
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Owner Name</StyledTableCell>
              <StyledTableCell align="left">Utility Type</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">No Of Units</StyledTableCell>
              <StyledTableCell align="right">Amount (Rs.)</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.no}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.utilityChargesID}
                </StyledTableCell>
                <StyledTableCell align="left">{row.unitID}</StyledTableCell>
                <StyledTableCell align="left">{row.ownerName}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.utilityType}
                </StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.noOfUnits}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UtilityCharges;
