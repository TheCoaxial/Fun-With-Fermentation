import React, { Component, useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

// import Container from "../src/components/Container";
import Footer from "./components/Footer";
// import logo from './logo.svg';
import './App.css';
import ls from 'local-storage'
import AuthService from "./services/auth.service";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/login";
import Register from "./pages/register";
import SearchBar from "./components/SearchBar";
import Profile from "./pages/Profile";
import NewBrew from "./pages/NewBrew";
import UserDisplay from "./pages/UserDisplay";
import BrewDisplay from "./pages/BrewDisplay";
import Navbar from './components/Navbar/Navbar'

class App extends Component {
    constructor(props) {
        super(props);

        this.handleNavbarRender = this.handleNavbarRender.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    };

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                visited: ls.get('visited') || []
            });
        };
    };

    handleNavbarRender(newUser) {
        this.setState({ currentUser: newUser });
    }

    render() {
        return (
            <Router>
                <Navbar currentUser={this.state.currentUser} />
                {/* <Header /> */}
                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/login"]} component={(props) => <Login history={props.history} setCurrentUser={this.handleNavbarRender} />} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path={"/feed"} component={Feed} />
                        <Route exact path="/brew" component={NewBrew} />
                        <Route path="/user/:userId" component={UserDisplay} />
                        <Route path="/brews/:brewId" component={BrewDisplay} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
};

export default App;
