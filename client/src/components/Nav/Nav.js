import React from "react";
import "../../App.css";
import './UserCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import FollowButton from "../../components/FollowButton";

export default function Navbar ({ currentUser }) {

    return(
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

                <SearchBar />

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
    )
}   
