import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Route, Link, BrowserRouter as Router  } from "react-router-dom";

// import Container from "../src/components/Container";
import Brew from "../src/pages/Brew";
// import Profile from "../src/pages/Profile";
// import Footer from "../src/components/Footer";
// import logo from './logo.svg';
import './App.css';

import AuthService from "./services/auth.service";

import Feed from "../src/pages/Feed/Feed";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Profile from "./pages/Profile";

class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      };
    }
  
    componentDidMount() {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user
          
        });
      }
    }
  
    logOut() {
      AuthService.logout();
    }
  
    render() {
      const { currentUser } = this.state;
  
      return (
        <div>
            <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
             
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
            </div>
  
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
                <li className="nav-item">
                <Link to={"/feed"} className="nav-link">
                  Feed
                </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/brew"} className="nav-link">
                    Brew
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
            </nav>
  
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/brew" component={Brew} />      
            </Switch>
          </div>
          </Router>
        </div>
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
