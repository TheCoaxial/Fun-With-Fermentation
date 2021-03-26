import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import Header from "../../components/Header/Header";
import UserCard from "../../components/UserCard/UserCard.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./profile.css";
import CurrentBrews from "../../components/CurrentBrews/CurrentBrews";

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
      // <div className="">
      //       <header className="">
      //           <h3>
      //               <strong>{currentUser.username}</strong> Profile
      //           </h3>
      //       </header>
      //       <p>
      //           <strong>Web Token:</strong>{" "}
      //           {currentUser.accessToken}
      //       </p>
      //       <p>
      //           <strong>User Id in DB:</strong>{" "}
      //           {currentUser.id}
      //       </p>
      //       <p>
      //           <strong>User Email:</strong>{" "}
      //           {currentUser.email}
      //       </p>
      // </div>
      <div id="Profile">
        <div className="leftColumn">

          <img src="./sample-avatar.png" alt="user avatar" className="profile-avatar"/>
          
          <div className="bio">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
          </div>

          
          <div className="sidebarWrap">
              <div className="popularUsersFeed">
                  <div className="sidebarHeader"><h3 className="white header">Following:</h3></div>
                  <UserCard />
                  <div className="sidebarFooter"></div>
              </div>

              <div className="profileBlock community-points">
                <p>Community Points</p>
                <h3>93</h3>
              </div>
          </div>
          </div>

          <div className="mainFlexWrap">
              <div className="currentBrews">
                  <CurrentBrews />
              </div>

              <div class="horizontal-flex">
                <div className="vertical-flex">
                  <div className="popularRecipesFeed">
                      <div className="sidebarHeader"><h3 className="white header">Top Recipes</h3></div>
                      <RecipeCard />
                      <div className="sidebarFooter"></div>
                  </div>

                    <div className="viewedUsersFeed">
                      <div className="sidebarHeader"><h3 className="white header">Last View Profiles:</h3></div>
                      <UserCard />
                      <div className="sidebarFooter"></div>
                    </div>                  
                </div>

                  <div className="favoriteRecipesFeed">
                      <div className="sidebarHeader"><h3 className="white header">Favorite Recipes</h3></div>
                      <RecipeCard />
                      <div className="sidebarFooter"></div>
                  </div>
              </div>
          </div>
      </div>
      
    );
  }
}