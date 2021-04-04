import React from "react";
import { Link, useHistory } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import "./style.css";
import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import { AccountBox, ExitToApp } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';

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

export default function Navbar({ currentUser }) {

    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
        </Link>

        {currentUser ? (
            <div className="navbar-nav ml-auto navbar-loggedIn">
                <div className="nav-item">
                    <Link to={"/feed"} className="nav-link">
                        <Avatar alt="Logo" src="/logo.png" alt="beer logo" className="logo" id="logo" />
                    </Link>
                </div>

                <div className="nav-item classicNavButton-wrap">
                    <Link to={"/search"} className="nav-link newBrew-button">
                        <Button variant="contained">Search</Button>
                    </Link>
                </div>

                <div className="nav-item classicNavButton-wrap">
                    <Link to={"/brew"} className="nav-link newBrew-button">
                        <Button variant="contained">Create Brew</Button>
                    </Link>
                </div>

                <div className="userSpecific-navWrap">

                    <div>
                        <Button
                            id="profileMenuButton"
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={handleClick}
                        >
                            <Avatar alt="Logo" src="/sample-avatar.jpg" alt="user avatar" className="avatar" id="avatar" />
                            {currentUser.username}
                        </Button>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <StyledMenuItem>

                                <Link to={"/profile"} className="nav-link">
                                    <ListItemIcon>
                                        <AccountBox fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </Link>

                            </StyledMenuItem>

                            <StyledMenuItem>

                                <Link to={"/"} className="nav-link" onClick={() => {
                                    AuthService.logout();
                                    history.push("/");
                                }}>
                                    <ListItemIcon>
                                        <ExitToApp fontSize="small" />
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
    </nav>)
}


