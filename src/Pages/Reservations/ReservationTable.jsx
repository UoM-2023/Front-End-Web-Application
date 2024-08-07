// export default function ReservationTable() {

import * as React from "react";
import "./reservationtable.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditButton from "../../Component/Buttons/EditButton";
import DeleteButton from "../../Component/Buttons/DeleteButton";
import SearchBar from "../../Component/SearchBar/SearchBar";
import AddNewButton from "../../Component/Buttons/AddNewButton";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Minibar from "../ReservationNew/MiniNavBar/miniNavBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../LoginPage/LoginServices/authService";

//routing

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/drafts"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  const routeMatch = useRouteMatch(["/inbox/:id", "/drafts"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab
        label="Facilities"
        value="/inbox/:id"
        to="/inbox/1"
        component={Link}
      />
      <Tab label="Reservations" value="/drafts" to="/drafts" component={Link} />
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();
} ////////////////////////////////////////////////////////////////

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

//new comments///////////////////////////////////////////

// function createData(ReferenceNumber, Name, FacilityName, RequstedDate, StartDate, EndDate, PaymentStatus, Status, action) {
//   return { ReferenceNumber, Name, FacilityName, RequstedDate, StartDate, EndDate, PaymentStatus, Status, action };
// }

function ReservationTable() {
  const [reservationlist, setReservationlist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [ref_no, setref_no] = useState("");
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const onClickRowDelete = (rowid) => {
    setref_no(rowid);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
    // navigate("/reservations");
  };

  const handleClose = () => {
    setOpen(false);
    //navigate("/reservations");
  };
  //////facility.
  useEffect(() => {
    console.log("frontend use effect");
    getReservationDetails();
  }, []);

  // Get the data from the backend to front end
  ////faciity
  const getReservationDetails = () => {
    axiosInstance
      .get("/Reservation/Reservations")
      .then((response) => {
        console.log("CALLED");
        console.log(response);
        setReservationlist(response.data.result);
        setRecords(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the edit button (primary key)

  const handleEdit = (ref_no) => {
    console.log("Hanlde Edit Before axios");
    axiosInstance
      .get(`/Reservation/Reservations/${ref_no}`)
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button (primary key)

  const handleDelete = (ref_no) => {
    axiosInstance
      .delete(`/Reservation/Reservations/${[ref_no]}`)
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
      reservationlist.filter(
        (f) =>
          f.ref_no.toLowerCase().includes(query) ||
          f.Unit_id.toLowerCase().includes(query) ||
          // f.resident_name.toLowerCase().includes(query) ||
          f.facility_name.toLowerCase().includes(query) ||
          f.requested_date.toLowerCase().includes(query) ||
          f.start_date.toLowerCase().includes(query) ||
          f.end_date.toLowerCase().includes(query) ||
          f.start_time.toLowerCase().includes(query) ||
          f.end_time.toLowerCase().includes(query) ||
          // f.payment_status.toLowerCase().includes(query) ||
          f.availability.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="GuestTableContainer">
      <div className="miniBar">
        <Minibar />
      </div>

      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/reservations/addNew" />
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: "95vw",
            marginTop: 5,
            marginLeft: 9,
            marginRight: 0,
            paddingTop: "100px",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Reference Number</StyledTableCell>
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              {/* <StyledTableCell align="left">Resident Name</StyledTableCell> */}
              <StyledTableCell align="left">Facility Name</StyledTableCell>
              <StyledTableCell align="left">Requsted Date</StyledTableCell>
              <StyledTableCell align="left">Start Date</StyledTableCell>
              <StyledTableCell align="left">End Date</StyledTableCell>
              <StyledTableCell align="left">Start Time</StyledTableCell>
              <StyledTableCell align="left">End Time</StyledTableCell>
              {/* <StyledTableCell align="left">Payment Status</StyledTableCell> */}
              <StyledTableCell align="left">Availability</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((apartflowtesting, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{apartflowtesting.ref_no}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.Unit_id}</StyledTableCell>
                  <StyledTableCell>
                    {apartflowtesting.facility_name}
                  </StyledTableCell>
                  <StyledTableCell>
                    {apartflowtesting.requested_date.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {apartflowtesting.start_date.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {apartflowtesting.end_date.slice(0, 10)}
                    {/* {apartflowtesting.end_date.slice(0, 10)} */}
                  </StyledTableCell>
                  <StyledTableCell>
                    {apartflowtesting.start_time}
                  </StyledTableCell>
                  <StyledTableCell>{apartflowtesting.end_time}</StyledTableCell>
                  {/* <StyledTableCell>
                    {apartflowtesting.payment_status}
                  </StyledTableCell> */}
                  <StyledTableCell>
                    {apartflowtesting.availability}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      gap: "0.3rem",
                    }}
                  >
                    <EditButton //front end route edit
                      route={`/reservations/updateReservation/${[
                        apartflowtesting.ref_no,
                      ]}`}
                      onClick={() => handleEdit([apartflowtesting.ref_no])}
                    />
                    <DeleteButton
                      onClick={() => onClickRowDelete(apartflowtesting.ref_no)}
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
                  {"Delete Reservation"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(ref_no)} autoFocus>
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

export default ReservationTable;
