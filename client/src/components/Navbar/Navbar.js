import React from "react";
import { Link, useHistory } from 'react-router-dom';
import authService from "../../services/auth.service";
import "./style.css";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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

                <div className="userSpecific-navWrap">
                    <div className="nav-item classicNavButton-wrap">
                        <Link to={"/search"} className="nav-link newBrew-button">
                            <Button variant="contained">Search</Button>
                        </Link>
                    </div>

                    <div className="nav-item classicNavButton-wrap">
                        <Link to={"/brew"} className="nav-link newBrew-button">
                            <Button variant="contained">Create a New Brew</Button>
                        </Link>
                    </div>

                    <div>
                        
                        <Button
                            id="profileMenuButton"
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={handleClick}>
                                <Avatar alt="Logo" src="/sample-avatar.jpg" alt="user avatar" className="avatar" id="avatar" />
                                    {currentUser.username}
                        </Button>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <StyledMenuItem>

                                <Link to={"/profile"} className="nav-link">
                                    <ListItemIcon>
                                        <AccountBoxIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </Link>

                            </StyledMenuItem>

                            <StyledMenuItem>

                                <Link to={"/login"} className="nav-link" onClick={() => {
                                    authService.logout();
                                    history.push("/login");
                                }}>
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


