import React, { Component, useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/Footer";
import './App.css';
import ls from 'local-storage'
import AuthService from "./services/auth.service";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/login";
import Register from "./pages/register";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Profile from "./pages/Profile";
import NewBrew from "./pages/NewBrew";
import UserDisplay from "./pages/UserDisplay";
import BrewDisplay from "./pages/BrewDisplay";
import Navbar from './components/Navbar/Navbar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

class App extends Component {
    constructor(props) {
        super(props);

        this.handleNavbarRender = this.handleNavbarRender.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            anchorEl: null
        };
    };

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
        console.log(this.state.anchorEl);
    };

    handleClose() {
        this.setState({ anchorEl: null });
        console.log(this.state.anchorEl);
    };
    
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user.username,
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
                        <Route exact path="/register" component={(props) => <Register history={props.history} setCurrentUser={this.handleNavbarRender} />} />
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
