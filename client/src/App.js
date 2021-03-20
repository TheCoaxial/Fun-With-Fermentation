import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Route, Link, BrowserRouter as Router  } from "react-router-dom";
// import Container from "../src/components/Container";
// import Brew from "../src/pages/Brew";
// import Profile from "../src/pages/Profile";
// import Feed from "../src/pages/Feed";
// import Footer from "../src/components/Footer";
// import logo from './logo.svg';
import './App.css';

import AuthService from "./services/auth.service";

import Login from "./components/login/index";
import Register from "./components/register/index";
import Home from "./components/home/index";
import Profile from "./components/profile/index";
import BoardUser from "./components/userpage/index";


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
  
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
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
              <Route path="/user" component={BoardUser} />
              
            </Switch>
          </div>
          </Router>
        </div>
      );
    }
  }


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
