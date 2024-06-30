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
import TopBar from "../../../../Component/TopBar/TopBar";
import axios from 'axios';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#f9f4f0",
//     color: "#605D5D",
//     fontSize: "16px",
//     fontWeight: "bold",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(even)": {
//     backgroundColor: "#ECE1D9",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(
//   event,
//   place,
//   sDate,
//   eDate,
//   description,
//   action,
// ) {
//   return {
//     event,
//     place,
//     sDate,
//     eDate,
//     description,
//     action,
//   };
// }

// const rows = [
//   createData(
//    'Blood Donation','Event Hall','20/10/2022','23/10/2022','sffbgbb',
//     <div className="actionBtn">
//       <EditButton />
//       &nbsp; &nbsp;
//       <DeleteButton />
//     </div>
//   ),
//   createData(
//     'Christmas Party','Event Hall','22/10/2022','22/10/2022','worlKNWIONV',
//     <div className="actionBtn">
//       <EditButton />
//       &nbsp; &nbsp;
//       <DeleteButton />
//     </div>
//   ),
//   createData(
//     'Creative Week','Common Area','20/10/2023','24/10/2023','ebvowvovouv',
//     <div className="actionBtn">
//       <EditButton />
//       &nbsp; &nbsp;
//       <DeleteButton />
//     </div>
//   ),
// ];

// function EventsTable() {
//   const navigate = useNavigate();
//   return (
//     <div className="eventsTableContainer">
//         <TopBar title="News & Notices" />
//       <MiniNavBar/>
//       <div className="pageTop">
//         <SearchBar/>
//         <AddNewButton route="/eventsTable/eventsForm"/>
//       </div>
//       <TableContainer component={Paper}>
//         <Table
//           sx={{
//             maxWidth: "93.5vw",
//             marginTop: 5,
//             marginLeft: 10,
//             marginRight: 0,
//             paddingTop: "1rem",
//           }}
//           aria-label="customized table" 
//         >
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="left">Event</StyledTableCell>
//               <StyledTableCell align="left">Place</StyledTableCell>
//               <StyledTableCell align="left">Start Date</StyledTableCell>
//               <StyledTableCell align="left">End Date</StyledTableCell>
//               <StyledTableCell align="left">Description</StyledTableCell>
//               <StyledTableCell align="center">Action</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.u}>
//                 <StyledTableCell align="left">{row.event}</StyledTableCell>
//                 <StyledTableCell align="left">{row.place}</StyledTableCell>
//                 <StyledTableCell align="left">{row.sDate}</StyledTableCell>
//                 <StyledTableCell align="left">{row.eDate}</StyledTableCell>
//                 <StyledTableCell align="left">{row.description}</StyledTableCell>
//                 <StyledTableCell align="left">{row.action}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default EventsTable;





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

const ActionContainer = styled('div')({
  display: 'flex',
  // justifyContent: 'space-between',
  alignItems: 'right',
  // gap: '8px',  // Adjust the gap as needed
});

function EventsTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/newsNotices/newEvent')
      .then(response => {
        if (response.data && Array.isArray(response.data.result)) {
          setRows(response.data.result);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  return (
    <div className="eventsTableContainer">
      {/* <TopBar title="News & Notices" /> */}
      <MiniNavBar/>
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
          aria-label="customized table">
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
                <StyledTableCell align="left">{row.S_Date .slice(0,10)}</StyledTableCell>
                <StyledTableCell align="left">{row.E_Date .slice(0,10)}</StyledTableCell>
                <StyledTableCell align="left">{row.E_Description}</StyledTableCell>
                <StyledTableCell align="right">
                  <ActionContainer>
                    <EditButton />
                    &nbsp; &nbsp;
                    <DeleteButton/>
                  </ActionContainer>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EventsTable;

