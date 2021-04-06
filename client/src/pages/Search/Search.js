import React from "react";
import { Redirect } from "react-router-dom";
import ls from 'local-storage';
import SearchBar from "../../components/SearchBar";
import "./Search.css";
import "../../App.css";

export default function Search() {
    if (ls.get('user')) {
        return (
            <div id="Search">
                <SearchBar />
            </div>
        )
    } else {
        return <Redirect to="/" />
    }
} 