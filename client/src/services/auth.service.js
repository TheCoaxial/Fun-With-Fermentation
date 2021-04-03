import axios from "axios";
import ls from 'local-storage';

const API_URL = "/api/auth/";

class AuthService {
    login(username, password) {
        return axios
         .post(API_URL + "signin", {
             username,
             password
            })
         .then(response => { 
             if (response.data.accessToken) {
                 ls.set("user", JSON.stringify(response.data)); 
             }
             return response.data;
         });
    }

    // As a call out, I know removing the recently visited key from
    // local storage on a logout isn't a great UX decision but, it does eliminate
    // some possible crashes that I ran out of time to contend with
    logout(){
        ls.remove("user"); 
        ls.remove("visited");
    }

    register(username, email, password) {
        return axios
        .post(API_URL + "signup", {
            username,
            email,
            password
        })   
    }
 
    getCurrentUser() {
    
        try{
            return JSON.parse(ls.get("user"));
        }
        catch{
            console.log("failed to getCurrentUser")
        }      
    }


}

export default new AuthService();