import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, Paper } from '@material-ui/core';

import customTheme from '../../util/theme';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({

  paper: {
    backgroundColor: '#28282B',
    color: '#fff',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  ...customTheme.spreadThis
}));

const ScheduledFlight = (props) => {
  
  const classes = useStyles();

  //Fetching the state from redux store
  const state = useSelector(state => state);
  //Fetch the login from state object
  const login = state.login;

  return (
    <Grid item md={6} xs={12}>
      <Paper className={classes.paper}>

        <Box className="text-start" p={1}>

          <Typography variant="h6">Flight Number: {props.scheduledFlightDetails.flight.flightNumber}</Typography>
          <Typography variant="subtitle1">Schedule Flight Id: {props.scheduledFlightDetails.scheduleFlightId}</Typography>
          <Typography variant="subtitle1">Source: {props.scheduledFlightDetails.schedule.sourceAirport}</Typography>
          <Typography variant="subtitle1">Destination: {props.scheduledFlightDetails.schedule.destinationAirport}</Typography>
          <Typography variant="subtitle1">Departure: {props.scheduledFlightDetails.schedule.departureDateTime}</Typography>
          <Typography variant="subtitle1">Arrival: {props.scheduledFlightDetails.schedule.arrivalDateTime}</Typography>
          <Typography variant="subtitle1">Available Seats: {props.scheduledFlightDetails.availableSeats}</Typography>
          <Typography variant="h6">Ticket Cost: {props.scheduledFlightDetails.ticketCost}</Typography>

          <Box className="text-end" mt={1}>
            {
              login.role === "user" ? (
                <Button className={classes.button} variant="contained" color="primary" href={`/user/book/${props.scheduledFlightDetails.scheduleFlightId}/${props.bookingDate}`}>
                  Book Now
                </Button>
              ) : null
            }
          </Box>

        </Box>

      </Paper>
    </Grid>
  );
}

export default ScheduledFlight;

