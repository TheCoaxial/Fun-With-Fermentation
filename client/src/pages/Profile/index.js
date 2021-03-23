import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";

export default class Profile extends Component {
  
  constructor(props) {
    super(props);
        this.state = {
        currentUser: AuthService.getCurrentUser(),
        brewName: [],
        brewIngredients: [],
        brewAuthor: "",
        brewDescription: ""

        };
    }
    
  componentDidMount = () =>{
    let userID = this.state.currentUser.id;
    API.getUserBrews(userID). then((res) =>{
      console.log(res);
      for (let i = 0; i < res.data.length; i++){
        this.setState({
          brewName: [...this.state.brewName, res.data[i].name + " "],
          brewIngredients: [...this.state.brewIngredients, res.data[i].ingredients + " "],
          brewDescription: [...this.state.brewDescription, res.data[i].description + " "],
        });
      }
      console.log(this.state.brewName)
    })
    .catch((err) => {
      console.log(err);
    });
  }
    
  render() {
    const { currentUser } = this.state;
    // const  currentUserBrews = this.state.userBrews;
    // Currently just displays Info about the user from the DB
    console.log(currentUser);
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
            <p>
                <strong>Brew Name:</strong>{" "}
                {/* {console.log(currentUserBrews)} */}
                {this.state.brewName}
            </p>
            <p>
                <strong>Brew ingredients:</strong>{" "}
                {/* {console.log(currentUserBrews)} */}
                {this.state.brewIngredients}
            </p>
            <p>
                <strong>Brew Description:</strong>{" "}
                {/* {console.log(currentUserBrews)} */}
                {this.state.brewDescription}
            </p>
      </div>
    );
  }
}