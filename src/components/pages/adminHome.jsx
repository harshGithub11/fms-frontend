import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import customTheme from '../../util/theme';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#fff',
        padding: theme.spacing(2),
    },
    ...customTheme.spreadThis
}));

const AdminHome = (props) => {

    const classes = useStyles();

    const login = useSelector(state => state.login);

    return (
        <div>
            {login.loggedIn ? (
                <Box mt={3}>
                    <Box my={2}>
                        <Typography variant="h3" className="text-center">
                            Welcome Admin
                        </Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={12} sm={6} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Paper elevation={3} className={classes.paper}>
                                <Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/airport" variant="contained" color="primary" fullWidth>
                                            Airport actions
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/flight" variant="contained" color="primary" fullWidth>
                                            Flight actions
                                        </Button>      
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule-flight" variant="contained" color="primary" fullWidth>
                                            Schedule flight actions
                                        </Button>
                                    </Box>
                                    <Box my={2}>
                                        <Button className={classes.button} component={Link} to="/admin/schedule" variant="contained" color="primary" fullWidth>
                                            Schedule actions
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                    <Box className="text-center">
                        <Typography variant="h4">Unable to authenticate</Typography>
                        <Button className={classes.button}  variant="contained" color="primary" href="/">
                            Go to Home
                        </Button>
                    </Box>
            )}
        </div>
    )
}

export default AdminHome;