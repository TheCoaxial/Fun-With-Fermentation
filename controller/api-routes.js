// const { regexp } = require("sequelize/types/lib/operators");
const db = require("../models");

module.exports = function (app) {

    // GET ROUTES

    // User Data
    app.get("/api/user/:userId", (req, res) => {
        db.User
            .findAll({
                where: {
                    id: req.params.userId
                }
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // All Brews
    app.get("/api/brew/all", (req, res) => {
        db.Brew
            .findAll({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // User Brews
    app.get("/api/brew/:userId", (req, res) => {
        db.Brew
            .findAll({
                where: {
                    UserId: req.params.userId
                }
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // Specific Brew
    app.get("/api/brew/:brewId", (req, res) => {
        db.Brew
            .findAll({
                where: {
                    id: req.params.brewId
                }
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // Get Favorites
    app.get("/api/favorite/:userId", (req, res) => {
        db.Favorites
            .findAll({
                where: {
                    UserId: req.params.userId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // Get Favorite
    app.get("/api/favorite/:brewId/:userId", (req, res) => {
        db.Favorites
            .findAll({
                where: {
                    BrewId: req.params.brewId,
                    UserId: req.params.userId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // POST ROUTES

    // New Brew
    app.post("/api/:userId/new-brew", (req, res) => {
        req.body["userId"] = req.params.userId;
        db.Brew
            .create(req.body)
            .then(newBrew => res.json(newBrew))
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // New Comment
    app.post("/api/:userId/:brewId/new-comment", (req, res) => {
        db.Comment
            .create({
                author: req.body.author,
                BrewId: req.params.brewId,
                body: req.body.body
            })
            .then(newComment => res.json(newComment))
            .catch(err => {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                }
            });
    });

    // New Favorite
    app.post("/api/favorite/:brewId/:userId", (req, res) => {
        db.Favorites
            .create({
                BrewId: req.params.brewId,
                UserId: req.params.userId
            })
            .then(newFav => res.json(newFav))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // DELETE ROUTES

    // Delete Brew
    app.delete("/api/delete-brew/:brewId", (req, res) => {
        db.Brew
            .destroy({
                where: {
                    id: req.params.brewId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // Delete Comment
    app.delete("/api/delete-comment/:commentId", (req, res) => {
        db.Comment
            .destroy({
                where: {
                    id: req.params.commentId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // Delete Favorite
    app.delete("/api/delete-favorite/:brewId/:userId", (req, res) => {
        db.Favorites
            .destory({
                where: {
                    BrewId: req.params.brewId,
                    UserId: req.params.userId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // UPDATE ROUTES

    // Update Comment
    app.put("/api/update-comment/:commentId", (req, res) => {
        db.Comment
            .update({
                body: req.body.body
            },
                {
                    where: {
                        id: req.params.commentId
                    }
                })
            .then(updatedComment => res.json(updatedComment))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    //update User
    app.put("/api/update-user/:userId", (req, res) => {

        let body = {};

        if (req.body["bio"]) {
            body["bio"] = req.body["bio"];
        }
        if (req.body["contributionScore"]) {
            body["contributionScore"] = req.body["contributionScore"];
        }

        db.User.update(body,
            {
                where: {
                    id: req.params.userId
                }
            })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    //update Brew
    app.put("/api/update-brew/:brewId", (req, res) => {

        let body = {};

        if (req.body["name"]) {
            body["name"] = req.body["name"];
        }
        if (req.body["description"]) {
            body["description"] = req.body["description"];
        }
        if (req.body["ingredients"]) {
            body["ingredients"] = req.body["ingredients"];
        }

        db.Brew.update(body,
            {
                where: {
                    id: req.params.brewId
                }
            })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

}