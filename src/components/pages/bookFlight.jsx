import { Box, Button, Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import AirportService from '../../services/AirportService';
import ScheduledFlightService from '../../services/ScheduledFlightService';

import DropDown from '../layout/dropDown';

import customTheme from '../../util/theme';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ScheduledFlight from '../layout/scheduledFlight';

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
        source:'',
        destination: '',      
        scheduledFlights: [],
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
      const {value} = event.target
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
        ScheduledFlightService.getScheduledFlights(this.state.source, this.state.destination, this.state.date.toLocaleDateString('en-CA'))
          .then(response => {
            console.log(response.data);
            this.setState({
              ...this.state,
              scheduledFlights: [
                ...response.data
              ]
            })
            
          })
          .catch(err => {
            if(err)
              console.log(err.response.data);
          })
    }

    render() { 
      const{classes} = this.props;
      return (

          <div>
            
            <Grid container>
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Typography variant="h4" align="center">
                  Book a Flight
                </Typography>

                <Box className="d-flex justify-content-evenly" mt={1}>
                  
                  <DropDown
                    helperText="Enter Source"
                    label="Source Airport"
                    menuItems={this.state.airports}
                    name="source"
                    handleChange={this.handleChange}
                    value={this.state.source}
                  />

                  <DropDown
                    helperText="Enter Destination"
                    label="Destination Airport"
                    menuItems={this.state.airports}
                    name="destination"
                    handleChange={this.handleChange}
                    value={this.state.destination}
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
              <Box mr={3} ml={3}>
                <Grid container spacing={3}>
                  {
                    this.state.scheduledFlights.length !== 0 ? this.state.scheduledFlights.map(scheduledFlight => {
                      return <ScheduledFlight key={scheduledFlight.scheduleFlightId} scheduledFlightDetails={scheduledFlight} bookingDate={this.state.date.toLocaleDateString('en-CA')}/>
                    }) : <Typography variant="h4" className="text-center">Sorry no flight available!</Typography>
                  }
                </Grid>
              </Box>
            </div>

          </div>        
      );
    }
}
 
export default withStyles(styles, {withTheme:true})(BookFlight);

