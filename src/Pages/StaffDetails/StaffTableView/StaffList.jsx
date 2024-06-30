// import * as React from "react";
// import "./StaffList.css";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import EditButton from "../../../Component/Buttons/EditButton";
// import DeleteButton from "../../../Component/Buttons/DeleteButton";
// import SearchBar from "../../../Component/SearchBar/SearchBar";
// import AddNewButton from "../../../Component/Buttons/AddNewButton";
// import { useEffect } from "react";
// import axios from "axios";
// import { useState } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import InfiniteScroll from "react-infinite-scroll-component";

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

// function StaffList() {
//   const [stafflist, setStafflist] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [staffID, setStaffID] = useState("");
//   const [records, setRecords] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [query, setQuery] = useState("");
//   const limit = 10;

//   const onClickRowDelete = (rowid) => {
//     setStaffID(rowid);
//     handleClickOpen();
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     console.log("frontend use effect");
//     getStaffDetails(page, query);
//   }, [page, query]);

//   // Get the data from the backend to front end

//   const getStaffDetails = async (page, query) => {
//     // axios
//     //   .get("http://localhost:3001/staffDetails/addNewStaff")
//     //   .then((response) => {
//     //     console.log("CALLED");
//     //     console.log(response);
//     //     setStafflist(response.data.result);
//     //     setRecords(response.data.result);
//     //   })
//     //   .catch((error) => console.log(error));
//     try {
//       const endpoint = query 
//         ? `http://localhost:3001/staffDetails/searchStaff?query=${query}&page=${page}&limit=${limit}`
//         : `http://localhost:3001/staffDetails/addNewStaff?page=${page}&limit=${limit}`;
//       const response = await axios.get(endpoint);
//       const newRecords = response.data.result;

//       if (page === 1) {
//         setStafflist(newRecords);
//       } else {
//         setStafflist((prevRevenues) => [...prevRevenues, ...newRecords]);
//       }

//       if (newRecords.length < limit) {
//         setHasMore(false);
//       } else {
//         setHasMore(true);
//       }
//     } catch (error) {
//       console.error(error);
//     }

//   };

//   const fetchMoreData = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const Filter = (event) => {
//     const query = event.target.value.toLowerCase();
//     setQuery(query);
//     setPage(1);
//     setStafflist([]);
//     setHasMore(true);
//   };

//   // Handling the edit button 

//   const handleEdit = (staffID) => {
//     console.log("Hanlde Edit Before axios");
//     axios
//       .get(
//         `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${staffID}`
//       )
//       .then((response) => {
//         console.log("Hanlde Edit Called");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Handling the Delete button 

//   const handleDelete = (staffID) => {
//     axios
//       .delete(
//         `http://localhost:3001/staffDetails/addNewStaff/deleteStaff/${[
//           staffID,
//         ]}`
//       )
//       .then((response) => {
//         console.log("Hanlde Delete Called");
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };


//   return (
//     <div className="unitListContainer">
//       <div className="pageTop">
//         <SearchBar onChange={Filter} />
//         <AddNewButton route="/staff details/addNewStaff" />
//       </div>

//       {/* Staff Details Table */}

//       <TableContainer component={Paper}>
//       <InfiniteScroll
//           dataLength={stafflist.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           loader={<h4>Loading...</h4>}
//         >
//           <Table
//             sx={{
//               maxWidth: "93.5vw",
//               marginTop: 5,
//               marginLeft: 9.5,
//               marginRight: 0,
//               paddingTop: "100px",
//             }}
//             aria-label="customized table"
//           >
//             <TableHead>
//               <TableRow>
//                 {/* <StyledTableCell align="left">#No</StyledTableCell> */}
//                 <StyledTableCell align="left">Staff ID</StyledTableCell>
//                 <StyledTableCell align="left">Name</StyledTableCell>
//                 <StyledTableCell align="left">NIC</StyledTableCell>
//                 <StyledTableCell align="left">Staff Role</StyledTableCell>
//                 <StyledTableCell align="left">Mobile No</StyledTableCell>
//                 <StyledTableCell align="left">Email</StyledTableCell>
//                 <StyledTableCell align="left">City</StyledTableCell>
//                 <StyledTableCell align="left">Action</StyledTableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {records &&
//                 records.map((apartflowtesting, index) => {
//                   return (
//                     <StyledTableRow key={index}>
//                       <StyledTableCell>
//                         {apartflowtesting.staffID}
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.name_with_initials}
//                       </StyledTableCell>
//                       <StyledTableCell>{apartflowtesting.nic}</StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.staff_category}
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.mobile_no}
//                       </StyledTableCell>
//                       <StyledTableCell>{apartflowtesting.email}</StyledTableCell>
//                       <StyledTableCell>{apartflowtesting.city}</StyledTableCell>
//                       <StyledTableCell
//                         sx={{
//                           display: "flex",
//                           gap: "0.3rem",
//                         }}
//                       >
//                         <EditButton //front end route edit
//                           route={`/staff details/updateStaff/${[
//                             apartflowtesting.staffID,
//                           ]}`}
//                           onClick={() => handleEdit([apartflowtesting.staffID])}
//                         />
//                         <DeleteButton
//                           onClick={() =>
//                             onClickRowDelete(apartflowtesting.staffID)
//                           }
//                         />
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   );
//                 })}
//             </TableBody>

