import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
// import Minibar from "../Mininavbar/Minibar";
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionContainer = styled("div")({
  display: "flex",
  // justifyContent: 'space-between',
  alignItems: "right",
  // gap: '8px',  // Adjust the gap as needed
});

function ComplaintsTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [Reference_id, setReference_id] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3001/complaints/newComplaint")
      .then((response) => {
        if (response.data && Array.isArray(response.data.result)) {
          setRows(response.data.result);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  // Handling the edit button

  const handleEdit = (Reference_id) => {
    console.log("Hanlde Edit Before axios");
    axios
      .get(`http://localhost:3001/complaints/newComplaint/${Reference_id}`)
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="complaintsContainer">
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/complaints/complaintsForm" />
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
              <StyledTableCell align="left">
                Complained By (Unit ID)
              </StyledTableCell>
              <StyledTableCell align="left">
                Complained Date & Time
              </StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">{row.Nature}</StyledTableCell>
                <StyledTableCell align="left">{row.Title}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.Complained_by}
                </StyledTableCell>
                <StyledTableCell align="left">{row.C_Date}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.C_Description}
                </StyledTableCell>
                <StyledTableCell align="center">{row.CStatus}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    gap: "0.3rem",
                  }}
                >
                  <EditButton //front end route edit
                    route={`/complaints/UpdateComplait/${[row.Reference_id]}`}
                    onClick={() => handleEdit([row.Reference_id])}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ComplaintsTable;
