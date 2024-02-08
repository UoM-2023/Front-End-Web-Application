import React from "react";
import "./MemberList.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(item, details) {
  return { item, details };
}

const rows = [
  createData("Name", "W.M.N.Sunil Silva"),
  createData("Mobile", "0711125896"),
  createData("E-mail", "test1999@gmail.com"),
  createData("NIC", 200110200939),
  createData("Gender", "Male"),
  createData("User Name", "SamnKumara123"),
];

function MemberList() {
  return (
    <div className="memberListContainer">
      <Card sx={{ maxWidth: 550 }}>
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
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 300, width: 400, marginLeft: "1rem" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.item} sx={{}}>
                        <TableCell align="left">{row.item}</TableCell>
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
  );
}

export default MemberList;
