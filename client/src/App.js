import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "../src/components/Container";
import Brew from "../src/pages/Brew";
import Profile from "../src/pages/Profile";
import Feed from "../src/pages/Feed";
import Footer from "../src/components/Footer";
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Container>
                    <Route exact path="/brew" component={Brew} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/feed" component={Feed} />
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
