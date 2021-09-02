import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

//Home
import Home from './components/pages/home';
import Navbar from './components/layout/navbar';
import Login from './components/pages/login';
import Logout from './components/pages/logout';
import Register from './components/pages/register';
import UserHome from './components/pages/userHome';
import BookFlight from './components/pages/bookFlight';
import PassengerDetails from './components/pages/passengerDetails';
import BookingDetails from './components/pages/bookingDetails';
import CancelBooking from './components/pages/cancelBooking';

//Admin router
import AdminHome from './components/pages/adminHome';

//Airport routes
import AirportHome from './components/pages/airport/airportHome';
import AddAirport from './components/pages/airport/addAirport';
import ViewAllAirports from './components/pages/airport/viewAllAirports';
import UpdateAirport from './components/pages/airport/updateAirport';
import DeleteAirport from './components/pages/airport/deleteAirport';

//Flight routes
import FlightHome from './components/pages/flight/flightHome';
import AddFlight from './components/pages/flight/addFlight';
import ViewAllFlights from './components/pages/flight/viewAllFlights';
import UpdateFlight from './components/pages/flight/updateFlight';
import DeleteFlight from './components/pages/flight/deleteFlight';

//Schedule flight routes
import ScheduleFlightHome from './components/pages/scheduleflight/scheduleFlightHome';
import ScheduleFlight from './components/pages/scheduleflight/scheduleFlight';
import ViewAllScheduledFlights from './components/pages/scheduleflight/viewAllScheduledFlights';
import UpdateScheduledFlight from './components/pages/scheduleflight/updateScheduledFlight';
import DeleteScheduledFlight from './components/pages/scheduleflight/deleteScheduledFlight';

//Schedule routes
import ScheduleHome from './components/pages/schedule/scheduleHome';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/welcome" component={UserHome} />
        <Route exact path="/user/book" component={BookFlight} /> 
        <Route exact path="/user/book/:scheduledFlightId/:bookingDate" component={PassengerDetails} />
        <Route exact path="/user/book/booking-details" component={BookingDetails} />
        <Route exact path="/user/cancel-booking" component={CancelBooking} />
        <Route exact path="/user/view-scheduled-flights" component={ViewAllScheduledFlights} />

        {/* Admin Routes */}
        <Route exact path="/admin/welcome" component={AdminHome}/>

        {/* Airport routes */}
        <Route exact path="/admin/airport" component={AirportHome}/>
        <Route exact path="/admin/airport/add" component={AddAirport}/>
        <Route exact path="/admin/airport/view-all" component={ViewAllAirports}/>
        <Route exact path="/admin/airport/update" component={UpdateAirport}/>
        <Route exact path="/admin/airport/delete" component={DeleteAirport}/>

        {/* Flight routes */}
        <Route exact path="/admin/flight" component={FlightHome}/>
        <Route exact path="/admin/flight/add" component={AddFlight}/>
        <Route exact path="/admin/flight/view-all" component={ViewAllFlights}/>
        <Route exact path="/admin/flight/update" component={UpdateFlight}/>
        <Route exact path="/admin/flight/delete" component={DeleteFlight}/>

        {/* Schedule flight routes */}
        <Route exact path="/admin/schedule-flight" component={ScheduleFlightHome}/>
        <Route exact path="/admin/schedule-flight/add" component={ScheduleFlight}/>
        <Route exact path="/admin/schedule-flight/view-all" component={ViewAllScheduledFlights}/>
        <Route exact path="/admin/schedule-flight/update" component={UpdateScheduledFlight}/>
        <Route exact path="/admin/schedule-flight/delete" component={DeleteScheduledFlight}/>

        {/* Schedule routes */}
        <Route exact path="/admin/schedule" component={ScheduleHome}/>
        <Route exact path="/admin/schedule/add" component={ScheduleFlight}/>
        <Route exact path="/admin/schedule/view-all" component={ViewAllScheduledFlights}/>
        <Route exact path="/admin/schedule/update" component={UpdateScheduledFlight}/>
        <Route exact path="/admin/schedule/delete" component={DeleteScheduledFlight}/>

      </Switch>
      </Router>

    </div>
  );
}

export default App;
