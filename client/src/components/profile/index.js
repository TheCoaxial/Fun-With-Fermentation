import React, { Component } from "react";
import AuthService from "../../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

        this.state = {
        currentUser: AuthService.getCurrentUser()
        };
    }

  render() {
    const { currentUser } = this.state;

    // Currently just displays Info about the user from the DB
    return (
      <div className="">
            <header className="">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Web Token:</strong>{" "}
                {currentUser.accessToken}
            </p>
            <p>
                <strong>User Id in DB:</strong>{" "}
                {currentUser.id}
            </p>
            <p>
                <strong>User Email:</strong>{" "}
                {currentUser.email}
            </p>
      </div>
    );
  }
}