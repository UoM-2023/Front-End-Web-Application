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
import TopBar from "../../../Component/TopBar/TopBar";
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

function CompletedResidentRequestTable() {
  const [completed_maintenance, Set_Completed_Maintenance] = useState([]);
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
    get_Completed_MaintenanceData();
  }, []);

  //get the data from backend to frontend

  const get_Completed_MaintenanceData = () => {
    axios
      .get("http://localhost:3001/maintenance/Completed_Mnt_Req")
      .then((response) => {
        console.log("called.....");
        console.log(response);
        Set_Completed_Maintenance(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the Delete button
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/maintenance/Completed_Mnt_Req/${id}`)
      .then((response) => {
        console.log("Handle Delete Called");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="completedResidentRequestTableContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar />
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
              {/* <StyledTableCell align="left">#No</StyledTableCell> */}
              <StyledTableCell align="left">M_paymentId</StyledTableCell>
              <StyledTableCell align="left">Reference No</StyledTableCell>
              <StyledTableCell align="left">Service Provider</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              {/* <StyledTableCell align="left">Requested Date</StyledTableCell> */}
              <StyledTableCell align="left">Completed Date</StyledTableCell>
              <StyledTableCell align="left">Payment Status</StyledTableCell>
              <StyledTableCell align="left">Payment ID</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completed_maintenance &&
              completed_maintenance.map((ApartFlowTesting, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {ApartFlowTesting.Completed_Mnt_id}
                    </StyledTableCell>
                    <StyledTableCell>{ApartFlowTesting.Mnt_id}</StyledTableCell>
                    <StyledTableCell>
                      {ApartFlowTesting.ServiceProvider}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ApartFlowTesting.MobileNo}
                    </StyledTableCell>
                    {/* <StyledTableCell >
                  {ApartFlowTesting.requestedDate}
                </StyledTableCell> */}
                    <StyledTableCell>
                      {ApartFlowTesting.completed_date}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ApartFlowTesting.Payment_Status}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ApartFlowTesting.Mnt_Payment_id}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <EditButton />
                      <DeleteButton
                       onClick={() => onclickRowDelete(ApartFlowTesting.id)}
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

export default CompletedResidentRequestTable;
