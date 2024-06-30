import React, { useEffect, useState } from "react";
import "./EventsTable.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditButton from "../../../../Component/Buttons/EditButton";
import DeleteButton from "../../../../Component/Buttons/DeleteButton";
import SearchBar from "../../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../../Component/Buttons/AddNewButton";
import { Link, useNavigate } from "react-router-dom";
import MiniNavBar from "../../MiniNavBar/MiniNaveBar";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../../../LoginPage/LoginServices/authService";


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

function EventsTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Event_no, setEvent_no] = useState("");

  const onClickRowDelete = (rowid) => {
    setEvent_no(rowid);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("/newsNotices/newEvent")
      .then((response) => {
        if (response.data && Array.isArray(response.data.result)) {
         console.log(response.data.result)
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

  const handleEdit = (Event_no) => {
    console.log("Hanlde Edit Before axios");
    axiosInstance
      .get(`/newsNotices/newEvent/${Event_no}`)
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button

  const handleDelete = (Event_no) => {
    axiosInstance
      .delete(`/newsNotices/newEvent/${[Event_no]}`)
      .then((response) => {
        console.log("Hanlde Delete Called");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="eventsTableContainer">
      <MiniNavBar />
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/eventsTable/eventsForm" />
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
              <StyledTableCell align="left">Event No</StyledTableCell>
              <StyledTableCell align="left">Event</StyledTableCell>
              <StyledTableCell align="left">Place</StyledTableCell>
              <StyledTableCell align="left">Start Date</StyledTableCell>
              <StyledTableCell align="left">End Date</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Event_no}>
                <StyledTableCell align="left">{row.Event_no}</StyledTableCell>
                <StyledTableCell align="left">{row.E_Name}</StyledTableCell>
                <StyledTableCell align="left">{row.E_Place}</StyledTableCell>
                <StyledTableCell align="left">{row.S_Date.slice(0,10)}</StyledTableCell>
                <StyledTableCell align="left">{row.E_Date.slice(0,10)}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.E_Description}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    gap: "0.3rem",
                  }}
                >
                  <EditButton //front end route edit
                    route={`/eventsTable/eventsUpdate/${[row.Event_no]}`}
                    onClick={() => handleEdit([row.Event_no])}
                  />
                  <DeleteButton
                    onClick={() => onClickRowDelete(row.Event_no)}
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
                  {"Delete An Event"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(Event_no)} autoFocus>
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

export default EventsTable;
