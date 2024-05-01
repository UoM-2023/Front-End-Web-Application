import * as React from 'react';
import PropTypes from 'prop-types';
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

// Styling Table cells and rows
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

function createData(name, modified_by, modified_date) {
  return {
    name,
    modified_by,
    modified_date,
    details: [
      {
        unit_range:'1 - 60',
        base_price: 150,
        unit_price: 3,
      },
      {
        unit_range: '60 - 90',
        base_price: 175,
        unit_price: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="center">{row.modified_by}</StyledTableCell>
        <StyledTableCell align="center">{row.modified_date}</StyledTableCell>
        <StyledTableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <EditButton />
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
                {row.name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Price Range</StyledTableCell>
                    <StyledTableCell align="center">Base Price</StyledTableCell>
                    <StyledTableCell align="center">Unit Price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.unit_range}>
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


// Row.propTypes = {
//   row: PropTypes.shape({
//     modified_by: PropTypes.string.isRequired,
    
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         unit_range: PropTypes.string.isRequired,
//         base_price: PropTypes.number.isRequired,
//         unit_price: PropTypes.number.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Electricity', '2024-02-12', 'AF0001M'),
  createData('Gas', '2024-02-12', 'AF0001M'),
  createData('Water', '2024-02-12', 'AF0001M'),
];

export default function CollapsibleTable() {
  return (
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
            <StyledTableCell align="center">Modified Date</StyledTableCell>
            <StyledTableCell align="center">Modified By</StyledTableCell>
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
  );
}