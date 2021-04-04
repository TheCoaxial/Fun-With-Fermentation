import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ls from 'local-storage';
import API from "../../utils/api";
import PlaceHolderCard from "../../components/PlaceHolderCard/PlaceHolderCard";
import UserCard from "../../components/UserCard/UserCard.js";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./profile.css";
import CheckIcon from '@material-ui/icons/Check';
import { Input, Grid, Typography, Avatar, IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
/* import CurrentBrews from "../../components/CurrentBrews/CurrentBrews";
import StarIcon from '@material-ui/icons/Star'; */

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

    API
        .getUserProfile(this.state.currentUser.id)
        .then(res => {
            let userData = res.data[0];
            console.log(userData);
            this.setState({
                contributionScore: userData.contributionScore,
                bio: userData.bio,
                userData: res.data[0]
            });
        });

    API
        .getUserFavorites(this.state.currentUser.id)
        .then(res => this.setState({ userFav: res.data }));

    API
        .getUserBrews(this.state.currentUser.id)
        .then(res => this.setState({ brews: res.data }));

    API
        .getUserFollowing(this.state.currentUser.id)
        .then(res => this.setState({ following: res.data }));

    this.recentlyViewed();
  };

  recentlyViewed() {

    let parsedIds;
    try {
      parsedIds = JSON.parse(this.state.visitedIds);
    } catch {
      console.log("No user data to display");
    }
    let uniqueIds = [...new Set(parsedIds)];

    const removeCurrentUser = uniqueIds.indexOf(JSON.stringify(this.state.currentUser.id));

    if (removeCurrentUser > -1) {
      uniqueIds.splice(removeCurrentUser, 1);
    }

    let collectedData = [];
    uniqueIds.forEach(Ids => {
/*       console.log("ids", uniqueIds); */
      API.getUserProfile(Ids)
        .then(res => {
          collectedData.push(res);
/*           console.log("data", collectedData) */
          this.setState({ visitedPages: collectedData })
        });
    })
  }

  render() {
    //const score = this.state.contributionScore;
    const pages = this.state.visitedPages
    //const currentUser = this.state.userData;
    const brews = this.state.brews;
    const userFav = this.state.userFav;
    const following = this.state.following;

    let BrewsJSX = brews.map(brew => <RecipeCard
      id={brew.id}
      name={brew.name}
      description={brew.description}
      author={brew.author}
      UserId={brew.UserId}
    />);

    let FollowingJSX = following.map(({ Following }) => <UserCard
      key={Following.id}
      id={Following.id}
      username={Following.username}
      bio={Following.bio}
      score={Following.contributionScore}
    />);

    let LastViewedJSX = pages.map(person => <UserCard
      key={person.data[0].id}
      id={person.data[0].id}
      username={person.data[0].username}
      bio={person.data[0].bio}
      score={person.data[0].contributionScore}
    />);
    LastViewedJSX.splice(3);
    
    let FavBrewsJSX = userFav.map(({ Brew }) => <RecipeCard
      key={Brew.id}
      id={Brew.id}
      name={Brew.name}
      description={Brew.description}
      author={Brew.author}
      UserId={Brew.UserId}
    />);

    let createdAtValue = this.state.userData.createdAt;

    if (createdAtValue != undefined) {
      createdAtValue = this.state.userData.createdAt.split("T")[0];
    }

    let bioJSX =
      <div id="bioViewState">
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              this.setState({ isBioEdit: !this.state.isBioEdit });
            }}
            aria-label="create">
              <Typography gutterBottom variant="body3" component="p" id="bioText">
                {this.state.bio || "Insert your bio here!"}
              </Typography>
              <CreateIcon />
          </IconButton>
      </div>;

    if (this.state.isBioEdit) {
      bioJSX = <div id="bioEditState">
        <Input multiline={true} value={this.state.bio} onChange={(e) => {
          this.setState({ bio: e.target.value });
        }}>
        </Input>
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              this.setState({ isBioEdit: !this.state.isBioEdit });
              API.updateUser(this.state.currentUser.id, this.state.bio, false);
            }}
            aria-label="submit">
            <CheckIcon />
          </IconButton>
      </div>
    }

    return (
        <div id="Profile">
            <Grid container spacing={3}>
                <Grid item lg={3} sm={12} className="sidebarWrap">
                      <Avatar alt="Remy Sharp" src="./sample-avatar.jpg" className="avatar" />
                  <Typography variant="h2" align="center" id="userName">
                      {this.state.currentUser.username}
                  </Typography>
                  {bioJSX}

                  <div className="bioSubheadFlex">
                    <Typography component="p" align="center" variant="h6">
                        <span className="br bioSubheadTitle">
                            Joined
                        </span>
                        <span className="br">
                            {createdAtValue}
                        </span>
                    </Typography>

                    <Typography align="center" component="p" variant="h6">
                        <span className="br bioSubheadTitle">
                            Score
                        </span>
                        <span className="br">
                            {this.state.userData.contributionScore}
                        </span>
                    </Typography>
                  </div> 
                  <div className="miniFeedWrap">
                        <Typography gutterBottom variant="h5" component="h1">
                            Recently Viewed Profiles:
                        </Typography>
                        {this.state.visitedPages[0] ? (LastViewedJSX) 
                        :
                        <PlaceHolderCard
                            mockTitle= "Profiles you've seen"
                            description="This is where you'll find all the profiles 
                            you've visited today!"
                        >
                        </PlaceHolderCard> }
                    </div>
                </Grid>

                <Grid item lg={3} sm={12}>
                    <div className="miniFeedWrap">
                          <Typography gutterBottom variant="h5" component="h1">
                              Following
                          </Typography>
                          {this.state.following[0] ? (FollowingJSX) 
                          :
                          <PlaceHolderCard
                              mockTitle= "People You Follow"
                              description="This is where you'll find all the profiles 
                              that you follow!"
                          >
                          </PlaceHolderCard> }
                    </div>
                </Grid>

                <Grid item lg={3} sm={12}>
                    <div className="miniFeedWrap">
                        <Typography gutterBottom variant="h5" component="h1">
                            Saved Brews
                        </Typography>
                        {this.state.userFav[0] ? (FavBrewsJSX) :
                         (<PlaceHolderCard
                            mockTitle= "Favorite Brews"
                            description="This is where you'll find all the information
                            about all the brews that you favorite!"
                          >
                         </PlaceHolderCard>) }  
                    </div>
                </Grid>
                <Grid item lg={3} sm={12}>
                    <div className="miniFeedWrap">
                        <Typography gutterBottom variant="h5" component="h1">
                            My Brews
                        </Typography>
                        {this.state.brews[0] ? (BrewsJSX) 
                        : 
                        (<PlaceHolderCard
                          mockTitle= "Uploaded Brews"
                          description="This is where you'll find all the information
                          about all the brews that you upload!"
                        >
                      </PlaceHolderCard>) }
                    </div>
                </Grid>
            </Grid>
        </div >
    );
  }
}