import React, { Component } from 'react';
import AuthService from "../../services/auth.service.js";
import "./style.css";
import API from '../../utils/api.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';

class NewBrew extends Component {

    constructor() {
        super();

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

        if (e.target.name == "instructions" || e.target.name == "ingredients") {
            let id = e.target.id.split("-")[1];
            let tempArray = this.state[e.target.name];
            tempArray[id] = e.target.value;
            this.setState({ [e.target.name]: tempArray });
            console.log(tempArray);
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

                this.state.ingredients.forEach(ingredient => {
                    API.postIngredient(brewId, ingredient);
                });

                this.state.instructions.forEach(instruction => {
                    API.postStep(brewId, instruction);
                });

                window.location.assign("/feed");
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
                    id={`instructions-${instructionsCount}`}
                    value={instruction}
                    onChange={this.onChange}
                    className="instruction"
                />
            );
        })





        return (

            <div id="newBrew">
                <form id="newBrewForm" onSubmit={this.onSubmit}>

                    <TextField
                        required
                        id="outlined-required brewName"
                        variant="outlined"
                        label="Brew Name"
                        defaultValue="Brew Name"
                        alt="enter the name of your brew"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                    />

                    <TextField
                        id="outlined-multiline-static brewDescription"
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
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

                    <InputLabel htmlFor="select" id="selectLabel">Difficulty of Brew </InputLabel>
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
                            color="primary"
                            size="large"
                            startIcon={<LocalDrinkIcon />}>
                            Save Brew
                                    </Button>

                    </div>

                </form>
            </div>
        );
    }
}

export default NewBrew;
