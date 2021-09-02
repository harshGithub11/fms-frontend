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

const ScheduleHome = (props) => {

    const classes = useStyles();

    const login = useSelector(state => state.login);

    return (
        <div>
            {
                login.loggedIn ? (
                    <Grid container>
                        <Grid item xs={12} sm={6} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Box my={2}>
                                <Typography variant="h4" align="center">Schedule Actions</Typography>
                            </Box>
                            <Paper elevation={3} className={classes.paper}>
                                <Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule/add" variant="contained" color="primary" fullWidth>
                                            Create a Schedule
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule/view-all" variant="contained" color="primary" fullWidth>
                                            View all schedules
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule/update" variant="contained" color="primary" fullWidth>
                                            Update schedule
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule/delete" variant="contained" color="primary" fullWidth>
                                            Delete schedule
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

export default ScheduleHome;