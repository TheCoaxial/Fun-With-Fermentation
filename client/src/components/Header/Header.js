import React from "react";
import "./Header.css";
import "../../App.css";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Link to="/feed">
                <div className="vertical-align">
                    <img src="./logo.png" alt="beer logo" className="logo"/>
                </div>
            </Link>
            
            <div className="vertical-align">
                <h2>Fun with Fermentation</h2>
            </div>

            <Link to="/profile">
                <div className="vertical-align">
                    <img src="./sample-avatar.png" alt="user avatar" className="avatar"/>
                </div>
            </Link>
            
        </header>
    )
};