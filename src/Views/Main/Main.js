import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import AddNumber from "../AddNumber/AddNumber";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/addNumber" component={AddNumber} />
                </Switch>
            </main>
        );
    }
}

export default Main;