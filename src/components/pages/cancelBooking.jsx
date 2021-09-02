import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import BookingService from '../../services/BookingService'

import Joi from 'joi';

import customTheme from '../../util/theme';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#fff',
        color: '#fff',
        padding: theme.spacing(2),
    },
    ...customTheme.spreadThis
}));

const CancelBooking = (props) => {

    const state = useSelector(state => state);
    const classes = useStyles();
    const { login } = state;

    const [open, setOpen] = useState(false);
    const [bookingId, setBookingId] = useState('');
    const [message, setMessage] = useState();

    //For validating the form fields
    const [errors, setErrors] = useState()
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        event.preventDefault();
        const {value} = event.target
        setBookingId(value);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        setOpen(false);

        //Checking if there are errors
        const errors = validate();
        setErrors(errors);

        //If errors exists then don't dispatch the action
        if(errors) 
            return;

        BookingService.deleteBooking(bookingId)
            .then(response => {
                setMessage(`Booking with id ${bookingId} has been deleted successfully.`)
            })
            .catch(error => {
                setMessage(error.response.data.message);
            })
    }

    //Schema for form field validation
    const schema = Joi.object({
        bookingId: Joi.number().required
    })

    //Now writing a separate validate function which would be called later.
    const validate = () => {
        
        //Creating errors object, which would be returned
        const errors ={}

        const result = schema.validate({bookingId: bookingId}, {
            abortEarly: false
        })

        console.log(result);
        
        //Populating the errors object if errors exists.
        if(result.error != null){
            for(let error of result.error.details) {
                errors[error.path[0]] = error.message
            }
        }

        return Object.keys(errors).length === 0 ? null : errors
    }

    return (
        <div>
            {
                login.loggedIn ? (
                    <Box className="text-center">
                        <Box my={2}>
                            <Typography variant="h4">Cancel Booking</Typography>
                        </Box>
                        <Grid item md={6} xs={8} style={{ marginLeft: "auto", marginRight: "auto" }}  >
                            <Paper elevation={3} className={classes.paper}>
                                <Box my={2}>
                                    <TextField 
                                        label="Booking Id" 
                                        type="number" 
                                        placeholder="Booking id to delete" 
                                        error={errors && errors.bookingId ? true : false}
                                        helperText={errors && errors.bookingId}
                                        name="bookingId" 
                                        value={bookingId} 
                                        onChange={handleChange}

                                    />
                                </Box>
                                <Button className={classes.button} variant="contained" color="primary" onClick={handleClickOpen}>Cancel Booking</Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">Cancel the booking?</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to cancel the booking?    
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDelete} color="primary" autoFocus>
                                            Yes
                                        </Button>
                                        <Button onClick={handleClose} color="primary">
                                            No
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Paper>
                            {
                                message && <Typography variant="h5">
                                    {message}
                                </Typography>
                            }
                        </Grid>
                    </Box>
                ) : (
                        <Box className="text-center">
                            <Typography variant="h4">Unable to authenticate</Typography>
                            <Button className={classes.button} variant="contained" color="primary" href="/">
                                Go to Home
                        </Button>
                        </Box>
                    )
            }
        </div>
    )

}

export default CancelBooking;