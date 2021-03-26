import React, {Component} from 'react';
import AddInput from "../../components/AddInput/AddInput.js";
import AuthService from "../../services/auth.service.js";
import axios from "axios";
import "./style.css";

class NewBrew extends Component {

    axios;

    constructor(){
        super();

        this.state = {
            ingredients: [],
            instructions: [],
            classVar: "",
            placeholderVar: "",
            currentUser: AuthService.getCurrentUser(),
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
            this.setState({ classVar: "ingredient", placeholderVar: "Please enter another ingredient"}, () => this.append(type));
        } else if (type === "instruction") {
            this.setState({ classVar: "instruction", placeholderVar: "Please enter another instruction"}, () => this.append(type));
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
        this.setState({ [e.target.id]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.currentUser);
        console.log(AuthService.getCurrentUser());
        const { name, description, author: currentUser } = this.state;

        axios.post(`/api/${this.state.currentUser}/new-brew`, { name, description, author: currentUser })
          .then((res) => {
            console.log(res)
            console.log(this.state.id);
            console.log(this.state.name);
            console.log(this.state.description);
            console.log(this.state.author)

          });
      }

    

    render(){

        const ingredientArg = "ingredient";
        const instructionArg = "instruction";

        
        const { name, description, author: currentUser } = this.state;

        return(
            <div id="brewPage">

                <form onSubmit={this.onSubmit}>
                    

                    <input type="text" placeholder="Brew Name" alt="enter the name of your brew" id="brewName" name="name" value={name} onChange={this.onChange}/>

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

                    <textarea alt="enter other description about the brew" id="description" placeholder="Enter any additional description about your brew (optional)" name="description" value={description} onChange={this.onChange}></textarea>

                    <button type="submit" id="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewBrew;
