import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Footer from "../Footer/index";
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

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 4 || value.length > 20) {
    return (
      <div className="" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="" role="alert">
        The password must be between 6 and 40 characters.
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

    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.handleRegister = this.handleRegister.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    

   
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

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="flexWrap" id="Register">
        <div>
          <img
            src="./logo.png"
            alt="logo"
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
                <div>
                  <Input
                    type="text"
                    className=""
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    className=""
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    className=""
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn">Sign Up</button>
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

          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>

          <Footer />

        </div>
      </div>
    );
  }
}