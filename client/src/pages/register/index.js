// Original code by BezKoder(https://github.com/bezkoder/react-jwt-auth) 
// Extended/modified by Cory Scanlon
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Footer from "../../components/Footer/index";
import { Typography, TextField, Button, Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { isEmail } from "validator";
import "./style.css";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="" role="alert">
        This field is required!
      </div>
    );
  }
};

const verifyEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="" role="alert">
        Please enter a valid email.
      </div>
    );
  }
};

const veryifyUsername = value => {
  if (value.length < 4 || value.length > 20) {
    return (
      <div className="" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const verifyPassword = value => {
  if (value.length < 5 || value.length > 30) {
    return (
      <div className="" role="alert">
        The password must be between 5 and 30 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);

    this.handleRegister = this.handleRegister.bind(this);

  }

  logincall = function (username, password) {

    AuthService.login(username, password).then(
      ({ username }) => {
        this.props.setCurrentUser(username);
        this.props.history.push("/profile");
      },
      error => {
        const resMsg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.toString();

        this.setState({
          loading: false,
          message: resMsg
        });
      }
    );
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleRegister(event) {
    event.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      )
        .then(
          response => {
            this.logincall(response.data.username, this.state.password)
            this.setState({
              message: response.data.message,
              successful: true
            }, console.log("Message ", response.data));
          },
          error => {
            const resMsg =
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMsg
            });
          }
        )

    }
    this.form.validateAll();
  }

  render() {
    return (
      <div className="flexWrap" id="Register">
        <div>
          <Avatar
            alt=""
            src="/logo.png"
            className="logo"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={check => {
              this.form = check;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="inputWrapper">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    className=""
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, veryifyUsername]}
                  />
                </div>

                <div className="inputWrapper">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    className=""
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, verifyEmail]}
                  />
                </div>

                <div className="inputWrapper">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="password"
                    className=""
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, verifyPassword]}
                  />
                </div>

                <div className="form-group">

                  <Button
                    variant="contained"
                    type="submit"
                    className="btn">
                    Sign Up
                  </Button>

                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert"
                      : "alert"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={check => {
                this.checkBtn = check;
              }}
            />
          </Form>

          <Typography variant="body1" gutterBottom>
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>

          <Footer />

        </div>
      </div>
    );
  }
}