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

import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import { Input, Grid, Typography, Avatar, IconButton } from '@material-ui/core'


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userFav: [],
      userData: [],
      brews: [],
      following: [],
      bio: "",
      isBioEdit: false,
      visitedIds: ls.get('visited') || [],
      visitedPages: []
    };

  }

  componentDidMount() {


    api.getUserProfile(this.state.currentUser.id).then(res => {
      let userData = res.data[0];
      this.setState({
        contributionScore: userData.contributionScore,
        bio: userData.bio,
        userData: res.data[0]
      });
    })

    api.getUserFavorites(this.state.currentUser.id).then(res => {
      this.setState({ userFav: res.data });
    })

    api.getUserBrews(this.state.currentUser.id).then(res => {
      //console.log(" userBrews", res.data);
      this.setState({ brews: res.data });
    })

    this.recentlyViewed();


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




    let BrewsJSX = brews.map(brew => <RecipeCard
      UserId={brew.UserId}
      id={brew.id}
      name={brew.name}
      description={brew.description}
      author={brew.author}
      id={brew.id}
      UserId={brew.UserId} />);

    let FollowingJSX = following.map(person => <UserCard
      key={person.id}
      id={person.id}
      username={person.name}
      bio={person.bio}
      score={person.score}
    />)


    let LastViewedJSX = pages.map(person => <UserCard
      id={person.data[0].id}
      username={person.data[0].username}
      bio={person.data[0].bio}
      score={person.data[0].contributionScore}
    />)
    console.log("lastviewed", LastViewedJSX);
    let FavBrewsJSX = userFav.map(({ Brew }) => <RecipeCard
      key={Brew.id}
      UserId={Brew.UserId}
      id={Brew.id}
      name={Brew.name}
      description={Brew.description}
      author={Brew.author}
      UserId={Brew.UserId}
    />);


    let bioJSX =
      <div id="bio">
        <Typography gutterBottom variant="body3" component="p" id="bio">
          {this.state.bio || "No Bio"}
        </Typography>
        <IconButton
          onClick={(event) => {
            event.preventDefault();
            this.setState({ isBioEdit: !this.state.isBioEdit });
          }}
          aria-label="create">
          <CreateIcon />
        </IconButton>
      </div>;

    if (this.state.isBioEdit) {
      bioJSX = <div id="bio">
        <Input multiline={true} value={this.state.bio} onChange={(e) => {
          this.setState({ bio: e.target.value });
        }}>
        </Input>
        <IconButton
          onClick={(event) => {
            event.preventDefault();
            this.setState({ isBioEdit: !this.state.isBioEdit });
            api.updateUser(this.state.currentUser.id, this.state.bio, false);
          }}
          aria-label="submit">
          <CheckIcon />
        </IconButton>
      </div>
    }

    // Currently just displays Info about the user from the DB
    return (
      <div id="Profile">
              <Grid container spacing={3}>
                  <Grid item xs={4} className="sidebarWrap">

                    <Avatar alt="Remy Sharp" src="./sample-avatar.jpg" className="avatar"/>


            {bioJSX}

            <div className="miniFeedWrap">
              <Typography gutterBottom variant="h5" component="h1">
              Following
                            </Typography>
              {FollowingJSX}
            </div>

          </Grid>
          <Grid item xs={4}>
            <div className="miniFeedWrap">
              <Typography gutterBottom variant="h5" component="h1">
              Last Viewed Profiles:
                          </Typography>
              {LastViewedJSX}
            </div>

            <div className="miniFeedWrap">
              <Typography gutterBottom variant="h5" component="h1">
              Top Recipes
                          </Typography>
              {BrewsJSX}
            </div>

          </Grid>

          <Grid item xs={4}>
            <div className="miniFeedWrap">
              <Typography gutterBottom variant="h5" component="h1">
              Favorite Brews
                                </Typography>
              {/* {FavBrewsJSX} */}
              {BrewsJSX}
            </div>
          </Grid>
        </Grid>

      </div >

    );
  }
}