// Original code by BezKoder(https://github.com/bezkoder/react-jwt-auth) 
// Extended/modified by Cory Scanlon
import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Footer from "../../components/Footer/index";
import { Link, Redirect } from 'react-router-dom';
import { Typography, TextField, Button, Avatar } from "@material-ui/core";
import "./style.css";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {

    super(props);


    console.log(this.props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
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
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="flexWrap" id="Login">
        <div className="">

          <Avatar
            alt=""
            src="/logo.png"
            className="logo"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={check => {
              this.form = check;
            }}
          >
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
                validations={[required]}
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
                validations={[required]}
              />
            </div>

            <div className="">
              <Button
                variant="contained"
                type="submit"
                className=""
                disabled={this.state.loading}>

                {this.state.loading && (
                  <span className=""></span>
                )}
                <span>Login</span>
              </Button>
            </div>

            {this.state.message && (
              <div className="">
                <div className="" role="alert">
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
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Typography>

          <Footer />

        </div>
      </div>
    );
  }
}