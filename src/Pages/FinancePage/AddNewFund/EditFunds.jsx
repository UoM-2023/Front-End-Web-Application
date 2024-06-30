import React, { useEffect, useState } from "react";
import "./EditFunds.css";
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
import Minibar from "../Mininavbar/Minibar";
import axios from "axios";
import EditFundsAddNew from "./EditFundFrom/EditFundsAddNew";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../LoginPage/LoginServices/authService";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

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

function EditFunds() {
  let no = 1;
  const navigate = useNavigate();
  const [fundTypes, setFundTypes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [fund_id, setfund_id] = useState("");

  const onClickRowDelete = (rowid) => {
    setfund_id(rowid);
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
    getFundTypes();
  }, []);

  // Get the data from the backend to front end
  const getFundTypes = () => {
    axiosInstance.get("/finance/editFunds").then( (response) => {
      console.log("Called");
      console.log(response);
      setFundTypes(response.data.result[0])
      // console.log(response.data.result[0].fund_id)

    }).catch( (error) => {
      console.log(error);
    })
  }

  // Handling the edit button
  const handleEdit = (id) => {
    console.log("Hanlde edit before axios");
    axiosInstance.get(`/finance/editFunds/${id}`)
      .then((response) => {
        console.log("Hanlde edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    console.log("Delete handler");
    axiosInstance
      .delete(`/finance/editFunds/deleteFund/${id}`)
      .then((response) => {
        console.log("Delete handler called");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Delete handle error", error);
      });
  };

  return (
    <div className="editFundsContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar />
        {/* <AddNewButton route="/finance/editFunds/newFund" /> */}
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
          {/*--------------- Table Headings ----------------------*/}
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#No</StyledTableCell>
              {/* <StyledTableCell align="left">Fund ID</StyledTableCell> */}
              <StyledTableCell align="left">Fund Name</StyledTableCell>
              <StyledTableCell align="center">Charged By</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">
                Time Period <br />
                (In Months)
              </StyledTableCell>
              <StyledTableCell align="center">Modified Date</StyledTableCell>
              <StyledTableCell align="left">Modified By</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          {/* ------------- Table Data --------------------- */}

          <TableBody>
            {fundTypes.map((fundType, index) => (
              <StyledTableRow key={fundType.fund_id}>
                {/* For the counting in first column */}
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{fundType.fundName}</StyledTableCell>
                <StyledTableCell align="center">
                  {fundType.chargedBy}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {fundType.amount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {fundType.timePeriod}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {fundType.modified_date.slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell>{fundType.modified_by}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <EditButton
                    route={`/finance/editFunds/updateFund/${fundType.fund_id}`}
                    onClick={() => handleEdit(fundType.fund_id)}
                  />
                  <DeleteButton
                    onClick={() => onClickRowDelete(fundType.fund_id)}
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
                  {"Delete Fund Type"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(fund_id)} autoFocus>
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

export default EditFunds;
