import React, { Component } from "react";
import AuthService from "../../services/auth.service";
// import Header from "../profile/index";
// import FollowingCard from "../../components/FollowingList/FollowingList";
import api from "../../utils/api";
import UserCard from "../../components/UserCard/UserCard.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./profile.css";
import CurrentBrews from "../../components/CurrentBrews/CurrentBrews";


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userFav: [],
      contributionScore: "",
      brews: [],
      following: []
    };



  }

  componentDidMount() {

    api.getUserProfile(this.state.currentUser.id).then(res => {
      this.setState({ contributionScore: res.data[0].contributionScore });
    })

    api.getUserBrews(this.state.currentUser.id).then(res => {

      this.setState({ brews: res.data });
    })

    // An api call to favorites will go here

    api.getBrews().then(res => {
      console.log(res);
      this.setState({ userFav: res.data });
    })

    // An api call to retrieve following will go here

  };



  render() {
    //hard coding a following list
    const following = [{
      name: "Bob Jim",
      bio: "Moonshiner extrodonair"
    },
    {
      name: "Bill Tim",
      bio: "Moonshiner extra extrodonair"
    }];

    const recentlyVisited = [{
      name: "Billy Joe",
      bio: "Home Brewer"
    },
    {
      name: "Mary Sue",
      bio: "Professional home brewer"
    }];

    const score = this.state.contributionScore;

    const brews = this.state.brews;
    const userFav = this.state.userFav;

    let BrewsJSX;

    BrewsJSX = brews.map(brew => <RecipeCard name={brew.name}
      description={brew.description}
      author={brew.author} />);

    let FollowingJSX;

    FollowingJSX = following.map(person => <UserCard username={person.name}
      bio={person.bio}
      score={person.score} />)

    let LastViewedJSX;

    LastViewedJSX =  recentlyVisited.map(person => <UserCard username={person.name}
      bio={person.bio}
      score={person.score} />)

    let FavBrewsJSX = userFav.map(brew => <RecipeCard name={brew.name}
      description={brew.description}
      author={brew.author} />);

    


    // Currently just displays Info about the user from the DB
    return (
      <div id="Profile">
        <div className="leftColumn">
          {/* {console.log("Love", brews)} */}
          <img src="./sample-avatar.png" alt="user avatar" className="profile-avatar" />

          <div className="bio">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
          </div>


          <div className="sidebarWrap">
            <div className="popularUsersFeed">
              <div className="sidebarHeader"><h3 className="white header">Following:</h3></div>
              {/* {console.log("Inside Profile",person)} */}
                {LastViewedJSX}
              <div className="sidebarFooter"></div>
            </div>

            <div className="profileBlock community-points">
              <p>Community Points</p>
              <h3>{score}</h3>
            </div>
          </div>
        </div>

        <div className="mainFlexWrap">
          <div className="currentBrews">
            <CurrentBrews />
          </div>

          <div className="horizontal-flex">
            <div className="vertical-flex">
              <div className="popularRecipesFeed">
                <div className="sidebarHeader"><h3 className="white header">Top Recipes</h3></div>
                {/* {console.log(" Inside profile",brews)} */}
                {BrewsJSX}
                <div className="sidebarFooter"></div>
              </div>

              <div className="viewedUsersFeed">
                <div className="sidebarHeader"><h3 className="white header">Last View Profiles:</h3></div>
                {FollowingJSX}
                <div className="sidebarFooter"></div>
              </div>
            </div>

            <div className="favoriteRecipesFeed">
              <div className="sidebarHeader"><h3 className="white header">Favorite Recipes</h3></div>
              {FavBrewsJSX}
              <div className="sidebarFooter"></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}