import axios from "axios";


const API_URL = "/api/auth/";

class AuthService {
    login(username, password) {
        return axios
         .post(API_URL + "signin", {
             username,
             password
             
         } )
         .then(response => { 
             if (response.data.accessToken) {
                 localStorage.setItem("user", JSON.stringify(response.data));
                 //localStorage.setItem("visited", JSON.stringify(response.data.id));
             }
             return response.data;
         });
    }

    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem('visited');
    }

    register(username, email, password) {
        return axios
        .post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        
        
        return JSON.parse(localStorage.getItem("user"));
        
    }


}

export default new AuthService();