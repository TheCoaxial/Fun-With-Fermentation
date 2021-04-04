import React from "react";
import { Link } from 'react-router-dom';
import authService from "../../services/auth.service";

export default function Navbar({ currentUser }) {

    return (<nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
        </Link>

        {currentUser ? (
            <div className="navbar-nav ml-auto navbar-loggedIn">
                <li className="nav-item">
                    <Link to={"/feed"} className="nav-link">
                        <img src="./logo.png" alt="beer logo" className="logo" id="logo" />
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
                            <img src="./sample-avatar-2.png" alt="user avatar" className="avatar" />
                            {currentUser}
                        </Link>

                        <ul className="userMenu-showHide">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
                    </Link>
                            </li>

                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={() => {
                                    authService.logout();
                                    this.props.history.push("/login");
                                }}>
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
    </nav>)
}


