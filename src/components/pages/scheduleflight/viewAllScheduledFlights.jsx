import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ScheduledFlightService from '../../../services/ScheduledFlightService';

import customTheme from '../../../util/theme';
import ScheduledFlight from '../../layout/scheduledFlight';

const useStyles = makeStyles((theme) => ({
    ...customTheme.spreadThis
}));

const ViewAllScheduledFlights = (props) => {
    
    const state = useSelector(state => state);
    const login = state.login;

    const [scheduledFlights, setScheduledFlights] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        ScheduledFlightService.getAllScheduledFlights()
            .then(response => {
                console.log(response.data);
                setScheduledFlights(response.data);
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }, [])

    return (
        <div>
        {
            login.loggedIn ? (
                <Box className="text-center">
                    <Box my={2}>
                        <Typography variant="h3">Scheduled Flights</Typography>
                    </Box>
                    <Box mx={3}>
                    <Grid container spacing={3}>
                        {
                            scheduledFlights.length !== 0 ? scheduledFlights.map(scheduledFlight => {
                            return <ScheduledFlight key={scheduledFlight.scheduleFlightId} scheduledFlightDetails={scheduledFlight} bookingDate={new Date().toLocaleDateString('en-CA')}/>
                            }) : <Typography variant="h4" className="text-center">Sorry no flight available!</Typography>
                        }
                    </Grid>
                    </Box>
                </Box>
            ) : (
                    <Box className = "text-center">
                        <Typography variant = "h4">Unable to authenticate</Typography>
                        <Button className={classes.button} variant="contained" color="primary" href="/">
                            Go to Home
                        </Button>
                    </Box> 
            )
        }
        </div>
    )
}

export default ViewAllScheduledFlights;