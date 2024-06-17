import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, tableCellClasses, } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddNewButton from '../../../Component/Buttons/AddNewButton';
import './UtilityCharges.css';
import SearchBar from '../../../Component/SearchBar/SearchBar';
import UtilityDetailsButton from '../../../Component/Buttons/UtilityDetailsButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f9f4f0',
    color: '#605D5D',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#ECE1D9',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row({ index,row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="center">{row.unit_id}</StyledTableCell>
        {/* <StyledTableCell>{row.utility_type}</StyledTableCell> */}
        <StyledTableCell align="center">{row.util_month}</StyledTableCell>
        <StyledTableCell align="center">{row.prev_balance}</StyledTableCell>
        <StyledTableCell align="center">{row.month_amount}</StyledTableCell>
        <StyledTableCell align="center">{row.tot_amount}</StyledTableCell>
        <StyledTableCell align='center'>
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
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Utility Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Utility Type</StyledTableCell>
                    <StyledTableCell align='center'>Usage</StyledTableCell>
                    <StyledTableCell align='center'>Cost</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell align='center'>Gas</StyledTableCell>
                    <StyledTableCell align='center'>{row.gasUsage}</StyledTableCell>
                    <StyledTableCell align='center'>{row.gasCost}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align='center'>Water</StyledTableCell>
                    <StyledTableCell align='center'>{row.waterUsage}</StyledTableCell>
                    <StyledTableCell align='center'>{row.waterCost}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align='center'>Electricity</StyledTableCell>
                    <StyledTableCell align='center'>{row.electricityUsage}</StyledTableCell>
                    <StyledTableCell align='center'>{row.electricityCost}</StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

function UtilityCharges() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/finance/getUtilityCharges')
      .then(response => {
        if (response.data && response.data.result) {
          console.log(response.data.result);
          setRows(response.data.result);
        } else {
          setError('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('Error fetching utility data:', error);
        setError('Failed to fetch data');
      });
  }, []);

  return (
    <div className='utilityDetailsContainer'>
      <div className='pageTop'>
      <SearchBar/>
        <div className="topButtons">
          <UtilityDetailsButton route="/finance/utilitycharges/viewUtilityDetails" />
          <AddNewButton route="/finance/utilitycharges/addUtility"/>
        </div>
      </div>

      {error ? (
        <div>Error: {error}</div>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 0 }}>
          <Table aria-label="collapsible table" sx={{
            maxWidth: "93.5vw",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 0,
            paddingTop: "1rem",
          }}>
            <TableHead>
              <TableRow>
                {/* <StyledTableCell>#No</StyledTableCell> */}
                <StyledTableCell align='center'>Unit ID</StyledTableCell>
                {/* <StyledTableCell>Utility Type</StyledTableCell> */}
                <StyledTableCell align='center'>Month</StyledTableCell>
                <StyledTableCell align='center'>Balance</StyledTableCell>
                <StyledTableCell align='center'>Monthly Amount (Rs.)</StyledTableCell>
                <StyledTableCell align='center'>Total Amount (Rs.)</StyledTableCell>
                <StyledTableCell align='center'>See Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default UtilityCharges;
