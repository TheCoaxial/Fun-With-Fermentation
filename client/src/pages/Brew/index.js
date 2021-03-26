import React, {Component} from 'react';
import AddInput from "../../components/AddInput/AddInput.js";
import AuthService from "../../services/auth.service";
import "./style.css";

class Brew extends Component {
    constructor(){
        super();

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            ingredients: [],
            instructions: [],
            classVar: "",
            placeholderVar: ""
        }
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
            this.setState({ classVar: "ingredient", placeholderVar: "Please enter another ingredient"}, () => this.append(type));
        } else if (type === "instruction") {
            this.setState({ classVar: "instruction", placeholderVar: "Please enter another instruction"}, () => this.append(type));
        }
    }

    

    render(){

        console.log(this.state.currentUser);
        const ingredientArg = "ingredient";
        const instructionArg = "instruction";

        return(
            <div id="brewPage">

                    <input type="text" placeholder="Brew Name" alt="enter the name of your brew" id="brewName"/>

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

                    <label for="difficulty">Select the difficulty level of your brew:</label>
                    <select name="difficulty" id="difficultyDropdown" name="difficulty">
                        <option value="volvo">beginner</option>
                        <option value="saab">intermediate</option>
                        <option value="mercedes">expert</option>
                        <option value="audi">unknown</option>
                    </select>

                    <textarea alt="enter other notes about the brew" name="notes" id="notes" placeholder="Enter any other notes about your brew (optional)"></textarea>

                    <button type="submit" id="submit">Submit</button>

            </div>
        );
    }
}

export default Brew;
