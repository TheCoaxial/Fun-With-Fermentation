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
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


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
      key={person.id}
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
      key={Brew.id}
      UserId={Brew.UserId}
      id={Brew.id}
      name={Brew.name}
      description={Brew.description}
      author={Brew.author}
      UserId={Brew.UserId}
      />);
     

    return (
            <div id="Profile">

              <Grid container spacing={3}>
                  <Grid item xs={4} className="sidebarWrap">

                    <Avatar alt="Remy Sharp" src="./sample-avatar.jpg" className="avatar"/>

                        <Typography gutterBottom variant="body3" component="p" id="bio">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                          </Typography>

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
         
        

    );
  }
}