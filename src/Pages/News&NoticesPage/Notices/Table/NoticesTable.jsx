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
import {useNavigate } from "react-router-dom";
import MiniNavBar from "../../MiniNavBar/MiniNaveBar";
import TopBar from "../../../../Component/TopBar/TopBar";
import axios from 'axios';


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
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
  //gap: '8px',  // Adjust the gap as needed
  
});

function NoticesTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/newsNotices/newNotice')
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
    <div className="noticesTableContainer">
      <TopBar title="News & Notices" />
      <MiniNavBar/>
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
          aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Notice No</StyledTableCell>
              <StyledTableCell align="left">Notice Type</StyledTableCell>
              <StyledTableCell align="left">Notice Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Notice_no}>
                <StyledTableCell align="left">{row.Notice_no}</StyledTableCell>
                <StyledTableCell align="left">{row.N_Type}</StyledTableCell>
                <StyledTableCell align="left">{row.N_Title}</StyledTableCell>
                <StyledTableCell align="left">{row.N_Description}</StyledTableCell>
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

export default NoticesTable;
