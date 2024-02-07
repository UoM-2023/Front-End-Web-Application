// export default function ReservationTable() {

    import * as React from "react";
    import "./reservationtable.css"
    import { styled } from "@mui/material/styles";
    import Table from "@mui/material/Table";
    import TableBody from "@mui/material/TableBody";
    import TableCell, { tableCellClasses } from "@mui/material/TableCell";
    import TableContainer from "@mui/material/TableContainer";
    import TableHead from "@mui/material/TableHead";
    import TableRow from "@mui/material/TableRow";
    import Paper from "@mui/material/Paper";
    import EditButton from "../../Component/Buttons/EditButton";
    import DeleteButton from "../../Component/Buttons/DeleteButton";
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
    
    function createData(ReferenceNumber, Name, FacilityName, RequstedDate, StartDate, EndDate, PaymentStatus, Status,  action) {
      return { ReferenceNumber, Name, FacilityName, RequstedDate, StartDate, EndDate, PaymentStatus, Status,  action };
    }
    
   
    const rows = [
      createData(
        "W764783",
        "James Thomas",
        "Event Hall",
        "22/06/2022",
        "23/06/2022",
        "24/06/2022",
        "Paid",
        "Reserved",
        
        <div className="actionBtn">

          <EditButton />
          &nbsp; &nbsp;
          <DeleteButton />
        </div>
      ),
      createData(
        "E764583",
        "Cane Electricians",
        "Event Hall",
        "22/06/2022",
        "25/06/2022",
        "29/06/2022",
        "Paid",
        "Reserved",
       
        <div className="actionBtn">

          <EditButton />
          &nbsp; &nbsp;
          <DeleteButton />
        </div>
      ),
      createData(
        "G345678",
        "Patrick Stefans",
        "Gym",
        "22/06/2022",
        "27/06/2022",
        "28/06/2022",
        "Paid",
        "Not Yet",
       
        <div className="actionBtn">

          <EditButton />
          &nbsp; &nbsp;
          <DeleteButton />
        </div>
      ),
      
     
    ];
    
    function ReservationTable() {
      return (
        
        <div className="GuestTableContainer">
    <div className="title">
          <h1>Reservation</h1>
    </div>
      <hr class="custom-hr"></hr>
          <TableContainer component={Paper}>
            <Table
              sx={{
                maxWidth: "95vw",
                marginTop: 5,
                marginLeft: 9,
                marginRight: 0,
                paddingTop: "100px",
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Reference Number</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Facility Name</StyledTableCell>
                  <StyledTableCell align="left">Requsted Date</StyledTableCell>
                  <StyledTableCell align="left">Start Date</StyledTableCell>
                  <StyledTableCell align="left">End Date</StyledTableCell>
                  <StyledTableCell align="left">Payment Status</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">{row.ReferenceNumber}</StyledTableCell>
                    <StyledTableCell align="left">{row.Name}</StyledTableCell>
                    <StyledTableCell align="left">{row.FacilityName}</StyledTableCell>
                    <StyledTableCell align="left">{row.RequstedDate}</StyledTableCell>
                    <StyledTableCell align="left">{row.StartDate}</StyledTableCell>
                    <StyledTableCell align="left">{row.EndDate}</StyledTableCell>
                    <StyledTableCell align="left">{row.PaymentStatus}</StyledTableCell>
                    <StyledTableCell align="left">{row.Status}</StyledTableCell>
                    <StyledTableCell align="left">{row.action}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
    
    export default ReservationTable;
    