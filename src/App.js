import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Home from './components/pages/home';
import Navbar from './components/layout/navbar';
import Login from './components/pages/login';
import Logout from './components/pages/logout';
import Register from './components/pages/register';
import UserHome from './components/pages/userHome';
import BookFlight from './components/pages/bookFlight';
import PassengerDetails from './components/pages/passengerDetails';
import BookingDetails from './components/pages/bookingDetails';

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
        <Route exact path="/book" component={BookFlight} /> 
        <Route exact path="/book/:scheduledFlightId/:bookingDate" component={PassengerDetails} />
        <Route exact path="/book/booking-details" component={BookingDetails} />
      </Switch>
      </Router>

    </div>
  );
}

export default App;
