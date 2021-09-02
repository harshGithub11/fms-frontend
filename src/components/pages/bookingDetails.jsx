import { Button, makeStyles, Typography } from '@material-ui/core';
import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import { useSelector } from 'react-redux';

import customTheme from '../../util/theme';
import CustomPassengerTable from '../layout/customPassengerTable';

const useStyles = makeStyles((theme) => ({

    paper: {
        backgroundColor: '#28282B',
        color: '#fff',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    ...customTheme.spreadThis
}));

const BookingDetails = (props) => {
    const classes = useStyles();

    const state = useSelector(state => state);
    const booking = state.booking;
    const login = state.login;

    return (
        <div>
            {
                login.loggedIn ? (
                    <Box>
                        <Box my={1}>
                            <Typography variant="h4" align="center">
                                Congratulations Your tickets
                            </Typography>
                            <Typography variant="h6" align="center">
                                have been booked!
                            </Typography>

                        </Box>
                        <Box my={2}>
                            <Grid item md={6} xs={8} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <Box my={2}>
                                    <Typography variant="h5">
                                        Booking Details:
                                    </Typography>
                                </Box>
                                <Paper className={classes.paper}>

                                    <Box className="text-start" p={1}>

                                        <Typography variant="h6">Booking Id: {booking.booking.bookingId}</Typography>
                                        <Typography variant="h6">Flight Number: {booking.booking.scheduleFlight.flight.flightNumber}</Typography>
                                        <Typography variant="subtitle1">Booking Date: {booking.booking.bookingDate}</Typography>
                                        <Typography variant="subtitle1">Schedule Flight Id: {booking.booking.scheduleFlight.scheduleFlightId}</Typography>
                                        <Typography variant="subtitle1">Source: {booking.booking.scheduleFlight.schedule.sourceAirport}</Typography>
                                        <Typography variant="subtitle1">Destination: {booking.booking.scheduleFlight.schedule.destinationAirport}</Typography>
                                        <Typography variant="subtitle1">Departure: {booking.booking.scheduleFlight.schedule.departureDateTime}</Typography>
                                        <Typography variant="subtitle1">Arrival: {booking.booking.scheduleFlight.schedule.arrivalDateTime}</Typography>
                                        <Typography variant="h6">Ticket Cost: {booking.booking.scheduleFlight.ticketCost}</Typography>
                                        <Typography variant="h6">Total Cost: {booking.booking.totalCost}</Typography>

                                    </Box>
                                
                                </Paper>
                                <Box my={2}>
                                    <Typography variant="h5">
                                        Passenger Details:
                                    </Typography>
                                </Box>
                                {
                                    booking.booking.passengerList.length !== 0 ? (
                                        <Box mt={2} mb={2}>
                                            <CustomPassengerTable passengerList={booking.booking.passengerList} />
                                        </Box>
                                    ) : null
                                }
                            </Grid>
                        </Box>
                    </Box>
                ) : (
                    <Box className="text-center">
                        <Typography variant="h4">Unable to authenticate</Typography>
                        <Button className={classes.button}  variant="contained" color="primary" href="/">
                            Go to Home
                        </Button>
                    </Box> 
                )
            }
        </div>
    )
}

export default BookingDetails;