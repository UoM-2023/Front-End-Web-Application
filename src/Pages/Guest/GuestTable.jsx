import * as React from "react";
import "./guesttable.css"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewButton from "../../Component/Buttons/ViewButton";
import EditButton from "../../Component/Buttons/EditButton";
import DeleteButton from "../../Component/Buttons/DeleteButton";
import AddNewButton from "../../Component/Buttons/AddNewButton";
import SearchBar from "../../Component/SearchBar/SearchBar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
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



function GuestTable() {
  const [guestlist, setGuestlist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [guest_ID, setguest_ID] = useState("");



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
    getGuestDetails();
  }, []);

  // Get the data from the backend to front end

  const getGuestDetails = () => {
    axios
      .get("http://localhost:3001/GuestDetail/GuestDetails")
      .then((response) => {
        console.log("CALLED");
        console.log(response);
        setGuestlist(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the edit button (primary key)

  const handleEdit = (guest_ID) => {
    console.log("Hanlde Edit Before axios");
    axios
      .get(
        `http://localhost:3001/GuestDetail/GuestDetails/${guest_ID}`
      )
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button (primary key)

  const handleDelete = (guest_ID) => {
    axios
      .delete(
        `http://localhost:3001/GuestDetail/GuestDetails/${[
          guest_ID,
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



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////



  return (

    <div className="GuestTableContainer">


      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/guests/addNew" />
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
              <StyledTableCell align="left">Guest ID</StyledTableCell>
              <StyledTableCell align="left">Unit ID </StyledTableCell>
              <StyledTableCell align="left">Guest Name</StyledTableCell>
              <StyledTableCell align="left">Vehicle Num</StyledTableCell>
              <StyledTableCell align="left">Guest NIC </StyledTableCell>
              <StyledTableCell align="left">Check In </StyledTableCell>
              <StyledTableCell align="left">Check Out </StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.Unit}</StyledTableCell>
                <StyledTableCell align="left">{row.ResidentName}</StyledTableCell>
                <StyledTableCell align="left">{row.GuestName}</StyledTableCell>
                <StyledTableCell align="left">{row.VehicleNo}</StyledTableCell>
                <StyledTableCell align="left">{row.GuestNIC}</StyledTableCell>
                <StyledTableCell align="left">{row.CheckedinDate}</StyledTableCell>
                <StyledTableCell align="left">{row.CheckedinTime}</StyledTableCell>
                <StyledTableCell align="left">{row.CheckedOutDate}</StyledTableCell>
                <StyledTableCell align="left">{row.CheckedOutTime}</StyledTableCell>
                <StyledTableCell align="left">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody> */}
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
                    <StyledTableCell>
                      {apartflowtesting.guest_name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {apartflowtesting.vehicle_number}
                    </StyledTableCell>
                    <StyledTableCell>{apartflowtesting.guest_NIC}</StyledTableCell>
                    <StyledTableCell>{apartflowtesting.check_In}</StyledTableCell>
                    <StyledTableCell>{apartflowtesting.check_Out}</StyledTableCell>
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
                        onClick={() => handleEdit([apartflowtesting.guest_ID])}
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
        </Table>
      </TableContainer>
    </div>
  );
}

export default GuestTable;



















/////////////////////////////////////////////
//Table Body before Roouting

// {guestlist.map((row) => (
//   <StyledTableRow key={row.Unit_ID}>
//     <StyledTableCell align="left">{row.Unit_ID}</StyledTableCell>
//     <StyledTableCell align="left">{row.Resident_Name}</StyledTableCell>
//     <StyledTableCell align="left">{row.Guest_Name}</StyledTableCell>
//     <StyledTableCell align="left">{row.Vehicle_Number}</StyledTableCell>
//     <StyledTableCell align="left">{row.GuestNIC}</StyledTableCell>
//     <StyledTableCell align="left">{row.Arrival_Date}</StyledTableCell>
//     <StyledTableCell align="left">{row.Checkedin}</StyledTableCell>
//     <StyledTableCell align="left">{row.CheckedOut}</StyledTableCell>
//     <StyledTableCell align="left">    <div className="actionBtn">

// <EditButton />
// &nbsp; &nbsp;
// <DeleteButton />
// </div></StyledTableCell>
//   </StyledTableRow>
// ))}