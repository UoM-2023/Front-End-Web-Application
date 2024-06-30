import React, { useEffect, useState } from "react";
import "./NoticesTable.css";
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
import { useNavigate } from "react-router-dom";
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
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  //gap: '8px',  // Adjust the gap as needed
});

function NoticesTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Notice_no, setNotice_no] = useState("");

  const onClickRowDelete = (rowid) => {
    setNotice_no(rowid);
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
      .get("/newsNotices/newNotice")
      .then((response) => {
        if (response.data && Array.isArray(response.data.result)) {
          setRows(response.data.result);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  // Handling the Delete button

  const handleDelete = (Notice_no) => {
    axiosInstance
      .delete(`/newsNotices/newNotice/${[Notice_no]}`)
      .then((response) => {
        console.log("Hanlde Delete Called");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="noticesTableContainer">
      <MiniNavBar />
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/news & notices/noticesForm" />
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
              <StyledTableCell align="left">#No</StyledTableCell>
              <StyledTableCell align="left">Notice No</StyledTableCell>
              <StyledTableCell align="left">Notice Type</StyledTableCell>
              <StyledTableCell align="left">Notice Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Added Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">{row.Notice_no}</StyledTableCell>
                <StyledTableCell align="left">{row.N_Type}</StyledTableCell>
                <StyledTableCell align="left">{row.N_Title}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.N_Description}
                </StyledTableCell>
                <StyledTableCell align="left">{row.N_Date .slice(0,10)}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    gap: "0.3rem",
                  }}
                >
                  <DeleteButton
                    onClick={() => onClickRowDelete(row.Notice_no)}
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
                  {"Delete Notice"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(Notice_no)} autoFocus>
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

export default NoticesTable;
