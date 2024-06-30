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
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [open, setOpen] = React.useState(false);
  const [staffID, setStaffID] = useState("");
  const [records, setRecords] = useState([]);

  const onClickRowDelete = (rowid) => {
    setStaffID(rowid);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getStaffDetails();
  }, []);

  // Get the data from the backend to front end

  const getStaffDetails = () => {
    axios
      .get("http://localhost:3001/staffDetails/addNewStaff")
      .then((response) => {
        console.log("CALLED");
        console.log(response);
        setStafflist(response.data.result);
        setRecords(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the edit button

  const handleEdit = (staffID) => {
    console.log("Hanlde Edit Before axios");
    axios
      .get(
        `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${staffID}`
      )
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button

  const handleDelete = (staffID) => {
    axios
      .delete(
        `http://localhost:3001/staffDetails/addNewStaff/deleteStaff/${[
          staffID,
        ]}`
      )
      .then((response) => {
        console.log("Hanlde Delete Called");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Search Bar Function

  const Filter = (event) => {
    const query = event.target.value.toLowerCase();
    setRecords(
      stafflist.filter(
        (f) =>
          f.staffID.toLowerCase().includes(query) ||
          f.name_with_initials.toLowerCase().includes(query) ||
          f.nic.toLowerCase().includes(query) ||
          f.staff_category.toLowerCase().includes(query) ||
          f.mobile_no.toLowerCase().includes(query) ||
          f.email.toLowerCase().includes(query) ||
          f.city.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="unitListContainer">
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/staff details/addNewStaff" />
      </div>

      {/* Staff Details Table */}

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
              <StyledTableCell align="left">NIC</StyledTableCell>
              <StyledTableCell align="left">Staff Role</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">City</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {records &&
              records.map((apartflowtesting, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {apartflowtesting.staffID}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.name_with_initials}
                    </StyledTableCell>
                    <StyledTableCell>{apartflowtesting.nic}</StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.staff_category}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.mobile_no}
                    </StyledTableCell>
                    <StyledTableCell>{apartflowtesting.email}</StyledTableCell>
                    <StyledTableCell>{apartflowtesting.city}</StyledTableCell>
                    <StyledTableCell
                      sx={{
                        display: "flex",
                        gap: "0.3rem",
                      }}
                    >
                      <EditButton //front end route edit
                        route={`/staff details/updateStaff/${[
                          apartflowtesting.staffID,
                        ]}`}
                        onClick={() => handleEdit([apartflowtesting.staffID])}
                      />
                      <DeleteButton
                        onClick={() =>
                          onClickRowDelete(apartflowtesting.staffID)
                        }
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>

          {/* Delete Button Dialog */}

          <div className="Delete Dialog">
            <React.Fragment>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete staff member"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(staffID)} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </div>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StaffList;
