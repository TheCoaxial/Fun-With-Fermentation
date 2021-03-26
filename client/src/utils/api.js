import axios from "axios";

class API {

    axios;

    constructor() {

        this.axios = axios.create();

    }

    /**
     * @param {String} name 
     * @param {String} value 
     */
    setHeader(name, value) {

        if (value)

            this.axios.defaults.headers.common[name] = value;

        else

            delete this.axios.defaults.headers.common[name];

    }

    /**
     * @param {object} userData 
     * @param {String} userData.email
     * @param {String} userData.password
     * 
     * @returns {Promise}
     */
    register(userData) {

        return this.axios.post("/api/register", userData);

    }


    /**
     * @param {object} userData 
     * @param {String} userData.email
     * @param {String} userData.password
     * 
     * @returns {Promise}
     */
    login(userData) {

        return this.axios.post("/api/login", userData);

    }

    authenticated() {

        return this.axios.post("/api/authenticated");

    }

    postBrew(userID) {

        return this.axios.post("/api/" + userID + "/new-brew");
    }

    saveNewFavorite(brewID, userID) {

        return this.axios.post("/api/favorite/" + brewID + "/" + userID);
    }

    getUserProfile(userId) {

        return this.axios.get("/api/user/" + userId);
    }

    getUserBrews(userId) {

        return this.axios.get("/api/brew/" + userId);
    }

    getSpecificBrew(brewID) {

        return this.axios.get("/api/brew/" + brewID);
    }

    getUserFavorite(brewID,userID) {

        return this.axios.get("/api/favorite/" + brewID + userID);
    }

    deleteBrew(brewID) {

        return this.axios.delete("/api/delete-brew/" + brewID);
    }

    deleteComment(commentID) {

        return this.axios.delete("/api/delete-comment/" + commentID);
    }

    deleteFavorite(brewID, userID) {

        return this.axios.delete("/api/delete-favorite/" + brewID + "/" + userID);
    }

    updateComment(commentID) {

        return this.axios.put("/api/update-comment/" + commentID);
    }

    getTopUsers() {
        return this.axios.get("/api/users/feed");
    }
    
    getBrews() {
        return this.axios.get("/api/brew/all");
    };

}

export default new API();