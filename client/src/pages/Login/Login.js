import React from 'react';
import "./Login";
import "./Login.css";
import "../../App.css";
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flexWrap" id="Login">
        <img src="./logo.png" alt="beer logo" className="logo"/>

        <form>
          <input type="text" placeholder="username/email" alt="enter your username or email"></input>
          <input type="password" placeholder="password" alt="enter your password"></input>
          <button alt="log into your account">Log In</button>
        </form>

       <p>
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>

        {/* this is the wave animation -- not finished yet so commenting out so it doesn't loop infinitely during the build */}
        {/* <div class="center">
            <div class="beer-wave"></div>
            <div class="beer-wave2"></div>
        </div> */}
    </div>
  )
}