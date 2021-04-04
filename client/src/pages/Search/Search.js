import React from "react";
import { Redirect } from "react-router-dom";
import ls from 'local-storage';
import SearchBar from "../../components/SearchBar";
import "./Search.css";
import "../../App.css";

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