//             {/* Delete Button Dialog */}

//             <div className="Delete Dialog">
//               <React.Fragment>
//                 <Dialog
//                   open={open}
//                   onClose={handleClose}
//                   aria-labelledby="alert-dialog-title"
//                   aria-describedby="alert-dialog-description"
//                 >
//                   <DialogTitle id="alert-dialog-title">
//                     {"Delete staff member"}
//                   </DialogTitle>
//                   <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                       Are you sure you want to delete this?
//                     </DialogContentText>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleClose}>No</Button>
//                     <Button onClick={() => handleDelete(staffID)} autoFocus>
//                       Yes
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </React.Fragment>
//             </div>
//           </Table>
//         </InfiniteScroll>
//       </TableContainer>
//     </div>
//   );
// }

// export default StaffList;
import * as React from "react";
import "./StaffList.css";
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
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfiniteScroll from "react-infinite-scroll-component";
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

function StaffList() {
  const [stafflist, setStafflist] = useState([]);
  const [open, setOpen] = useState(false);
  const [staffID, setStaffID] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const limit = 10;

  const onClickRowDelete = (rowid) => {
    setStaffID(rowid);
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
    getStaffDetails(page, query);
  }, [page, query]);

  const getStaffDetails = async (page, query) => {
    try {
      const endpoint = query 
        ? `http://localhost:3001/staffDetails/searchStaff?query=${query}&page=${page}&limit=${limit}`
        : `http://localhost:3001/staffDetails/addNewStaff?page=${page}&limit=${limit}`;
      const response = await axios.get(endpoint);
      const newRecords = response.data.result;

      if (page === 1) {
        setStafflist(newRecords);
      } else {
        setStafflist((prevStafflist) => [...prevStafflist, ...newRecords]);
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
    setStafflist([]);
    setHasMore(true);
  };

  const handleEdit = (staffID) => {
    axios
      .get(`http://localhost:3001/staffDetails/addNewStaff/updateStaff/${staffID}`)
      .then((response) => {
        console.log("Handle Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (staffID) => {
    axios
      .delete(`http://localhost:3001/staffDetails/addNewStaff/deleteStaff/${staffID}`)
      .then((response) => {
        console.log("Handle Delete Called");
        setPage(1);
        setStafflist([]);
        setHasMore(true);
        getStaffDetails(1, query);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="unitListContainer">
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/staff details/addNewStaff" />
      </div>

      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={stafflist.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Table
            sx={{
              maxWidth: "93.5vw",
              marginTop: 5,
              marginLeft: 9.5,
              marginRight: 0,
              paddingTop: "100px",
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Staff ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">NIC</StyledTableCell>
                <StyledTableCell align="left">Staff Role</StyledTableCell>
                <StyledTableCell align="left">Mobile No</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">City</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {stafflist &&
                stafflist.map((staff, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{staff.staffID}</StyledTableCell>
                    <StyledTableCell>{staff.name_with_initials}</StyledTableCell>
                    <StyledTableCell>{staff.nic}</StyledTableCell>
                    <StyledTableCell>{staff.staff_category}</StyledTableCell>
                    <StyledTableCell>{staff.mobile_no}</StyledTableCell>
                    <StyledTableCell>{staff.email}</StyledTableCell>
                    <StyledTableCell>{staff.city}</StyledTableCell>
                    <StyledTableCell
                      sx={{ display: "flex", gap: "0.3rem" }}
                    >
                      <EditButton
                        route={`/staff details/updateStaff/${staff.staffID}`}
                        onClick={() => handleEdit(staff.staffID)}
                      />
                      <DeleteButton
                        onClick={() => onClickRowDelete(staff.staffID)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete staff member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete(staffID)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StaffList;


