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

function createData(Unit, ResidentName, GuestName, VehicleNo, GuestNIC, Checkedin, CheckedOut, action) {
  return { Unit, ResidentName, GuestName, VehicleNo, GuestNIC, Checkedin, CheckedOut, action };
}


// const rows = [
//   createData(
//     "A-102",
//     "Miller Donald",
//     "Tom Archer",
//     "WP 1967",
//     "9073665677",
//     "23/11/2023",
//     "09:00 AM",
//     "23/11/2023",
//     "04:30 PM",
//     <div className="actionBtn">

//       <EditButton />
//       &nbsp; &nbsp;
//       <DeleteButton />
//     </div>
//   ),
//   createData(
//     "A-103",
//     "Edward Young",
//     "Saam Nechol",
//     "-",
//     "8765565765",
//     "24/11/2023",
//     "",
//     "",
//     "",
//     <div className="actionBtn">

//       <EditButton />
//       &nbsp; &nbsp;
//       <DeleteButton />
//     </div>
//   ),
//   createData(
//     "A-104",
//     "Maily Cooper",
//     "Saly Peterson",
//     "-",
//     "9976565654",
//     "24/11/2023",
//     "",
//     "",
//     "",
//     <div className="actionBtn">

//       <EditButton />
//       &nbsp; &nbsp;
//       <DeleteButton />
//     </div>
//   ),


// ];

function GuestTable() {

const [guestlist,setGuestlist] =React.useState([]);
  React.useEffect(() => {
    console.log("use effect ");
    axios
      .get("http://localhost:3001/guest/GuestDetails")
      .then((response) => {
        // Handle successful response
        setGuestlist(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  }, []);

  return (

    <div className="GuestTableContainer">


      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/guests/addNew" />
      </div>


      {/* <div className="AddNewButton1">
      <span className="AddNewButton"><AddNewButton/></span>
      
      </div> */}
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
              <StyledTableCell align="left">Unit</StyledTableCell>
              <StyledTableCell align="left">Resident Name</StyledTableCell>
              <StyledTableCell align="left">Guest Name</StyledTableCell>
              <StyledTableCell align="left">Vehicle No</StyledTableCell>
              <StyledTableCell align="left">Guest NIC</StyledTableCell>
              <StyledTableCell align="left">Checked in </StyledTableCell>
              <StyledTableCell align="left">Checked Out </StyledTableCell>
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
            {guestlist.map((row) => (
              <StyledTableRow key={row.Unit_ID}>
                <StyledTableCell align="left">{row.Unit_ID}</StyledTableCell>
                <StyledTableCell align="left">{row.Resident_Name}</StyledTableCell>
                <StyledTableCell align="left">{row.Guest_Name}</StyledTableCell>
                <StyledTableCell align="left">{row.Vehicle_Number}</StyledTableCell>
                <StyledTableCell align="left">{row.GuestNIC}</StyledTableCell>
                <StyledTableCell align="left">{row.Arrival_Date}</StyledTableCell>
                <StyledTableCell align="left">{row.Checkedin}</StyledTableCell>
                <StyledTableCell align="left">{row.CheckedOut}</StyledTableCell>
                <StyledTableCell align="left">    <div className="actionBtn">

<EditButton />
&nbsp; &nbsp;
<DeleteButton />
</div></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GuestTable;
