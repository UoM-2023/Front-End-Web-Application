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
import axios from "axios";
import { useState, useEffect } from "react";
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

function RequestsTable() {
  const [maintenance, SetMaintenance] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setID] = useState("");

  const onclickRowDelete = (rowid) => {
    setID(rowid);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("frontend use effect");
    getMaintenanceData();
  }, []);

  //get the data from backend to frontend

  const getMaintenanceData = () => {
    axios
      .get("http://localhost:3001/maintenance/New_Mnt_Req")
      .then((response) => {
        console.log("called.....");
        console.log(response);
        SetMaintenance(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the Delete button
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/maintenance/New_Mnt_Req/${id}`)
      .then((response) => {
        console.log("Handle Delete Called");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="requestsTableContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/maintenance/newRequest" />
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
              {/* <StyledTableCell align="left">#No</StyledTableCell> */}

              <StyledTableCell align="left">Request ID</StyledTableCell>
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Resident Name</StyledTableCell>
              <StyledTableCell align="left">Maintenance Type</StyledTableCell>
              <StyledTableCell align="left">Requested Date</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {maintenance &&
              maintenance.map((apartflowtesting, index) => {
                return (
                  <StyledTableRow key={index}>
                    {/* <StyledTableCell align="left">{apartflowtesting.}</StyledTableCell> */}
                    <StyledTableCell>
                      {apartflowtesting.Mnt_Request_id}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.Unit_id}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.Resident_Name}
                    </StyledTableCell>
                    <StyledTableCell>{apartflowtesting.MType}</StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.requested_date}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.M_Description}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.Mnt_Status}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <EditButton />
                      <DeleteButton
                        onClick={() => onclickRowDelete(apartflowtesting.id)}
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

export default RequestsTable;
