import React, { useEffect, useState } from "react";
import "./ResidentsPayments.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "../../../Component/SearchBar/SearchBar";
import AddNewButton from "../../../Component/Buttons/AddNewButton";
import { Outlet, useOutlet } from "react-router-dom";
import Minibar from "../Mininavbar/Minibar";
import axiosInstance from "../../LoginPage/LoginServices/authService";
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


function ResidentsPayments() {
  const [paymentList, setPaymentList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const limit = 10;

  useEffect(() => {
    console.log("Payment use effect");
    getPaymentDetails(page, query);
  },[page, query]);

  const getPaymentDetails = async (page, query) => {
    // axiosInstance.get('/finance/getAllPayments')
    try {
      const endpoint = query
        ? `/finance/paymentSearch?query=${query}&page=${page}&limit=${limit}`
        : `/finance/getAllPayments?page=${page}&limit=${limit}`;
      
        const response = await axiosInstance.get(endpoint);
        let newRecords = response.data.result;
        if (Array.isArray(newRecords) && newRecords.length > 0 && Array.isArray(newRecords[0])) {
          newRecords = newRecords[0];
        }
        console.log(newRecords);
        if (page === 1) {
          setPaymentList(newRecords);
        } else {
          setPaymentList((prevRevenues) => [...prevRevenues, ...newRecords]);
        }
  
        if (newRecords.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        } 
    } catch (error) {
      console.error(error);
    }
  }
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const Filter = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    setPage(1);
    setPaymentList([]);
    setHasMore(true);
  };

  return (
    <div className="residentsPaymentsContainer">
      <Minibar />
        <div className="pageTop">
            <SearchBar onChange={Filter}/>
            <AddNewButton route="/finance/addNew"/>
        </div>
      <TableContainer component={Paper}>
      <InfiniteScroll
          dataLength={paymentList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
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
                <StyledTableCell align="center">#No</StyledTableCell>
                <StyledTableCell align="center">Payment ID</StyledTableCell>
                <StyledTableCell align="center">Unit ID</StyledTableCell>
                <StyledTableCell align="center">Resident Name</StyledTableCell>
                <StyledTableCell align="center">Method</StyledTableCell>
                <StyledTableCell align="center">Charge Type</StyledTableCell>
                <StyledTableCell align="center">
                  Payment Date
                </StyledTableCell>
                <StyledTableCell align="right">Amount(LKR.)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentList.map((Payments, index) => (
                <StyledTableRow key={Payments.payment_id}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{Payments.payment_id}</StyledTableCell>
                  <StyledTableCell align="center">{Payments.unit_id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {Payments.name_with_initials}
                  </StyledTableCell>
                  <StyledTableCell align="center">{Payments.method}</StyledTableCell>
                  <StyledTableCell align="center">{Payments.charge_type}</StyledTableCell>
                  <StyledTableCell align="center">
                    {Payments.payment_date ? Payments.payment_date.slice(0, 10) : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{Payments.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer> 
    </div>
  );
}

export default ResidentsPayments;
