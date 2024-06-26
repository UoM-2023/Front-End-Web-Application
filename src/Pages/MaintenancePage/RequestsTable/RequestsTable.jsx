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
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneSwitch from "../../../Component/Switchs/DoneSwitch";
import InfiniteScroll from "react-infinite-scroll-component";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function RequestsTable() {
  const [mRequestList, setMRequestList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const limit = 10;

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

  useEffect(() => {
    console.log("frontend use effect");
    getMaintenanceRequestDetails(page, query);
  }, [page, query]);

  // Get the data from the backend to front end

  const getMaintenanceRequestDetails = async (page, query) => {
    try {
      const endpoint = query
        ? `/maintenance/New_Mnt_Req_search?query=${query}&page=${page}&limit=${limit}`
        : `/maintenance/New_Mnt_Req?page=${page}&limit=${limit}`;
      const response = await axiosInstance.get(endpoint);
      const newRecords = response.data.result;
      if (page === 1) {
        setMRequestList(newRecords);
        setRecords(newRecords);
      } else {
        setMRequestList((prevRevenues) => [...prevRevenues, ...newRecords]);
        setRecords((prevRevenues) => [...prevRevenues, ...newRecords]);
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

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const Filter = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    setPage(1);
    setMRequestList([]);
    setRecords([]);
    setHasMore(true);
  };

  // Handling the edit button
  const handleEdit = (id) => {
    console.log("Hanlde Edit Before axios");
    axiosInstance
      .get(`/maintenance/New_Mnt_Req/${id}`)
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
      .delete(`/maintenance/New_Mnt_Req/${id}`)
      .then((response) => {
        console.log("Hanlde Delete Called");
        setPage(1);
        setMRequestList([]);
        setRecords([]);
        setHasMore(true);
        getMaintenanceRequestDetails(1, query);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    setMRequestList((prevList) =>
      prevList.map((request) =>
        request.id === id ? { ...request, Mnt_Status: newStatus } : request
      )
    );
  };

  return (
    <div className="requestsTableContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/maintenance/newRequest" />
      </div>
      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={mRequestList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
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
                <StyledTableCell align="left">#No</StyledTableCell>
                <StyledTableCell align="left">Reference No</StyledTableCell>
                <StyledTableCell align="left">Unit ID</StyledTableCell>
                <StyledTableCell align="left">Maintenance Type</StyledTableCell>
                <StyledTableCell align="left">Requested Date</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((mRequests, index) => (
                <StyledTableRow key={mRequests.id}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {mRequests.Mnt_Request_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {mRequests.Unit_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {mRequests.MType}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {mRequests.requested_date.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {mRequests.M_Description}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {mRequests.Mnt_Status}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      gap: "0.3rem",
                    }}
                  >
                    <EditButton
                      route={`/maintenance/updateRequest/${[mRequests.id]}`}
                      onClick={() => handleEdit([mRequests.id])}
                    />
                    <DeleteButton
                      onClick={() => onClickRowDelete(mRequests.id)}
                    />
                    <DoneSwitch
                      id={mRequests.id}
                      status={mRequests.Mnt_Status}
                      onStatusChange={handleStatusChange}
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
                    {"Delete Maintenance Request"}
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
        </InfiniteScroll>
      </TableContainer>
    </div>
  );
}

export default RequestsTable;
