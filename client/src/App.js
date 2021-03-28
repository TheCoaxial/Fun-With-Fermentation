import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

// import Container from "../src/components/Container";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
// import logo from './logo.svg';
import './App.css';

import AuthService from "./services/auth.service";

import Feed from "./pages/Feed/Feed";
import Login from "./pages/login";
import Register from "./pages/register";


import Profile from "./pages/Profile";
import NewBrew from "./pages/NewBrew";
import UserDisplay from "./pages/UserDisplay";
import BrewDisplay from "./pages/BrewDisplay";

class App extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

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
                currentUser: user
            });
        };
    };

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;

        return (
            <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                    </Link>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto navbar-loggedIn">
                             <li className="nav-item">
                                <Link to={"/feed"} className="nav-link">
                                <img src="./logo.png" alt="beer logo" className="logo" id="logo"/>
                                    {/* Feed */}
                                </Link>
                            </li>

                            <div className="userSpecific-navWrap">

                            <li className="nav-item classicNavButton-wrap">
                                <Link to={"/brew"} className="nav-link newBrew-button">
                                    Create a New Brew
                                </Link>
                            </li>

                            <li className="nav-item subMenu-wrap">
                                <Link to={"/profile"} className="nav-link">
                                <img src="./sample-avatar-2.png" alt="user avatar" className="avatar"/>
                                    {currentUser.username}
                                </Link>

                                <ul className="userMenu-showHide">
                                <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            Profile
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            Log Out
                                        </a>
                                    </li>

                                    
                                </ul>
                            </li>

                            </div>
                            
                           
                            

                            

                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto navbar-loggedOut">
                            <li className="nav-item classicNavButton-wrap">
                                <Link to={"/login"} className="nav-link classic-button">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item classicNavButton-wrap">
                                <Link to={"/register"} className="nav-link classic-button">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>
                {/* <Header /> */}
                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path={["/", "/feed"]} component={Feed} />
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


// function App() {
//     return (
//         <Router>
//             <div>
//                 <Container>
//                     <Route exact path="/brew" component={Brew} />
//                     <Route exact path="/profile" component={Profile} />
//                     <Route exact path="/feed" component={Feed} />
//                 </Container>
//                 <Footer />
//             </div>
//         </Router>
//     );
// }

export default App;
