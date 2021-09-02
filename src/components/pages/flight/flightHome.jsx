import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import customTheme from '../../../util/theme';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#fff',
        padding: theme.spacing(2),
    },
    ...customTheme.spreadThis
}));

const FlightHome = (props) => {

    const classes = useStyles();

    const login = useSelector(state => state.login);

    return (
        <div>
            {
                login.loggedIn ? (
                    <Grid container>
                        <Grid item xs={12} sm={6} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Box my={2}>
                                <Typography variant="h4" align="center">Flight Actions</Typography>
                            </Box>
                            <Paper elevation={3} className={classes.paper}>
                                <Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule-flight/add" variant="contained" color="primary" fullWidth>
                                            Add flight
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule-flight/view-all" variant="contained" color="primary" fullWidth>
                                            View all flights
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule-flight/update" variant="contained" color="primary" fullWidth>
                                            Update flight
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule-flight/delete" variant="contained" color="primary" fullWidth>
                                            Delete flight
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
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

export default FlightHome;