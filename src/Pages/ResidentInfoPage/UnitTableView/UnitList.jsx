// import * as React from "react";
// import "./UnitList.css";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import ViewButton from "../../../Component/Buttons/ViewButton";
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

// function UnitList() {
//   const [residentlist, setResidentlist] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [residentID, setResidentID] = useState("");
//   const [records, setRecords] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [query, setQuery] = useState("");
//   const limit = 10;

//   const onClickRowDelete = (rowid) => {
//     setResidentID(rowid);
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
//     getResidentDetails(page, query);
//   }, [page, query]);

//   // Get the data from the backend to front end
//   const getResidentDetails = async (page, query) => {
//     // axios
//     //   .get("http://localhost:3001/residentsDetails/addNewResident")
//     //   .then((response) => {
//     //     console.log(" get all Resident func CALLED");
//     //     console.log(response);
//     //     setResidentlist(response.data.result);
//     //     setRecords(response.data.result);
//     //   })
//     //   .catch((error) => console.log(error));
//     try{
//       const endpoint = query 
//         ? `http://localhost:3001/residentsDetails/searchResident?query=${query}&page=${page}&limit=${limit}`
//         : `http://localhost:3001/residentsDetails/addNewResident?page=${page}&limit=${limit}`;
      
//         const response = await axios.get(endpoint);
//         const newRecords = response.data.result;

//         if (page === 1) {
//           setResidentlist(newRecords);
//         } else {
//           setResidentlist((prevRevenues) => [...prevRevenues, ...newRecords]);
//         }
  
//         if (newRecords.length < limit) {
//           setHasMore(false);
//         } else {
//           setHasMore(true);
//         }

//     } catch (error){
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
//     setResidentlist([]);
//     setHasMore(true);
//   };


//   // Handling the edit button
//   const handleEdit = (residentID) => {
//     console.log("Hanlde Edit Before axios");
//     axios
//       .get(
//         `http://localhost:3001/residentsDetails/addNewResident/updateResident/${residentID}`
//       )
//       .then((response) => {
//         console.log("Hanlde Edit Called........");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Handling the View button
//   const handleView = (UnitID) => {
//     console.log("Hanlde Edit Before axios");
//     axios
//       .get(`http://localhost:3001/residentsDetails/viewResident/${UnitID}`)
//       .then((response) => {
//         console.log("Hanlde View Called........");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Handling the Delete button
//   const handleDelete = (residentID) => {
//     axios
//       .delete(
//         `http://localhost:3001/residentsDetails/addNewResident/deleteResident/${[
//           residentID,
//         ]}`
//       )
//       .then((response) => {
//         console.log("---Hanlde Delete Called---");
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
//         <AddNewButton route="/residents information/addNewResident" />
//       </div>
//       <TableContainer component={Paper}>
//       <InfiniteScroll
//           dataLength={residentlist.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           loader={<h4>Loading...</h4>}
//         >
//           <Table
//             sx={{
//               maxWidth: "94.5vw",
//               marginTop: 5,
//               marginLeft: 9,
//               marginRight: 0,
//               paddingTop: "100px",
//             }}
//             aria-label="customized table"
//           >
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="left">Resident ID</StyledTableCell>
//                 <StyledTableCell align="left">Name</StyledTableCell>
//                 <StyledTableCell align="left">Unit ID</StyledTableCell>
//                 <StyledTableCell align="left">Type</StyledTableCell>
//                 <StyledTableCell align="left">NIC</StyledTableCell>
//                 <StyledTableCell align="left">Address</StyledTableCell>
//                 <StyledTableCell align="left">Mobile No</StyledTableCell>
//                 <StyledTableCell align="left">Email</StyledTableCell>
//                 <StyledTableCell align="left">Action</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {records &&
//                 records.map((apartflowtesting, index) => {
//                   return (
//                     <StyledTableRow key={index}>
//                       <StyledTableCell>
//                         {apartflowtesting.residentID}
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.name_with_initials}
//                       </StyledTableCell>
//                       <StyledTableCell>{apartflowtesting.UnitID}</StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.member_type}
//                       </StyledTableCell>
//                       <StyledTableCell>{apartflowtesting.nic}</StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.Address}
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {apartflowtesting.mobile_no}
//                       </StyledTableCell>
//                       <StyledTableCell>{apartflowtesting.email}</StyledTableCell>
//                       <StyledTableCell
//                         sx={{
//                           display: "flex",
//                           gap: "0.3rem",
//                         }}
//                       >
//                         <ViewButton
//                           route={`/residents information/viewResident/${[
//                             apartflowtesting.UnitID,
//                           ]}`}
//                           onClick={() => handleView([apartflowtesting.UnitID])}
//                         />
//                         <EditButton
//                           route={`/residents information/updateResident/${[
//                             apartflowtesting.residentID,
//                           ]}`}
//                           onClick={() =>
//                             handleEdit([apartflowtesting.residentID])
//                           }
//                         />
//                         <DeleteButton
//                           onClick={() =>
//                             onClickRowDelete(apartflowtesting.residentID)
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
//                     {"Delete Resident Details"}
//                   </DialogTitle>
//                   <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                       Are you sure you want to delete this?
//                     </DialogContentText>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleClose}>No</Button>
//                     <Button onClick={() => handleDelete(residentID)} autoFocus>
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

