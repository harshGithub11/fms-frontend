import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import React from 'react';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const CustomPassengerTable = (props) => {

  const { passengerList } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Passenger Name</StyledTableCell>
            <StyledTableCell align="center">Passenger Age</StyledTableCell>
            <StyledTableCell align="center">Passenger UIN</StyledTableCell>
            <StyledTableCell align="center">Luggage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            passengerList.map(passengerDetails => {
              return (
                <StyledTableRow key={passengerDetails.passengerUIN}>
                  <StyledTableCell component="th" scope="row">
                    {passengerDetails.passengerName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{passengerDetails.passengerAge}</StyledTableCell>
                  <StyledTableCell align="center">{passengerDetails.passengerUIN}</StyledTableCell>
                  <StyledTableCell align="center">{passengerDetails.luggage}</StyledTableCell>
                </StyledTableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default CustomPassengerTable;