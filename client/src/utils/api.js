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

    // GET

    getUserProfile(userId) {
        return this.axios.get("/api/user/" + userId);
    }

    getBrews() {
        return this.axios.get("/api/brews/all");
    }

    getUserBrews(userId) {
        return this.axios.get("/api/brew/" + userId);
    }

    getSpecificBrew(brewID) {
        return this.axios.get("/api/brew/specific/" + brewID);
    }

    getUserFavorites(userID) {
        return this.axios.get("/api/favorite/" + userID);
    }

    getFavoritedBy(brewID) {
        return this.axios.get("/api/favorited/" + brewID);
    }

    getSpecificFavorite(userID, brewID) {
        return this.axios.get("/api/favorite/" + brewID + "/" + userID);
    }

    getUserFollowing(userID) {
        return this.axios.get("/api/follow/" + userID);
    }

    getFollowers(followID) {
        return this.axios.get("/api/followers/" + followID);
    }

    getSpecificFollowed(userID, followID) {
        return this.axios.get("/api/follow/" + followID + "/" + userID);
    }

    getCommentInfo(commentID) {
        return this.axios.get("/api/comment/" + commentID);
    }

    getLikedBy(commentID) {
        return this.axios.get("/api/comment-like/" + commentID);
    }

    getSpecificCommentLike(userID, commentID) {
        return this.axios.get("/api/comment-like/" + commentID + "/" + userID);
    }

    getTopUsers() {
        return this.axios.get("/api/users/feed");
    }

    searchUsers(searchString) {
        return this.axios.get(`/api/search/user/${searchString}`);
    }
    searchBrews(searchString) {
        return this.axios.get(`/api/search/brew/${searchString}`);
    }
    searchIngredients(searchString) {
        return this.axios.get(`/api/search/ingredient/${searchString}`);
    }

    difficultBrewSearch(searchString, difficulty) {
        return this.axios.get(`/api/search/brew/${searchString}/${difficulty}`);
    }
    difficultIngredientSearch(searchString, difficulty) {
        return this.axios.get(`/api/search/ingredient/${searchString}/${difficulty}`);
    }


    // POST

    postBrew(userID, name, description, username, difficulty) {
        return this.axios.post("/api/" + userID + "/new-brew", {
            name: name,
            description: description,
            author: username,
            difficulty: difficulty
        });
    }

    postComment(userID, brewID, username, body) {
        return this.axios.post("/api/" + userID + "/" + brewID + "/new-comment", {
            body: body,
            author: username,
            BrewId: brewID,
            UserId: userID
        });
    }

    saveNewFavorite(brewID, userID) {
        return this.axios.post("/api/favorite/" + brewID + "/" + userID);
    }

    newFollow(followID, userID) {
        return this.axios.post("/api/follow/" + followID + "/" + userID);
    }

    newCommentLike(commentID, userID) {
        return this.axios.post("/api/comment-like/" + commentID + "/" + userID);
    }

    postIngredient(brewID, name, ingredientNumber) {
        return this.axios.post("/api/" + brewID + "/new-ingredient", {
            name: name,
            quantity: ingredientNumber,
            BrewId: brewID
        });
    }

    postStep(brewID, instructions, stepNumber) {
        return this.axios.post("/api/" + brewID + "/new-step", {
            instructions: instructions,
            duration: stepNumber,
            BrewId: brewID
        });
    }

    postTag(brewID, name) {
        return this.axios.post("/api/" + brewID + "/new-tag", {
            name: name
        });
    }

    // DELETE

    deleteBrew(brewID) {
        return this.axios.delete("/api/delete-brew/" + brewID);
    }

    deleteComment(commentID) {
        return this.axios.delete("/api/delete-comment/" + commentID);
    }

    deleteFavorite(brewID, userID) {
        return this.axios.delete("/api/delete-favorite/" + brewID + "/" + userID);
    }

    deleteFollow(followID, userID) {
        return this.axios.delete("/api/delete-follow/" + followID + "/" + userID);
    }

    deleteCommentLike(commentID, userID) {
        return this.axios.delete("/api/delete-comment-like/" + commentID + "/" + userID);
    }

    deleteIngredient(ingredientID) {
        return this.axios.delete("/api/delete-ingredient/" + ingredientID);
    }

    deleteStep(stepID) {
        return this.axios.delete("/api/delete-step/" + stepID);
    }

    deleteTag(tagID) {
        return this.axios.delete("/api/delete-tag/" + tagID);
    }

    // UPDATE

    updateComment(commentID, body) {
        return this.axios.put("/api/update-comment/" + commentID, {
            body: body
        });
    }

    updateUser(userID, bio, contributionScore) {
        return this.axios.put("/api/update-user/" + userID, {
            bio: bio,
            contributionScore: contributionScore
        });
    }

    updateBrew(brewID, name, difficulty, description) {
        return this.axios.put("/api/update-brew/" + brewID, {
            name: name,
            description: description,
            difficulty: difficulty
        });
    }

    updateIngredient(ingredientID, name, quantity, quantityUnits) {
        return this.axios.put("/api/update-ingredient/" + ingredientID, {
            name: name,
            quantity: quantity,
            quantityUnits: quantityUnits
        });
    }

    updateStep(stepID, duration, instructions) {
        return this.axios.put("/api/update-step/" + stepID, {
            duration: duration,
            instructions: instructions
        });
    }

}

export default new API();