import React, { Component } from "react";
import logo from '../../Assests/img/logo.svg';
import './Landing.css'

import Button from '@material-ui/core/Button';

class Landing extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">

                    <img src={logo} className="App-logo" alt="logo" />
                    <br></br>
                    <div>
                        <Button variant="outlined" color="primary" href="/login">Log In</Button>
                        &nbsp;
                        <Button variant="outlined" color="secondary" href="/register">Register</Button>
                    </div>



                    <div>

                    </div>

                </header>
            </div>
        );

    }
}

export default Landing;
