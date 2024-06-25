import React, { useEffect, useState } from "react";
import "./Expenses.css";
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
import EditButton from "../../../Component/Buttons/EditButton";
import Minibar from "../Mininavbar/Minibar";
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

function Expenses() {
  const [expenseslist, setExpenseslist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    console.log("frontend use effect");
    getExpensesDetails();
  }, []);

  // Get the data from the backend to front end

  const getExpensesDetails = () => {
    axios
      .get("http://localhost:3001/finance/expenses")
      .then((response) => {
        console.log("CALLED");
        console.log(response);
        setExpenseslist(response.data.result);
        setRecords(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the edit button
  const handleEdit = (id) => {
    console.log("Hanlde Edit Before axios");
    axios
      .get(`http://localhost:3001/finance/updateExpenses/${id}`)
      .then((response) => {
        console.log("Hanlde Edit Called");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Search Bar Function

  const Filter = (event) => {
    const query = event.target.value.toLowerCase();
    setRecords(
      expenseslist.filter(
        (f) =>
          f.expense_id.toLowerCase().includes(query) ||
          f.amount.toString().toLowerCase().includes(query) ||
          f.eType.toLowerCase().includes(query) ||
          f.payment_method.toLowerCase().includes(query) ||
          f.staff_id.toLowerCase().includes(query) ||
          f.added_date.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="expensesContainer">
      <Minibar />
      <div className="pageTop">
        <SearchBar onChange={Filter} />
        <AddNewButton route="/finance/expenses/addExpense" />
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
          {/*---- Table Headings ----*/}

          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#No</StyledTableCell>
              <StyledTableCell align="center">Reference No</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Expense Type</StyledTableCell>
              <StyledTableCell align="center">Payment Method</StyledTableCell>
              <StyledTableCell align="left">Staff ID</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Remark</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          {/* ---- Table Data ---- */}

          <TableBody>
            {records.map((Expenses, index) => (
              <StyledTableRow key={Expenses.id}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {Expenses.expense_id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Expenses.amount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Expenses.eType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Expenses.payment_method}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Expenses.staff_id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Expenses.added_date.slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Expenses.remark}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <EditButton
                    route={`/finance/expenses/updateExpenses/${Expenses.id}`}
                    onClick={() => handleEdit(Expenses.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Expenses;
