import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionContainer = styled("div")({
  display: "flex",
  // justifyContent: 'space-between',
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  // gap: '8px',  // Adjust the gap as needed
});

function ResidentialUnitsTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Unit_id, setUnit_id] = useState("");
  const [records, setRecords] = useState([]);

  const onClickRowDelete = (rowid) => {
    setUnit_id(rowid);
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

  // Get the data from the backend to front end

  const fetchData = () => {
    axiosInstance
      .get("/residentialUnits/addNewUnit")
      .then((response) => {
        if (response.data && Array.isArray(response.data.units)) {
          setRows(response.data.units);
          setRecords(response.data.units);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  // Handling the edit button

  const handleEdit = (Unit_id) => {
    console.log("Hanlde Edit Function Before axios");
    axiosInstance
      .get(`/residentialUnits/addNewUnit/${Unit_id}`)
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handling the Delete button

  const handleDelete = (Unit_id) => {
    axiosInstance
      .delete(`/residentialUnits/addNewUnit/${[Unit_id]}`)
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
      rows.filter(
        (f) =>
          f.staffID.toLowerCase().includes(query) ||
          f.name_with_initials.toLowerCase().includes(query) ||
          f.nic.toLowerCase().includes(query) ||
          f.staff_category.toLowerCase().includes(query) ||
          f.mobile_no.toLowerCase().includes(query) ||
          f.email.toLowerCase().includes(query) ||
          f.city.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="residentialUnitsContainer">
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/residential units/residentialUnitsForm" />
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
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Block</StyledTableCell>
              <StyledTableCell align="left">Building</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <StyledTableRow key={row.Unit_id}>
                <StyledTableCell align="left">{row.Unit_id}</StyledTableCell>
                <StyledTableCell align="left">{row.Block_no}</StyledTableCell>
                <StyledTableCell align="left">{row.Building}</StyledTableCell>
                <StyledTableCell align="left">{row.Category}</StyledTableCell>
                <StyledTableCell align="left">{row.RStatus}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    gap: "0.3rem",
                  }}
                >
                  <EditButton //front end route edit
                    route={`/residential units/UpdateresidentialUnits/${[
                      row.Unit_id,
                    ]}`}
                    onClick={() => handleEdit([row.Unit_id])}
                  />
                  <DeleteButton onClick={() => onClickRowDelete(row.Unit_id)} />
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
                  {"Delete Unit Details"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(Unit_id)} autoFocus>
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

export default ResidentialUnitsTable;
