import React from 'react';
import { Box, Button, Grid, Typography, withStyles } from '@material-ui/core';
import theme from '../../util/theme';

const styles = () => ({
    ...theme.spreadThis
})

const Home = (props) => {

    const {classes} = props;

    return (
        <div>

            <Grid container>
                <Grid item xs={2} />
                <Grid item xs={8}>

                    <Typography variant="h3" align="center">
                        Welcome to
                    </Typography>

                    <Typography variant="h6" align="center">
                        Flight Management System
                    </Typography>

                    {/* The Box component works as a "Wrapper" for the component you want to "Modify" the spacing. */}
                    <Box mt={3} mb={3}>
                        <Typography variant="body1" align="justify">
                            The Flight Management System is a Java-based booking solution for flight tickets. It
                            consolidates data provided by different airline carriers and hence provides the user details
                            and rates in real-time. Travellers may want to make changes in their bookings. The
                            application allows them to book, cancel, view and update their bookings with ease. Other
                            than this, it eases the management of bookings too. All the bookings, flights, schedules and
                            routes can be viewed, added and modified on a single application by the administrator.
                        </Typography>

                    </Box>

                    <Button className={classes.button}  variant="contained" color="primary" href="/login">
                            Get Started &#128522;
                    </Button>

                </Grid>
                <Grid item xs={2} />
            </Grid>

        </div>

    )
}

export default withStyles(styles)(Home);