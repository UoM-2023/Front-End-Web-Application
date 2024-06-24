import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import "./UtilityCharges.css";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/system';
import { TableCell, TableRow, tableCellClasses } from '@mui/material';
import EditButton from '../../../Component/Buttons/EditButton';
import AddNewButton from '../../../Component/Buttons/AddNewButton';
import axiosInstance from '../../LoginPage/LoginServices/authService';

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(utility_name, utility_id, modified_by, modified_date, details = []) {
  return {
    name: utility_name,
    utility_id,
    modified_by,
    modified_date,
    details: details.map(price => ({
      unit_range: price.price_range,
      base_price: price.base_price,
      unit_price: price.unit_price
    })),
  };
}

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="center">{row.modified_by}</StyledTableCell>
        <StyledTableCell align="center">{row.modified_date.slice(0,10)}</StyledTableCell>
        <StyledTableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <EditButton route ={`/finance/utilitycharges/updateUtilityDetails/${row.utility_id}`} />
        </StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.name} Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Price Range</StyledTableCell>
                    <StyledTableCell align="center">Base Price</StyledTableCell>
                    <StyledTableCell align="center">Unit Price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow, index) => (
                    <TableRow key={index}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {detailsRow.unit_range}
                      </StyledTableCell>
                      <StyledTableCell align="center">{detailsRow.base_price}</StyledTableCell>
                      <StyledTableCell align="center">{detailsRow.unit_price}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function UtilityDetails() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axiosInstance.get('/finance/utilityDetails')
      .then(response => {
        console.log("API Response:", response.data);
        const formattedData = response.data.map(utility => createData(
          utility.utility_name,
          utility.utility_id,
          utility.modified_by,
          utility.modified_date,
          utility.prices
        ));
        setRows(formattedData);
      })
      .catch(error => {
        console.error('Error fetching utility data:', error);
      });
  }, []);

  return (
    <div className='utilityDetailsContainer'>
      <div className='pageTop'>
        <div></div>
        <AddNewButton route="/finance/utilitycharges/addNewUtilityType"/>
      </div>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 0 }}>
        <Table aria-label="collapsible table" sx={{
              maxWidth: "93.5vw",
              marginTop: 5,
              marginLeft: 10,
              marginRight: 0,
              paddingTop: "1rem",
            }} >
          <TableHead>
            <TableRow>
              <StyledTableCell>Utility Name</StyledTableCell>
              <StyledTableCell align="center">Modified By</StyledTableCell>
              <StyledTableCell align="center">Modified Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UtilityDetails;
