import React from "react";
import "./Search.css";
import "../../App.css";
import ls from 'local-storage';
import { Redirect } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

export default function Feed() {
    if (ls.length('user')) {
        return (
            <div id="Feed">
                <SearchBar />
            </div>
        )
    } else {
        return <Redirect to="/" />
    }
} 