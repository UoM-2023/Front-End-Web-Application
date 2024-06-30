
import * as React from "react";
import "./guesttable.css";
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
import AddNewButton from "../../Component/Buttons/AddNewButton";
import SearchBar from "../../Component/SearchBar/SearchBar";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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

function GuestTable() {
  const [guestlist, setGuestlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [guest_ID, setguest_ID] = useState("");

  function formatDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const limit = 10;

  const onClickRowDelete = (rowid) => {
    setguest_ID(rowid);
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
    getGuestDetails(page, query);
  }, [page, query]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getGuestDetails = async (page, query) => {
    try {
      const endpoint = query
        ? `http://localhost:3001/GuestDetail/searchGuests?query=${query}&page=${page}&limit=${limit}`
        : `http://localhost:3001/GuestDetail/GuestDetails?page=${page}&limit=${limit}`;
      const response = await axios.get(endpoint);
      const newRecords = response.data.result;

      if (page === 1) {
        setGuestlist(newRecords);
      } else {
        setGuestlist((prevRevenues) => [...prevRevenues, ...newRecords]);
      }

      if (newRecords.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Filter = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    setPage(1);
    setGuestlist([]);
    setHasMore(true);
  };

  const handleEdit = (guest_ID) => {
    console.log("Handle Edit Before axios");
    axios
      .get(`http://localhost:3001/GuestDetail/GuestDetails/${guest_ID}`)
      .then((response) => {
        console.log("Handle Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (guest_ID) => {
    axios
      .delete(`http://localhost:3001/GuestDetail/GuestDetails/${[guest_ID]}`)
      .then((response) => {
        console.log("Handle Delete Called");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="GuestTableContainer">
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/guests/addNew" />
      </div>
      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={guestlist.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>...</h4>}
        >
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
                <StyledTableCell align="left">Guest ID</StyledTableCell>
                <StyledTableCell align="left">Unit ID </StyledTableCell>
                {/* <StyledTableCell align="left">Resident Name</StyledTableCell> */}
                <StyledTableCell align="left">Guest Name</StyledTableCell>
                <StyledTableCell align="left">Vehicle Num</StyledTableCell>
                <StyledTableCell align="left">Guest NIC </StyledTableCell>
                <StyledTableCell align="left">Arrival Time </StyledTableCell>
                <StyledTableCell align="left">Check In </StyledTableCell>
                <StyledTableCell align="left">Check Out </StyledTableCell>
                <StyledTableCell align="left">Check In Time </StyledTableCell>
                <StyledTableCell align="left">Check Out Time </StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {guestlist &&
                guestlist.map((apartflowtesting, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        {apartflowtesting.guest_ID}
                      </StyledTableCell>
                      <StyledTableCell>
                        {apartflowtesting.unit_ID}
                      </StyledTableCell>
                      {/* <StyledTableCell>
                      {apartflowtesting.resident_name}
                    </StyledTableCell> */}
                      <StyledTableCell>
                        {apartflowtesting.guest_name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {apartflowtesting.vehicle_number}
                      </StyledTableCell>
                      <StyledTableCell>
                        {apartflowtesting.guest_NIC}
                      </StyledTableCell>
                      <StyledTableCell>
                        {apartflowtesting.arrival_date.slice(0,10)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {apartflowtesting.check_In}
                      </StyledTableCell>
                      <StyledTableCell>
                        {apartflowtesting.check_Out}
                      </StyledTableCell>
                      <StyledTableCell>{apartflowtesting.checkin_Time}</StyledTableCell>
                      <StyledTableCell>{apartflowtesting.checkout_Time}</StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: "flex",
                          gap: "0.3rem",
                        }}
                      >
                        <EditButton //front end route edit
                          route={`/guests/updateGuest/${[
                            apartflowtesting.guest_ID,
                          ]}`}
                          onClick={() =>
                            handleEdit([apartflowtesting.guest_ID])
                          }
                        />
                        <DeleteButton
                          onClick={() =>
                            onClickRowDelete(apartflowtesting.guest_ID)
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
                    {"Delete Guest Details"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(guest_ID)} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
          </Table>
        </InfiniteScroll>


      </TableContainer>
    </div>
  );
}

export default GuestTable;
