import React, { Component } from 'react';

// Material UI Flight icon import
import FlightIcon from '@material-ui/icons/Flight';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-5 bg-body" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <FlightIcon />
                        Flight Management System
                    </a>
                    <a class="btn btn-outline-light" href="/login">Login</a>
                </div>
            </nav>
        );
    }
}

export default Navbar;