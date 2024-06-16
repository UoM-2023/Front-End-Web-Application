import React, { useEffect, useState } from "react";
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
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";

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
  createData("Address", "No 50, 1st Lane, Ratnapura Road, Batugedara."),
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
  const [residentlist, setResidentlist] = useState([]);

  // Change Birthday Date Format

  function formatDate(dateString) {
    // Create a new Date object from the provided string
    const date = new Date(dateString);

    // Increment the date by one day
    date.setDate(date.getDate());

    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date string
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    console.log("frontend use effect");
    getResidentDetails();
  }, []);

  // Get the data from the backend to front end
  const getResidentDetails = () => {
    axios
      .get("http://localhost:3001/residentsDetails/addNewResident")
      .then((response) => {
        console.log(" get all Resident func CALLED");
        console.log(response);
        setResidentlist(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  // Handling the edit button
  const handleEdit = (residentID) => {
    console.log("Hanlde Edit Before axios");
    axios
      .get(
        `http://localhost:3001/residentsDetails/addNewResident/updateResident/${residentID}`
      )
      .then((response) => {
        console.log("Hanlde Edit Called........");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="pageContainer">
      <TopBar title="Residents Information" />
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
                        <StyledTableCell align="left">
                          Resident ID
                        </StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Gender</StyledTableCell>
                        <StyledTableCell align="left">
                          Date Of Birth
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Mobile No
                        </StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">NIC</StyledTableCell>
                        <StyledTableCell align="left">
                          Member Type
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {residentlist &&
                        residentlist.map((apartflowtesting, index) => {
                          const formattedDate = formatDate(
                            apartflowtesting.dob
                          );
                          console.log(formattedDate);

                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {apartflowtesting.residentID}
                              </StyledTableCell>
                              <StyledTableCell>
                                {apartflowtesting.name_with_initials}
                              </StyledTableCell>
                              <StyledTableCell>
                                {apartflowtesting.gender}
                              </StyledTableCell>
                              <StyledTableCell>
                                {formattedDate}
                              </StyledTableCell>
                              <StyledTableCell>
                                {apartflowtesting.mobile_no}
                              </StyledTableCell>
                              <StyledTableCell>
                                {apartflowtesting.email}
                              </StyledTableCell>
                              <StyledTableCell>
                                {apartflowtesting.nic}
                              </StyledTableCell>
                              <StyledTableCell>
                                {apartflowtesting.member_type}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardActionArea>
            </div>
          </CardContent>
          <div className="backBtn">{/* <BackButton /> */}</div>
        </Card>
      </div>
    </div>
  );
}

export default MemberList;
