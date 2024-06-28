import React, { useEffect, useState } from "react";
import "./Warning.css";
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
import axiosInstance from "../../LoginPage/LoginServices/authService";
import SendWarning from "../../../Component/Buttons/SendWarningButton";

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


function Balance() {
  const [balanceList, setBalanceList] = useState([]);

  useEffect(() => {
    console.log("Balance use effect");
    getBalanceDetails();
  },[]);

  const getBalanceDetails = () => {
    axiosInstance.get('/finance/getAllBalance')
    .then((response) => {
      console.log("response:",response);
      setBalanceList(response.data.result[0]);
    })
    .catch((error) => {
      console.log("Error fetching payment data: ", error);
    })
  }

  const handleWarning = (id) => {
    console.log("Id: ",id);
    axiosInstance.post('/finance/sendPaymentWarning',{
      unit_id: id,
      message: 'Your payments are delayed'
    }).then((response) => {
      console.log("Warning Sent Successfully");
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="utilityChargesContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar/>
        <AddNewButton/>
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
              <StyledTableCell align="left">Unit ID</StyledTableCell>
              <StyledTableCell align="left">Owner Name</StyledTableCell>
              <StyledTableCell align="left">Utility Balance</StyledTableCell>
              <StyledTableCell align="left">Sinking Balance</StyledTableCell>
              <StyledTableCell align="left">Management Balance</StyledTableCell>
              <StyledTableCell align="left">Total Balance</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceList.map((Balances, index) => (
              <StyledTableRow key={Balances.unit_id}>
                <StyledTableCell align="left">{index+1}</StyledTableCell>
                <StyledTableCell align="left">
                  {Balances.unit_id}
                </StyledTableCell>
                <StyledTableCell align="left">{Balances.name_with_initials}</StyledTableCell>
                <StyledTableCell align="left">{Balances.utility_balance}</StyledTableCell>
                <StyledTableCell align="left">{Balances.sinking_balance}</StyledTableCell>
                <StyledTableCell align="left">
                  {Balances.management_balance}
                </StyledTableCell>
                <StyledTableCell align="center">{Balances.utility_balance + Balances.sinking_balance + Balances.management_balance}</StyledTableCell>
                <StyledTableCell 
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}  
                >
                  <SendWarning onClick={() => handleWarning(Balances.unit_id)}/>
                </StyledTableCell>
                
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Balance;