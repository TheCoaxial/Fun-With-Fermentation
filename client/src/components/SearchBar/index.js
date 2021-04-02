import React, { useState, useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    padding: '10px 26px 10px 12px',
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
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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
    const [difficulty, setDifficulty] = useState("");
    const [searchType, setSearchType] = useState("");

    const handleDifficultyChange = event => {
        setDifficulty(event.target.value);
        console.log(difficulty);
    };

    const handleTypeChange = event => {
        setSearchType(event.target.value);
        console.log(searchType);
    };

    const handleSearchChange = event => {
        setSearch(event.target.value);
        console.log(search);
    };

    const handleSubmit = event => {
        event.preventDefault();
    };

    return (
        <div className={classes.grow}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
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
            <FormControl className={classes.margin}>
                <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                <Select
                    labelId="difficulty-select-label"
                    id="difficulty-select"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={""}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Beginner"}>Beginner</MenuItem>
                    <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                    <MenuItem value={"Expert"}>Expert</MenuItem>
                    <MenuItem value={"Unknown"}>Unknown</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel id="type-select-label">Search Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={searchType}
                    onChange={handleTypeChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={"Brew"}>
                        <em>Brew</em>
                    </MenuItem>
                    <MenuItem value={"Brew"}>Brew</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}