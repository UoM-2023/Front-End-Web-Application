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
import Minibar from "../mininavbar/minibar.maintenance";
import DoneSwitch from "../../../Component/Switchs/DoneSwitch";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../../LoginPage/LoginServices/authService";

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
  "&:last-child td, &:last-child th": {},
}));

function CompletedResidentRequestTable() {
  const [completedList, setCompletedList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");
  const [records, setRecords] = useState([]);

  const onClickRowDelete = (rowid) => {
    setId(rowid);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Change Completed Date Format

  function formatDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    console.log("frontend use effect");
    getCompletedRequestDetails();
  }, []);

  // Get the data from the backend to front end

  const getCompletedRequestDetails = () => {
    axiosInstance
      .get("/maintenance/Completed_Mnt_Req")
      .then((response) => {
        console.log("CALLED");
        const mntIds = response.data.result.map((item) => item.Mnt_id);
        console.log(mntIds);
        setCompletedList(response.data.result);
        setRecords(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the edit button

  const handleEdit = (id) => {
    console.log("Hanlde Edit Before axios");
    axiosInstance
      .get(`/maintenance/Completed_Mnt_Req/${id}`)
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/maintenance/Completed_Mnt_Req/${id}`)
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
      completedList.filter(
        (f) =>
          f.Mnt_id.toLowerCase().includes(query) ||
          f.ServiceProvider.toLowerCase().includes(query) ||
          f.MobileNo.toLowerCase().includes(query) ||
          f.requested_date.toLowerCase().includes(query) ||
          f.completed_date.toLowerCase().includes(query) ||
          f.Payment_Status.toLowerCase().includes(query) ||
          f.Mnt_Payment_id.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="completedResidentRequestTableContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/maintenance/completed/addNewCompleted" />
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
            {records.map((CompletedReq, index) => (
              <StyledTableRow key={CompletedReq.id}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">
                  {CompletedReq.Mnt_id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {CompletedReq.ServiceProvider}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {CompletedReq.MobileNo}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formatDate(CompletedReq.requested_date)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formatDate(CompletedReq.completed_date)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {CompletedReq.Payment_Status}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {CompletedReq.Mnt_Payment_id}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    gap: "0.3rem",
                  }}
                >
                  <EditButton
                    route={`/maintenance/completed/UpdateCompleted/${[
                      CompletedReq.id,
                    ]}`}
                    onClick={() => handleEdit([CompletedReq.id])}
                  />
                  <DeleteButton
                    onClick={() => onClickRowDelete(CompletedReq.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
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
                  {"Delete Completed Request"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(id)} autoFocus>
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

export default CompletedResidentRequestTable;
