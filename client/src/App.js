import React, { Component } from "react";
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
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

        this.logOut = this.logOut.bind(this);
        this.handleClick.bind(this);
        this.handleClose.bind(this);
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
                currentUser: user,
                visited: ls.get('visited') || []
            });
        };
    };

    logOut() {
        window.location.href="/login";
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
                                <Avatar alt="Logo" src="/logo.png" alt="beer logo" className="logo" id="logo" />
                                </Link>
                            </li>

                            <div className="userSpecific-navWrap">

                                <li className="nav-item classicNavButton-wrap">
                                    <Link to={"/brew"} className="nav-link newBrew-button">
                                        <Button variant="contained">Create a New Brew</Button>
                                    </Link>
                                </li>

                                <div>
                                    <Button
                                        id="profileMenuButton"
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                        onClick={this.handleClick}>
                                            <Avatar alt="Logo" src="/sample-avatar.jpg" alt="user avatar" className="avatar" id="avatar" />
                                                {currentUser.username}
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={this.state.anchorEl}
                                        keepMounted
                                        open={this.state.anchorEl}
                                        onClose={this.handleClose}>
                                        <StyledMenuItem>
                                            
                                            <Link to={"/profile"} className="nav-link">
                                                <ListItemIcon>
                                                    <AccountBoxIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Profile" />
                                            </Link>
                                            
                                        </StyledMenuItem>

                                        <StyledMenuItem>

                                            <Link className="nav-link" onClick={this.logOut}>
                                                <ListItemIcon>
                                                        <ExitToAppIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Log Out" />
                                            </Link>
                                            
                                        </StyledMenuItem>
                                    </StyledMenu>
                                </div>

                            </div>
                            
                        </div>

                    ) : (
                        <div className="navbar-nav ml-auto navbar-loggedOut">
                            <li className="nav-item classicNavButton-wrap">
                                <Link to={"/login"} className="nav-link classic-button">
                                    <Button variant="contained">Login</Button>
                                </Link>
                            </li>
                            <li className="nav-item classicNavButton-wrap">
                                <Link to={"/register"} className="nav-link classic-button">
                                    <Button variant="contained">Sign Up</Button>
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

export default App;
