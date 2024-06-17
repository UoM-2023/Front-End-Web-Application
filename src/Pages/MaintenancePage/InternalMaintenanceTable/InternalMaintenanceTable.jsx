import * as React from "react";
import "./InternalMaintenanceTable.css";
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
import Minibar from "../mininavbar/minibar.maintenance";
import axios from "axios";
import { useState, useEffect } from "react";

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



function InternalMaintenanceTable() {
  const [Internal_Maintenance, Set_Internal_Maintenance] = useState([]);

  useEffect(() => {
    console.log("frontend use effect");
    get_Internal_MaintenanceData();
  }, []);

  //get the data from backend to frontend

  const get_Internal_MaintenanceData = () => {
    axios
      .get("http://localhost:3001/maintenance/Internal_Mnt_Req")
      .then((response) => {
        console.log("called.....");
        console.log(response);
        Set_Internal_Maintenance(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="internalMaintenanceTableContainer">
      <Minibar />  
      <div className="pageTop">
        <SearchBar />
        <AddNewButton route="/maintenance/internal/addNew"/>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            maxWidth: "92.5vw",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 0,
            paddingTop: "1rem",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {/* <StyledTableCell align="left">#No</StyledTableCell> */}
              <StyledTableCell align="left">Reference No</StyledTableCell>
              <StyledTableCell align="left">Maintenance</StyledTableCell>
              <StyledTableCell align="left">Service Provider</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Requested Date</StyledTableCell>
              <StyledTableCell align="left">Completed Date</StyledTableCell>
              <StyledTableCell align="left">Payment Status</StyledTableCell>
              <StyledTableCell align="left">Payment ID</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {Internal_Maintenance &&
            Internal_Maintenance.map((ApartFlowTesting, index) => (
              <StyledTableRow key={ApartFlowTesting.name}>
                {/* <StyledTableCell align="left">{ApartFlowTesting.no}</StyledTableCell> */}
                <StyledTableCell >
                  {ApartFlowTesting.Internal_Mnt_Request_id}
                </StyledTableCell>
                <StyledTableCell >{ApartFlowTesting.Maintenance}</StyledTableCell>
                <StyledTableCell >
                  {ApartFlowTesting.ServiceProvider}
                </StyledTableCell>
                <StyledTableCell >
                  {ApartFlowTesting.MobileNo}
                </StyledTableCell>
                <StyledTableCell >
                  {ApartFlowTesting.requested_date}
                </StyledTableCell>
                <StyledTableCell >{ApartFlowTesting.completed_date}</StyledTableCell>
                <StyledTableCell >{ApartFlowTesting.Payment_Status}</StyledTableCell>
                <StyledTableCell >{ApartFlowTesting.Internal_Mnt_Payment_id}</StyledTableCell>
                <StyledTableCell
                      sx={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <EditButton />
                      <DeleteButton
                        // onClick={() => onclickRowDelete(apartflowtesting.id)}
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

export default InternalMaintenanceTable;
