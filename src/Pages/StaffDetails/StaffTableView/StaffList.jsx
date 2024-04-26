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
import SearchBar from "../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../Component/Buttons/AddNewButton";
import TopBar from "../../../Component/TopBar/TopBar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

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

function StaffList() {
  const [stafflist, setStafflist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/staffDetails/addNewStaff")
      .then((response) => {
        console.log("CALLED");
        console.log(response);
        setStafflist(response.data.result);
      })
      .catch((error) => console.log(error));
  }, []);

  //console.log(stafflist);

  return (
    <div className="unitListContainer">
      <TopBar title="Staff Details" />
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/staff details/addNewStaff" />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: "93.5vw",
            marginTop: 5,
            marginLeft: 9.5,
            marginRight: 0,
            paddingTop: "100px",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {/* <StyledTableCell align="left">#No</StyledTableCell> */}
              <StyledTableCell align="left">Staff ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Staff Role</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              {/* <StyledTableCell align="left">Created Date</StyledTableCell> */}
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stafflist &&
              stafflist.map((apartflowtesting, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {apartflowtesting.staffID}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.name_with_initials}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.staff_category}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.mobile_no}
                    </StyledTableCell>
                    <StyledTableCell>{apartflowtesting.email}</StyledTableCell>
                    <StyledTableCell
                      sx={{
                        display: "flex",
                      }}
                    >
                      <EditButton />
                      &nbsp; &nbsp;
                      <DeleteButton />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StaffList;
