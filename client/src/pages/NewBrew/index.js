import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ls from 'local-storage';
import AuthService from "../../services/auth.service.js";
import { TextField, Button, InputLabel, NativeSelect } from "@material-ui/core";
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import API from '../../utils/api.js';
import "./style.css";

class NewBrew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            ingredients: [""],
            instructions: [""],
            name: "",
            description: "",
            title: "",
            difficulty: "unknown"
        }
    }

    handleAppend(e, type) {
        e.preventDefault();
        this.setState({ [type]: [...this.state[type], ""] });
    }

    onChange = (e) => {

        if (e.target.name === "instructions" || e.target.name === "ingredients") {
            let id = e.target.id.split("-")[1];
            let tempArray = this.state[e.target.name];
            tempArray[id] = e.target.value;
            tempArray.filter(item => item.length > 0);
            this.setState({ [e.target.name]: tempArray });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { title, description, difficulty } = this.state;
        let userData = AuthService.getCurrentUser();

        API.postBrew(userData.id, title, description, userData.username, difficulty)
            .then(data => {
                let brewId = data.data.id;

                let ingredientNumber = 0;
                this.state.ingredients.forEach(ingredient => {
                    ingredientNumber += 1;
                    API.postIngredient(brewId, ingredient, ingredientNumber);
                });

                let instructionNumber = 0;
                this.state.instructions.forEach(instruction => {
                    if (instruction) {
                        instructionNumber += 1;
                    }
                    API.postStep(brewId, instruction, instructionNumber);
                });

                this.props.history.push("/feed");
            });
    }

    render() {

        const ingredientArg = "ingredients";
        const instructionArg = "instructions";

        let ingredientCount = -1;
        let ingredientsJSX = this.state.ingredients.map(ingredient => {
            ingredientCount += 1;
            return (
                <TextField
                    label="Enter Ingredient"
                    alt="enter the first ingredient"
                    name="ingredients"
                    key={`ingredients-${ingredientCount}`}
                    id={`ingredients-${ingredientCount}`}
                    value={ingredient}
                    onChange={this.onChange}
                    className="ingredient"
                />
            );
        });

        let instructionsCount = -1;
        let instructionsJSX = this.state.instructions.map(instruction => {
            instructionsCount += 1;
            return (
                <TextField
                    label="Enter Instruction"
                    alt="enter the first instruction"
                    name="instructions"
                    key={`instructions-${instructionsCount}`}
                    id={`instructions-${instructionsCount}`}
                    value={instruction}
                    variant="outlined"
                    multiline
                    rows={3}
                    onChange={this.onChange}
                    className="instruction txtAREA"
                />
            );
        })

        if (ls.get('user')) {
            return (
                <div id="newBrew">
                    <form id="newBrewForm" onSubmit={this.onSubmit}>

                        <TextField
                            required
                            id="outlined-required-brewName"
                            className="brewName"
                            variant="outlined"
                            label="Brew Name"
                            placeholder="Brew Name"
                            alt="enter the name of your brew"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                        />

                        <TextField
                            id="outlined-multiline-static-brewDescription"
                            className="brewDescription"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Enter any additional description about your brew (optional)"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                        />

                        <div className="formGroup">

                            <div className="ingredients">
                                {ingredientsJSX}
                            </div>

                            <Button className="addInputButton" variant="outlined" onClick={(e) => this.handleAppend(e, ingredientArg)}>Add Another Ingredient</Button>

                        </div>

                        <div className="formGroup">

                            <div className="instructions">
                                {instructionsJSX}
                            </div>

                            <Button className="addInputButton" variant="outlined" onClick={(e) => this.handleAppend(e, instructionArg)}>Add Another Instruction</Button>

                        </div>

                        <InputLabel htmlFor="select" id="selectLabel">Difficulty of Brew</InputLabel>
                        <NativeSelect name="difficulty" onChange={this.onChange} value={this.state.difficulty} id="select">
                            <option value="unknown"></option>
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="expert">expert</option>
                            <option value="unknown">unknown</option>
                        </NativeSelect>

                        <div id="formButtonWrap">
                            <Button
                                type="submit"
                                id="submit"
                                variant="contained"
                                size="large"
                                startIcon={<LocalDrinkIcon />}
                            >
                                Save Brew
                            </Button>
                        </div>
                    </form>
                </div>
            );
        } else {
            return <Redirect to="/" />
        } 
    }
}

export default NewBrew;
