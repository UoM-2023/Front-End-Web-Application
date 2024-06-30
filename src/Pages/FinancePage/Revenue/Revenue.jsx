import React, { useEffect, useState } from "react";
import "./Revenue.css";
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
import Minibar from "../Mininavbar/Minibar";
import axios from "axios";
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

function Revenue() {
  const [revenues, setRevenues] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const limit = 10;

  useEffect(() => {
    getRevenue(page, query);
  }, [page, query]);

  const getRevenue = async (page, query) => {
    try {
      const endpoint = query
        ? `http://localhost:3001/finance/revenue/search?query=${query}&page=${page}&limit=${limit}`
        : `http://localhost:3001/finance/revenue?page=${page}&limit=${limit}`;

      const response = await axios.get(endpoint);
      const newRecords = response.data.result;

      // Append new records to the existing revenues without duplicates
      if (page === 1) {
        setRevenues(newRecords);
      } else {
        setRevenues((prevRevenues) => [...prevRevenues, ...newRecords]);
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
    setRevenues([]);
    setHasMore(true);
  };

  return (
    <div className="revenueContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/finance/revenue/addRevenue" />
      </div>
      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={revenues.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>...</h4>}
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
                <StyledTableCell align="left">#No</StyledTableCell>
                <StyledTableCell align="left">Revenue ID</StyledTableCell>
                <StyledTableCell align="left">Paid By</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Payment Method</StyledTableCell>
                <StyledTableCell align="left">Staff ID</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {revenues.map((revenue, index) => (
                <StyledTableRow key={revenue.revenue_id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{revenue.revenue_id}</StyledTableCell>
                  <StyledTableCell>{revenue.paid_by}</StyledTableCell>
                  <StyledTableCell align="right">{revenue.amount}</StyledTableCell>
                  <StyledTableCell align="center">{revenue.rType}</StyledTableCell>
                  <StyledTableCell align="center">{revenue.payment_method}</StyledTableCell>
                  <StyledTableCell>{revenue.staff_id}</StyledTableCell>
                  <StyledTableCell>{revenue.added_date.slice(0, 10)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </div>
  );
}

export default Revenue;
