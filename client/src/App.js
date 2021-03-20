import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "../src/components/Container";
import Brew from "../src/pages/Brew";
import Profile from "../src/pages/Profile";
import Feed from "../src/pages/Feed";
import Footer from "../src/components/Footer";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp"
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App-body">
            <Router>
                <div>
                    <Container>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/brew" component={Brew} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/feed" component={Feed} />
                    </Container>
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;
