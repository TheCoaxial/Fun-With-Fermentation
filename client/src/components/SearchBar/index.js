import React, { useState } from 'react';
import "./style.css";
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import RecipeCard from '../RecipeCard/RecipeCard';
import UserCard from '../UserCard/UserCard';
import { InputBase, Select, MenuItem, Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import API from '../../utils/api';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '15px 26px 15px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from
    paddingLeft: `calc(1em + ${theme.spacing(2.5)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("Brew");
  const [searchResults, setSearchResults] = useState({ type: 'brew', results: [] });
  const [difficulty, setDifficulty] = useState("all");

  const handleDifficultyChange = event => {
    setDifficulty(event.target.value);
  };

  const difficultyButton = (searchType) => {
    if (searchType === "Brew" || searchType === "Ingredient") {
      return (
        <div className="searchDifficultyWrapper">
          <Select
            labelId="difficulty-select-label"
            id="difficulty-select"
            value={difficulty}
            onChange={handleDifficultyChange}
            input={<BootstrapInput />}>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"beginner"}>Beginner</MenuItem>
            <MenuItem value={"intermediate"}>Intermediate</MenuItem>
            <MenuItem value={"expert"}>Expert</MenuItem>
            <MenuItem value={"unknown"}>Unknown</MenuItem>
          </Select>
        </div>
      )
    }
  }

  const handleTypeChange = event => {
    setSearchType(event.target.value);
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    switch (searchType) {
      case "Brew":
        if (difficulty !== "all") {
          API
            .difficultBrewSearch(search, difficulty)
            .then(res => setSearchResults({ type: 'brew', results: res.data }));
        } else {
          API
            .searchBrews(search, difficulty)
            .then(res => setSearchResults({ type: 'brew', results: res.data }));
        }
        break;
      case "Ingredient":
        if (difficulty !== "all") {
          API
            .difficultIngredientSearch(search, difficulty)
            .then(res => setSearchResults({ type: 'ingredient', results: res.data }));
        } else {
          API
            .searchIngredients(search)
            .then(res => setSearchResults({ type: 'ingredient', results: res.data }));
        }
        break;
      case "User":
        API
          .searchUsers(search)
          .then(res => setSearchResults({ type: 'user', results: res.data }));
        break;
    }
  };

  let resultsJSX;

  if (searchResults.type === "user") {
    resultsJSX = searchResults.results.map(result => <UserCard
      key={result.id}
      username={result.username}
      bio={result.bio}
      score={result.contributionScore}
      id={result.id} />);
  } else if (searchResults.type === "brew") {
    resultsJSX = searchResults.results.map(result => <RecipeCard
      key={result.id}
      difficulty={result.difficulty}
      name={result.name}
      description={result.description}
      author={result.author}
      id={result.id}
      UserId={result.UserId} />
    );
  } else {
    let prevKey = -1;
    resultsJSX = searchResults.results.map(({ Brew }) => {
      if (prevKey === Brew.id) {
        return;
      }
      prevKey = Brew.id;
      return <RecipeCard
        key={Brew.id}
        difficulty={Brew.difficulty}
        name={Brew.name}
        description={Brew.description}
        author={Brew.author}
        id={Brew.id}
        UserId={Brew.UserId} />
    });
  }

  return (
    <div className={classes.grow} id="searchWrapper">
      <h2>Search Brews, Ingredients, or Users</h2>
      <form onSubmit={handleSubmit} id="searchInputs">
        <div className={classes.search} id="searchBox">
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div id="searchBoxVerticalAlign">
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="searchTypeWrapper">
          <Select
            labelId="type-select-label"
            id="type-select"
            value={searchType}
            onChange={handleTypeChange}
            input={<BootstrapInput />}>
            <MenuItem value={"Ingredient"}>Ingredient</MenuItem>
            <MenuItem value={"Brew"}>Brew</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </div>
        {difficultyButton(searchType)}
        <Button type="submit">Search</Button>
      </form>
      <div id="search-results">
        {resultsJSX}
      </div>
    </div>
  );
}