// export default UnitList;

import * as React from "react";
import "./UnitList.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewButton from "../../../Component/Buttons/ViewButton";
import EditButton from "../../../Component/Buttons/EditButton";
import DeleteButton from "../../../Component/Buttons/DeleteButton";
import SearchBar from "../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../Component/Buttons/AddNewButton";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function UnitList() {
  const [residentlist, setResidentlist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [residentID, setResidentID] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const limit = 10;

  const onClickRowDelete = (rowid) => {
    setResidentID(rowid);
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
    getResidentDetails(page, query);
  }, [page, query]);

  // Get the data from the backend to front end
  const getResidentDetails = async (page, query) => {
    try {
      const endpoint = query 
        ? `http://localhost:3001/residentsDetails/searchResident?query=${query}&page=${page}&limit=${limit}`
        : `http://localhost:3001/residentsDetails/addNewResident?page=${page}&limit=${limit}`;
      
      const response = await axios.get(endpoint);
      const newRecords = response.data.result;

      if (page === 1) {
        setResidentlist(newRecords);
      } else {
        setResidentlist((prevRevenues) => [...prevRevenues, ...newRecords]);
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
    setResidentlist([]);
    setHasMore(true);
  };

  // Handling the edit button
  const handleEdit = (residentID) => {
    console.log("Handle Edit Before axios");
    axios
      .get(
        `http://localhost:3001/residentsDetails/addNewResident/updateResident/${residentID}`
      )
      .then((response) => {
        console.log("Handle Edit Called........");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the View button
  const handleView = (UnitID) => {
    console.log("Handle View Before axios");
    axios
      .get(`http://localhost:3001/residentsDetails/viewResident/${UnitID}`)
      .then((response) => {
        console.log("Handle View Called........");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button
  const handleDelete = (residentID) => {
    axios
      .delete(
        `http://localhost:3001/residentsDetails/addNewResident/deleteResident/${residentID}`
      )
      .then((response) => {
        console.log("---Handle Delete Called---");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="unitListContainer">
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/residents information/addNewResident" />
      </div>
      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={residentlist.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Table
            sx={{
              maxWidth: "94.5vw",
              marginTop: 5,
              marginLeft: 9,
              marginRight: 0,
              paddingTop: "100px",
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Resident ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Unit ID</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">NIC</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left">Mobile No</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residentlist.map((apartflowtesting, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{apartflowtesting.residentID}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.name_with_initials}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.UnitID}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.member_type}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.nic}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.Address}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.mobile_no}</StyledTableCell>
                  <StyledTableCell>{apartflowtesting.email}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      gap: "0.3rem",
                    }}
                  >
                    <ViewButton
                      route={`/residents information/viewResident/${apartflowtesting.UnitID}`}
                      onClick={() => handleView(apartflowtesting.UnitID)}
                    />
                    <EditButton
                      route={`/residents information/updateResident/${apartflowtesting.residentID}`}
                      onClick={() => handleEdit(apartflowtesting.residentID)}
                    />
                    <DeleteButton
                      onClick={() => onClickRowDelete(apartflowtesting.residentID)}
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
                    {"Delete Resident Details"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(residentID)} autoFocus>
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

export default UnitList;

