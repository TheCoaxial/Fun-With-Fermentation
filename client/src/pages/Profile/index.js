import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ls from 'local-storage';
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
      userData: [],
      brews: [],
      following: [],
      visitedIds: ls.get('visited') || [],
      visitedPages: []
    };

  }

  componentDidMount() {

    //this.setState({ vis })
    console.log(" removed userId", this.state.visitedPages);

    api.getUserProfile(this.state.currentUser.id).then(res => {
      console.log("user", res)
      this.setState({ userData: res.data[0] });
    })

    api.getUserFavorites(this.state.currentUser.id).then(res => {
      //console.log("Favorites ",res.data);
      this.setState({ userFav: res.data });
    })

    api.getUserBrews(this.state.currentUser.id).then(res => {
      //console.log(" userBrews", res.data);
      this.setState({ brews: res.data });
    })

    this.recentlyViewed();

    // console.log(" ls.get",ls.get('visited'));

  };

  recentlyViewed() {

    let parsedIds;
    try {
      parsedIds = JSON.parse(this.state.visitedIds);
    } catch {
      console.log("No user data to display");
    }
    let uniqueIds = [... new Set(parsedIds)];

    const removeCurrentUser = uniqueIds.indexOf(JSON.stringify(this.state.currentUser.id));

    if (removeCurrentUser > -1) {
      uniqueIds.splice(removeCurrentUser, 1);
    }

    let collectedData = [];
    uniqueIds.forEach(Ids => {
      console.log("ids", uniqueIds);
      api.getUserProfile(Ids)
        .then(res => {

          collectedData.push(res);
          console.log("data", collectedData)
          this.setState({ visitedPages: collectedData })
        });
    })
  }

  render() {
    //hard coding a following list

    const following =
      [{
        name: "Bob Jim",
        bio: "Moonshiner extrodonair"
      },
      {
        name: "Bill Tim",
        bio: "Moonshiner extra extrodonair"
      }];

    //const score = this.state.contributionScore;
    const pages = this.state.visitedPages
    const brews = this.state.brews;
    const userFav = this.state.userFav;
    const currentUser = this.state.userData;


    let BrewsJSX;

    BrewsJSX = brews.map(brew => <RecipeCard
      UserId={brew.UserId}
      id={brew.id}
      name={brew.name}
      description={brew.description}
      author={brew.author}
      id={brew.id}
      UserId={brew.UserId} />);

    let FollowingJSX;

    FollowingJSX = following.map(person => <UserCard
      id={person.id}
      username={person.name}
      bio={person.bio}
      score={person.score}
    />)

    let LastViewedJSX;

    LastViewedJSX = pages.map(person => <UserCard
      id={person.data[0].id}
      username={person.data[0].username}
      bio={person.data[0].bio}
      score={person.data[0].contributionScore}
    />)
    console.log("lastviewed", LastViewedJSX);
    let FavBrewsJSX = userFav.map(({ Brew }) => <RecipeCard
      UserId={Brew.UserId}
      id={Brew.id}
      name={Brew.name}
      description={Brew.description}
      author={Brew.author}
      id={Brew.id}
      UserId={Brew.UserId}
    />);

    // Currently just displays Info about the user from the DB
    return (
      <div id="Profile">
        <div className="leftColumn">
          {/* {console.log("Love", LastViewedJSX)} */}
          <img src="./sample-avatar.png" alt="user avatar" className="profile-avatar" />

          <div className="bio">
            <p>{currentUser.bio || "No Bio"}</p>
          </div>


          <div className="sidebarWrap">
            <div className="popularUsersFeed">
              <div className="sidebarHeader"><h3 className="white header">Following:</h3></div>

              {FollowingJSX}
              <div className="sidebarFooter"></div>
            </div>

            <div className="profileBlock community-points">
              <p>Community Points</p>
              <h3>{currentUser.contributionScore}</h3>
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
                {BrewsJSX}
                <div className="sidebarFooter"></div>
              </div>

              <div className="viewedUsersFeed">
                <div className="sidebarHeader"><h3 className="white header">Last View Profiles:</h3></div>
                {LastViewedJSX}
                <div className="sidebarFooter"></div>
              </div>
            </div>

            <div className="favoriteRecipesFeed">
              <div className="sidebarHeader"><h3 className="white header">Favorite Recipes</h3></div>
              {FavBrewsJSX || "No one viewed yet"}
              <div className="sidebarFooter"></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}