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
import TopBar from "../../../Component/TopBar/TopBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

function ResidentialUnitsTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/residentialUnits/addNewUnit')
      .then(response => {
        if (response.data && Array.isArray(response.data.units)) {
          setRows(response.data.units);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleDelete = (Unit_id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios.delete(`http://localhost:3001/residentialUnits/addNewUnit/:id`)
        .then(res => {
          setRows(rows.filter(row => row.Unit_id !== Unit_id));
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className="residentialUnitsContainer">
      <TopBar title="Residential Units" />
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
          aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Unit</StyledTableCell>
              <StyledTableCell align="left">Block</StyledTableCell>
              <StyledTableCell align="left">Building</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Resident Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Unit_id}>
                <StyledTableCell align="left">{row.Unit_id}</StyledTableCell>
                <StyledTableCell align="left">{row.Block_no}</StyledTableCell>
                <StyledTableCell align="left">{row.Building}</StyledTableCell>
                <StyledTableCell align="left">{row.Category}</StyledTableCell>
                <StyledTableCell align="left">{row.Resident_name}</StyledTableCell>
                <StyledTableCell align="left">{row.RStatus}</StyledTableCell>
                <StyledTableCell align="right">
                  <ActionContainer>
                    <EditButton />
                    &nbsp; &nbsp;
                    <DeleteButton onClick={e => handleDelete(row.Unit_id)}/>
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

export default ResidentialUnitsTable;
