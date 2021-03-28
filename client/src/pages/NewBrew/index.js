import React, { Component } from 'react';
import AddInput from "../../components/AddInput/AddInput.js";
import AuthService from "../../services/auth.service.js";
import "./style.css";
import API from '../../utils/api.js';

class NewBrew extends Component {

    constructor() {
        super();

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            ingredients: [""],
            instructions: [""],
            name: "",
            description: "",
            title: ""
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

        const { title, description } = this.state;

        let userData = AuthService.getCurrentUser();

        API.postBrew(userData.id, title, description, userData.username)
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
            return (<input type="text" placeholder="Enter Ingredient Here"
                alt="enter the first ingredient" name="ingredients" id={`ingredients-${ingredientCount}`} value={ingredient}
                onChange={this.onChange} className="ingredient" />);
        });


        let instructionsCount = -1;
        let instructionsJSX = this.state.instructions.map(instruction => {
            instructionsCount += 1;
            return (<input type="text" placeholder="Enter Instruction Here"
                alt="enter the first instruction" name="instructions" id={`instructions-${instructionsCount}`} value={instruction}
                onChange={this.onChange} className="instruction" />);
        })





        return (
            <div id="brewPage">

                <form onSubmit={this.onSubmit}>


                    <input type="text" placeholder="Brew Name" alt="enter the name of your brew" id="brewName" name="title" value={this.state.title} onChange={this.onChange} />

                    <div className="formGroup">

                        <div className="ingredients">
                            {ingredientsJSX}
                        </div>

                        <button onClick={(e) => this.handleAppend(e, ingredientArg)}>Add Another Ingredient</button>

                    </div>

                    <div className="formGroup">


                        <div className="instructions">
                            {instructionsJSX}
                        </div>

                        <button onClick={(e) => this.handleAppend(e, instructionArg)}>Add Another Instruction</button>

                    </div>

                    <label htmlFor="difficulty">Select the difficulty level of your brew:</label>
                    <select name="difficulty" id="difficultyDropdown">
                        <option value="volvo">beginner</option>
                        <option value="saab">intermediate</option>
                        <option value="mercedes">expert</option>
                        <option value="audi">unknown</option>
                    </select>

                    <textarea alt="enter other description about the brew" id="description"
                        placeholder="Enter any additional description about your brew (optional)"
                        name="description" value={this.state.description} onChange={this.onChange}></textarea>

                    <button type="submit" id="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewBrew;
