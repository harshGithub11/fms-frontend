import { Box, Button, Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import AirportService from '../../services/AirportService';
import ScheduledFlightService from '../../services/ScheduledFlightService';

import DropDown from '../layout/dropDown';

import customTheme from '../../util/theme';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ScheduledFlight from '../layout/scheduledFlight';

import Joi from 'joi';

import { connect } from 'react-redux';

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

class BookFlight extends Component {

  constructor(props) {
    super(props)
    this.state = {
      airports: [],
      date: new Date(),
      source: '',
      destination: '',
      scheduledFlights: [],
      errors: '',
      message: ''           //For displaying meaningful info if no flight available between source and dest. on a given date.
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  //Getting all the airports
  componentDidMount() {
    AirportService.getAirports().then(response => {
      this.setState({
        airports: response.data
      })
    })
  }

  //Handling drop down list actions
  handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target
    this.setState({
      ...this.state,
      [event.target.name]: value
    })
  }

  //Handling date change
  handleDateChange = (date) => {
    this.setState({
      ...this.state,
      date
    })
  }

  handleGetScheduledFlights = () => {

     //Checking if there are errors
     const errors = this.validate();
     this.setState({
       ...this.state,
       errors
     });

     //If errors exists then don't dispatch the action
     if(errors) 
         return;

    ScheduledFlightService.getScheduledFlights(this.state.source, this.state.destination, this.state.date.toLocaleDateString('en-CA'))
      .then(response => {
        
        if(response.data.length === 0) {
          this.setState({
            ...this.state,
            scheduledFlights: [],
            message: "Sorry no flight available!"
          })
        } else {
          this.setState({
            ...this.state,
            scheduledFlights: [
              ...response.data
            ]
          })
        }

      })
      .catch(err => {
        if (err)
          console.log(err.response.data);
      })
  }

  //Schema for form field validation
  schema = Joi.object({
    source: Joi.string().required(),
    destination: Joi.string().required()
  })

  //Now writing a separate validate function which would be called later.
  validate = () => {
    
    //Creating errors object, which would be returned
    const errors ={}

    const result = this.schema.validate({source: this.state.source, destination: this.state.destination}, {
        abortEarly: false
    })

    //console.log(result);
    
    //Populating the errors object if errors exists.
    if(result.error != null){
        for(let error of result.error.details) {
            errors[error.path[0]] = error.message
        }
    }

    return Object.keys(errors).length === 0 ? null : errors
  }

  render() {
    const { classes, login } = this.props;
    return (

      <div>
        {
          login.loggedIn ? (
            <Box>
              <Grid container>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <Typography 
                    variant="h4" 
                    align="center" 
                  >
                    Book a Flight
                  </Typography>

                  <Box className="d-flex justify-content-evenly" mt={1}>

                    <DropDown
                      label="Source Airport"
                      menuItems={this.state.airports}
                      name="source"
                      handleChange={this.handleChange}
                      value={this.state.source}
                      error={this.state.errors && this.state.errors.source ? true : false}
                      helperText={this.state.errors && this.state.errors.source}
                    />

                    <DropDown
                      label="Destination Airport"
                      menuItems={this.state.airports}
                      name="destination"
                      handleChange={this.handleChange}
                      value={this.state.destination}
                      error={this.state.errors && this.state.errors.destination ? true : false}
                      helperText={this.state.errors && this.state.errors.destination}
                    />

                  </Box>

                  <Box className="text-center" mt={1}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="yyyy/MM/dd"
                        label="Journey Date"
                        margin="normal"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Box>

                  <Box my={2} className="text-center">
                    <Button className={classes.button} variant="contained" color="primary" onClick={this.handleGetScheduledFlights}>
                      Search Flights
                    </Button>
                  </Box>

                </Grid>
                <Grid item xs={2} />
              </Grid>

              <div className={classes.root}>
                <Box mx={3}>
                  <Grid container spacing={3}>
                    {
                      this.state.scheduledFlights.length !== 0 ? this.state.scheduledFlights.map(scheduledFlight => {
                        return <ScheduledFlight key={scheduledFlight.scheduleFlightId} scheduledFlightDetails={scheduledFlight} bookingDate={this.state.date.toLocaleDateString('en-CA')} />
                      }) : <Typography variant="h5" style={{color: 'red'}}>{this.state.message}</Typography>
                    }
                  </Grid>
                </Box>
              </div>
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

    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(BookFlight));

