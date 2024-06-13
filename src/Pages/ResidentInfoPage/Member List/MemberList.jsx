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
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& > td": {
    padding: "0.5rem",
  },
  margin: "1rem",
}));

function MemberList() {
  const [residentlist, setResidentlist] = useState([]);
  const { UnitID } = useParams();

  const [formData, setFormData] = useState({
    UnitID: "",
    residentID: "",
    name_with_initials: "",
    gender: "",
    dob: "",
    nic: "",
    member_type: "",
    email: "",
    mobile_no: "",
    Address: "",
    img: "",
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    console.log("Current Unit ID:", UnitID);
    if (UnitID) {
      axios
        .get(`http://localhost:3001/residentsDetails/viewResident/${[UnitID]}`)
        .then((response) => {
          const { data } = response;
          if (data && data.result && data.result.length > 0) {
            const viewData = data.result[0][0];
            const memberTypeValue =
              viewData.member_type === "Owner" ? "Owner" : viewData.member_type;

            const formattedDate = formatDate(viewData.dob);
            setFormData({
              UnitID: viewData.UnitID,
              residentID: viewData.residentID,
              name_with_initials: viewData.name_with_initials,
              gender: viewData.gender,
              dob: formattedDate,
              nic: viewData.nic,
              member_type: memberTypeValue,
              email: viewData.email,
              mobile_no: viewData.mobile_no,
              Address: viewData.Address,
              img: viewData.img,
            });
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err));
    }
  }, [UnitID]);

  useEffect(() => {
    getResidentDetails();
  }, []);

  const getResidentDetails = () => {
    axios
      .get("http://localhost:3001/residentsDetails/addNewResident")
      .then((response) => {
        setResidentlist(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  const hasTenants = residentlist.some(
    (resident) =>
      resident.member_type === "Tenant" && resident.UnitID === UnitID
  );

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
                <h3 className="lableTag">
                  Owner's Infomation
                  <br />
                  <h4>Unit ID : {UnitID}</h4>
                </h3>
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
                        {residentlist &&
                          residentlist
                            .filter(
                              (resident) =>
                                resident.member_type === "Owner" &&
                                resident.UnitID === UnitID
                            )
                            .map((apartflowtesting, index) => (
                              <React.Fragment key={index}>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>ResidentID</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.residentID}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>Name</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.name_with_initials}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>Mobile</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.mobile_no}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>E-mail</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.email}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>NIC</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.nic}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>Gender</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.gender}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="table-row-custom">
                                  <TableCell align="left">
                                    <b>Address</b>
                                  </TableCell>
                                  <TableCell align="left">
                                    {apartflowtesting.Address}
                                  </TableCell>
                                </TableRow>
                              </React.Fragment>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        {hasTenants && (
          <div className="card2">
            <Card sx={{ maxWidth: 550, width: "30rem" }}>
              <CardActionArea>
                <div className="cardMedia">
                  <CardMedia
                    className="lableTag"
                    component="img"
                    image="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                    alt="Tenant"
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
                        sx={{
                          minWidth: 300,
                          width: 400,
                          marginLeft: "1rem",
                        }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableBody>
                          {residentlist &&
                            residentlist
                              .filter(
                                (resident) =>
                                  resident.member_type === "Tenant" &&
                                  resident.UnitID === UnitID
                              )
                              .map((apartflowtesting, index) => (
                                <React.Fragment key={index}>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>ResidentID</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.residentID}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>Name</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.name_with_initials}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>Mobile</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.mobile_no}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>E-mail</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.email}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>NIC</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.nic}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>Gender</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.gender}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="table-row-custom">
                                    <TableCell align="left">
                                      <b>Address</b>
                                    </TableCell>
                                    <TableCell align="left">
                                      {apartflowtesting.Address}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        )}
      </div>
      <div className="card3">
        <Card sx={{ maxWidth: "95vw", width: "90vw" }}>
          <CardContent>
            <h3 className="tableCaption" style={{ wordSpacing: "0.3rem" }}>
              Unit Member's Infomation
            </h3>
            <div className="tableContainer">
              <CardActionArea>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: "none",
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
                        residentlist
                          .filter(
                            (resident) =>
                              resident.member_type !== "Owner" &&
                              resident.member_type !== "Tenant" &&
                              resident.UnitID === UnitID
                          )
                          .map((apartflowtesting, index) => {
                            const formattedDate = formatDate(
                              apartflowtesting.dob
                            );

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
          <div className="backBtn">
            <BackButton />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MemberList;
