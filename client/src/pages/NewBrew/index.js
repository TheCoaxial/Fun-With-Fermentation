import React, { Component } from 'react';
import AddInput from "../../components/AddInput/AddInput.js";
import AuthService from "../../services/auth.service.js";
import axios from "axios";
import "./style.css";
import API from '../../utils/api.js';

class NewBrew extends Component {

    constructor() {
        super();


        console.log(AuthService.getCurrentUser());

        this.state = {
            ingredients: [],
            instructions: [],
            classVar: "",
            placeholderVar: "",
            name: "",
            description: "",
            title: ""
        }

        this.axios = axios.create();

    }


    postBrew(userID) {
        return this.axios.post("/api/" + userID + "/new-brew");
    }

    append(type) {
        if (type === "ingredient") {
            this.setState({
                ingredients: [...this.state.ingredients,
                <AddInput className={this.state.classVar} placeholder={this.state.placeholderVar} />
                ]
            });


        } else if (type === "instruction") {

            this.setState({
                instructions: [...this.state.instructions,
                <AddInput className={this.state.classVar} placeholder={this.state.placeholderVar} />
                ]
            });

        }

    }

    handleAppend(type) {
        if (type === "ingredient") {
            this.setState({ classVar: "ingredient", placeholderVar: "Please enter another ingredient" }, () => this.append(type));
        } else if (type === "instruction") {
            this.setState({ classVar: "instruction", placeholderVar: "Please enter another instruction" }, () => this.append(type));
        }
    }

    // onSubmit() {
    //     axios.post(`/api/${this.state.classVar}/new-brew`{
    //         id: this.state.currentUser,
    //         name: 'Williams'
    //       }).then(res => {
    //       const persons = res.data;
    //       this.setState({ persons });
    //     })
    // }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state;

        let userData = AuthService.getCurrentUser()
        console.log(userData);

        axios.post(`/api/${userData.id}/new-brew`, {
            name: title,
            author: userData.username,
            UserId: userData.id,
            description: description

        })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });


    }



    render() {

        const ingredientArg = "ingredient";
        const instructionArg = "instruction";


        return (
            <div id="brewPage">

                <form onSubmit={this.onSubmit}>


                    <input type="text" placeholder="Brew Name" alt="enter the name of your brew" id="brewName" name="title" value={this.state.title} onChange={this.onChange} />

                    <div className="formGroup">

                        <div className="ingredients">
                            <input type="text" placeholder="Enter your first ingredient here" alt="enter the first instruction" className="ingredient" />

                            {this.state.ingredients.map(ingredient => ingredient)}
                        </div>

                        <button href="#" onClick={() => this.handleAppend(ingredientArg)}>Add Another Ingredient</button>

                    </div>

                    <div className="formGroup">


                        <div className="instructions">
                            <input type="text" placeholder="Enter your first instruction here" alt="enter the first instruction" className="instruction" />

                            {this.state.instructions.map(instruction => instruction)}
                        </div>

                        <button href="#" onClick={() => this.handleAppend(instructionArg)}>Add Another Instruction</button>

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
