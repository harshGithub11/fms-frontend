import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import BookingService from '../../services/BookingService';

import customTheme from '../../util/theme';
import CustomPassengerTable from '../layout/customPassengerTable';

const styles = (theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 175,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        flexGrow: 1
    },
    ...customTheme.spreadThis

});

const PassengerDetails = (props) => {
    console.log(props);
    const { classes } = props;

    const [state, setState] = React.useState({
        open: false,
        bookingDate: new Date().toLocaleDateString('en-CA'),
        passengerList: [],
        passengerName: '',
        passengerAge: '',
        passengerUIN: '',
        luggage: ''
    });

    const handleClickOpen = () => {
        setState(prevValue => ({
            ...prevValue,
            open: true,
            passengerName: '',
            passengerAge: '',
            passengerUIN: '',
            luggage: ''
        }));
    };

    const handleClose = () => {
        setState(prevValue => ({
            ...prevValue,
            open: false,
        }));
    };

    const handleBook = () => {
        BookingService.createBooking({
            bookingDate: new Date().toLocaleDateString('en-CA'),
            passengerList: [
                ...state.passengerList
            ],
            scheduleFlightId: props.match.params.scheduledFlightId
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setState(prevValue => ({
            open: false,
            passengerList: [
                ...prevValue.passengerList, {
                    passengerName: state.passengerName,
                    passengerAge: state.passengerAge,
                    passengerUIN: state.passengerUIN,
                    luggage: state.luggage
                }
            ]
        }))
    }

    const handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        setState(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    return (
        
        <div>

            <Grid container>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Typography variant="h5" align="center" mb={1}>
                        Enter Passenger Details
                    </Typography>

                    {
                        state.passengerList.length !== 0 ? (
                            <Box mt={2} mb={2}> 
                                <CustomPassengerTable passengerList={state.passengerList} /> 
                            </Box>
                         ) : null
                    }

                    <div>

                        <Box className="text-center" mt={2} mb={2}>
                            <Button className={classes.button} variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Passenger
                            </Button>
                            {
                                state.passengerList.length !== 0 ? (
                                    <Link to="/book/booking-details">
                                        <Button className={classes.button} variant="contained" color="primary" onClick={handleBook}>
                                            Book Ticket
                                        </Button>
                                    </Link>
                                ) : null
                            }
                        </Box>
                        <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title">

                            <DialogTitle id="form-dialog-title">Add Passenger Details</DialogTitle>

                            <DialogContent>

                                <DialogContentText>
                                    Passenger Details
                                </DialogContentText>

                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        defaultValue={new Date().toLocaleDateString('en-CA')}
                                        disabled
                                        label="Booking Date"
                                        id="bookingDate"
                                        margin="dense"
                                        fullWidth
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="passengerName"
                                        name="passengerName"
                                        label="Passenger Name"
                                        onChange={handleChange}
                                        type="text"
                                        value={state.passengerName}
                                        fullWidth
                                    />

                                    <TextField
                                        margin="dense"
                                        id="passengerAge"
                                        name="passengerAge"
                                        label="Passenger Age"
                                        onChange={handleChange}
                                        type="number"
                                        value={state.passengerAge}
                                        fullWidth
                                    />

                                    <TextField
                                        margin="dense"
                                        id="passengerUIN"
                                        name="passengerUIN"
                                        label="Passenger UIN"
                                        onChange={handleChange}
                                        type="number"
                                        value={state.passengerUIN}
                                        fullWidth
                                    />

                                    <TextField
                                        margin="dense"
                                        id="luggage"
                                        name="luggage"
                                        label="Luggage"
                                        onChange={handleChange}
                                        type="number"
                                        value={state.luggage}
                                        fullWidth
                                    />

                                    <Box m={1} className="text-end">
                                        <Button type="submit" className={classes.button} variant="contained" color="primary" onClick={handleClose}>
                                            Add Passenger
                                        </Button>
                                    </Box>
                                </form>

                            </DialogContent>

                        </Dialog>

                    </div>

                </Grid>
                <Grid item xs={2} />
            </Grid>

        </div>
    );
}

export default withStyles(styles, { withTheme: true })(PassengerDetails);

