import React from 'react';
import "./SignUp.css";
import "../../App.css";
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="flexWrap" id="Login">
        <img src="./logo.png" alt="beer logo" className="logo"/>

        <form>
          <input type="text" placeholder="First Name" alt="enter your first name"></input>
          <input type="password" placeholder="Last Name" alt="enter your last name"></input>
          <input type="text" placeholder="email" alt="enter your email"></input>
          <input type="text" placeholder="username" alt="enter your username"></input>
          <input type="password" placeholder="password" alt="enter your password"></input>
          <button alt="log into your account">Sign Up</button>
        </form>

       <p>
          Already have an account? <Link to="/">Login</Link>
        </p>

        {/* this is the wave animation -- not finished yet so commenting out so it doesn't loop infinitely during the build */}
        {/* <div class="center">
            <div class="beer-wave"></div>
            <div class="beer-wave2"></div>
        </div> */}
    </div>
  )
}