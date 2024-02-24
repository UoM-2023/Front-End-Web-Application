import React from "react";
import "./MemberList.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { tableCellClasses } from "@mui/material/TableCell";
import BackButton from "../../../Component/Buttons/BackButton";
import SearchBar from "../../../Component/SearchBar/SearchBar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f9f4f0",
    color: "#605D5D",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "0.4rem",
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
  "& > td": {
    padding: "0.5rem", // Adjust the padding as needed
  },
  margin: "1rem", // Adjust the margin as needed
}));

function createData(item, details) {
  return { item, details };
}
function createData2(no, residentID, name, gender, mobileNo, nic, photo) {
  return { no, residentID, name, gender, mobileNo, nic, photo };
}

const rows = [
  createData("Name", "W.M.N.Sunil Silva"),
  createData("Mobile", "0711125896"),
  createData("E-mail", "test1999@gmail.com"),
  createData("NIC", 200110200939),
  createData("Gender", "Male"),
  createData("Unit ID", "A-214100"),
];

const rows2 = [
  createData("Name", "K.G.R.Jerry Fernando"),
  createData("Mobile", "0755525963"),
  createData("E-mail", "test12345@gmail.com"),
  createData("NIC", 197810200939),
  createData("Gender", "Male"),
  createData("Rental period", "5 yrs"),
];

const rows3 = [
  createData2(
    1,
    "R-214100",
    "A.W.G.Silva",
    "Male",
    "0767927004",
    "200111231987",
    <div className="photoColumn">
      <img
        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
        alt="resident imge"
        className="reditentImg"
      />
    </div>
  ),
  createData2(
    2,
    "R-214101",
    "A.W.G.Gamage",
    "Female",
    "0711927004",
    "438525603V",
    <div className="photoColumn">
      <img
        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
        alt="resident imge"
        className="reditentImg"
      />
    </div>
  ),
  createData2(
    3,
    "R-214102",
    "A.W.G.Samaraweera",
    "Male",
    "0767925504",
    "799251058V",
    <div className="photoColumn">
      <img
        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
        alt="resident imge"
        className="reditentImg"
      />
    </div>
  ),
];

function MemberList() {
  return (
    <div className="pageContainer">
      <div className="memberListContainer">
        <div className="card1">
          <Card sx={{ maxWidth: 550, width: "30rem" }}>
            <CardActionArea>
              <div className="cardMedia">
                <CardMedia
                  className="lableTag"
                  component="img"
                  image="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  alt="Owner"
                />
                <h3 className="lableTag">Owner's Infomation</h3>
              </div>
              <CardContent>
                <div className="tableContainer">
                  <TableContainer
                    component={Paper}
                    sx={{
                      backgroundColor: "#ECE1D9",
                    }}
                  >
                    <Table
                      sx={{
                        minWidth: 300,
                        width: 400,
                        marginLeft: "1rem",
                      }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.item}
                            style={{ borderBottom: "2px solid white" }}
                          >
                            <TableCell align="left">
                              <b>{row.item}</b>
                            </TableCell>
                            <TableCell align="left">{row.details}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="card2">
          <Card sx={{ maxWidth: 550, width: "30rem" }}>
            <CardActionArea>
              <div className="cardMedia">
                <CardMedia
                  className="lableTag"
                  component="img"
                  image="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  alt="Owner"
                />
                <h3 className="lableTag">Tenant's Infomation</h3>
              </div>
              <CardContent>
                <div className="tableContainer">
                  <TableContainer
                    component={Paper}
                    sx={{ backgroundColor: "#ECE1D9" }}
                  >
                    <Table
                      sx={{ minWidth: 300, width: 400, marginLeft: "1rem" }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {rows2.map((row) => (
                          <TableRow
                            key={row.item}
                            style={{ borderBottom: "2px solid white" }}
                          >
                            <TableCell align="left">
                              <b>{row.item}</b>
                            </TableCell>
                            <TableCell align="left">{row.details}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
      <div className="card3">
        <Card sx={{ maxWidth: "95vw", width: "90vw" }}>
          <CardContent>
            <h3 className="tableCaption">Unit Infomation</h3>
            <div className="tableContainer">
              <CardActionArea>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: "none", // Remove shadow from table container
                  }}
                >
                  <Table
                    sx={{
                      maxWidth: "85vw",
                      marginTop: "0.5rem",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      paddingTop: "1rem",
                      border: "none",
                    }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">#No</StyledTableCell>
                        <StyledTableCell align="left">
                          Resident ID
                        </StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Gender</StyledTableCell>
                        <StyledTableCell align="left">
                          Mobile No
                        </StyledTableCell>
                        <StyledTableCell align="left">NIC</StyledTableCell>
                        <StyledTableCell align="left">Photo</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows3.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.no}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.residentID}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.gender}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.mobileNo}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.nic}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.photo}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardActionArea>
            </div>
          </CardContent>
          <div className="backBtn">
            <BackButton />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MemberList;
