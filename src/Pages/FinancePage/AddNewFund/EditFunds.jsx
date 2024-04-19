import React, { useEffect, useState } from "react";
import "./EditFunds.css";
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
import Minibar from "../Mininavbar/Minibar";
import axios from "axios";
import EditFundsAddNew from "./EditFundFrom/EditFundsAddNew";
import { useNavigate } from "react-router-dom";

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

function createData(
  no,
  fundID,
  fundName,
  chargedBy,
  amount,
  timePeriod,
  modifiedDate,
  modifiedBy,
  action
) {
  return {
    no,
    fundID,
    fundName,
    chargedBy,
    amount,
    timePeriod,
    modifiedDate,
    modifiedBy,
    action
  };
}

function EditFunds() {
  let no = 1;
  const navigate = useNavigate();
  const [fundTypes,setFundTypes] = useState([])
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    console.log("frontend use effect");
    getFundTypes()
  }, [])


// Get the data from the backend to front end
  const getFundTypes = () => {
    axios.get("http://localhost:3001/finance/editFunds").then( (response) => {
      console.log("Called");
      console.log(response);
      setFundTypes(response.data.result[0])
      // console.log(response.data.result[0].fund_id)

    }).catch( (error) => {
      console.log(error);
    })
  }

  // Handling the edit button
  const handleEdit = (editID) => {
    axios.get(`http://localhost:3001/finance/editFunds/${editID}`).then( (response) => {
      console.log("Called");
      console.log(response);
      navigate(`/finance/editFunds/newFund`)
      // setFormData(response.data.result[0])
    }).catch( (error) => {
      console.log(error);
    })
  }
  return (
    <div className="editFundsContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton route="/finance/editFunds/newFund"/>
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
          {/* Table Headings */}
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#No</StyledTableCell>
              <StyledTableCell align="center">Fund ID</StyledTableCell>
              <StyledTableCell align="center">Fund Name</StyledTableCell>
              <StyledTableCell align="center">Charged By</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Time Period</StyledTableCell>
              <StyledTableCell align="center">Modified Date</StyledTableCell>
              <StyledTableCell align="center">Modified By</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { fundTypes.map((fundType) => (
              <StyledTableRow key={fundType.fund_id}>
                {/* For the counting in first column */}
                <StyledTableCell align="center">{fundType.fund_id}</StyledTableCell>
                <StyledTableCell align="center">
                  {fundType.fund_id}
                </StyledTableCell>
                <StyledTableCell align="center">{fundType.fundName}</StyledTableCell>
                <StyledTableCell align="center">{fundType.chargedBy}</StyledTableCell>
                <StyledTableCell align="center">{fundType.amount}</StyledTableCell>
                <StyledTableCell align="center">
                  {fundType.timePeriod}
                </StyledTableCell>
                <StyledTableCell align="center">{fundType.modified_date.slice(0,10)}</StyledTableCell>
                <StyledTableCell align="center">
                  {fundType.modified_by}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center', gap:'1rem' }}>
                    <EditButton/>
                    <DeleteButton /> 
                </StyledTableCell>
              </StyledTableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <EditFundsAddNew formData={formData} /> */}
    </div>
  );
}

export default EditFunds;