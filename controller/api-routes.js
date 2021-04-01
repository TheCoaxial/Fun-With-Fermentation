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
    app.get("/api/brews/all", (req, res) => {
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

    //For Feed Page
    //TODO:// Get top contributors
    app.get("/api/users/feed", (req, res) => {
        db.User
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
    app.get("/api/brew/specific/:brewId", (req, res) => {
        db.Brew
            .findOne({
                where: {
                    id: req.params.brewId
                },
                include: [db.Comment, db.Ingredient, db.Step]
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

    //Get Favorites
    app.get("/api/favorite/:userId", (req, res) => {
        db.Favorite
            .findAll({
                include: db.Brew,
                where: { UserId: req.params.userId },

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
        db.Favorite
            .findAll({
                include: db.Brew,
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

    // Get Brews with Tag
    // not sure if i did this right
    /*     app.get("/api/brewTags/:tagId", (req, res) => {
            db.BrewTags
                .findAll({
                    where: {
                        TagId: req.params.tagId
                    }
                })
                .then(data => {
                    console.log(data);
                    db.Brew
                        .findAll({
                            where: {
                                id: data.BrewId
                            }
                        })
                })
                .catch(err => {
                    if (err) {
                        res.sendStatus(500);
                        console.error(err);
                    }
                });
        }); */

    //For Feed Page
    //TODO:// Get top contributors
    app.get("/api/users/feed", (req, res) => {
        db.User
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
                UserId: req.body.UserId,
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
        db.Favorite
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

    // New Ingredient
    app.post("/api/:brewId/new-ingredient", (req, res) => {
        db.Ingredient
            .create({
                BrewId: req.params.brewId,
                name: req.body.name,
                quantity: req.body.quantity,
                quantityUnits: req.body.quantityUnits
            })
            .then(newIngredient => res.json(newIngredient))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // New Step
    app.post("/api/:brewId/new-step", (req, res) => {
        db.Step
            .create({
                BrewId: req.params.brewId,
                duration: req.body.duration,
                instructions: req.body.instructions
            })
            .then(newStep => res.json(newStep))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // New Tag
    app.post("/api/:brewId/new-tag", (req, res) => {
        db.Tag
            .create({
                BrewId: req.params.brewId,
                name: req.body.name
            })
            .then(newTag => res.json(newTag))
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
        db.Favorite
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

    // Delete Ingredient
    app.delete("/api/delete-ingredient/:ingredientId", (req, res) => {
        db.Ingredient
            .destroy({
                where: {
                    id: req.params.ingredientId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // Delete Step
    app.delete("/api/delete-step/:stepId", (req, res) => {
        db.Step
            .destory({
                where: {
                    id: req.params.stepId
                }
            })
            .then(data => res.json(data))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // Delete Tag
    app.delete("/api/delete-tag/:tagId", (req, res) => {
        db.Tag
            .destroy({
                where: {
                    id: req.params.tagId
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

    // Update User
    app.put("/api/update-user/:userId", (req, res) => {

        let body = {};

        if (req.body["bio"]) {
            body["bio"] = req.body["bio"];
        }
        if (req.body["contributionScore"]) {
            body["contributionScore"] = req.body["contributionScore"];
        }

        db.User
            .update(body,
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

    // Update Brew
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

        db.Brew
            .update(body,
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

    // Update Ingredient
    app.put("/api/update-ingredient/:ingredientId", (req, res) => {

        let body = {};

        if (req.body["name"]) {
            body["name"] = req.body["name"];
        }
        if (req.body["quantity"]) {
            body["quantity"] = req.body["quantity"];
        }
        if (req.body["quantityUnits"]) {
            body["quantityUnits"] = req.body["quantityUnits"];
        }

        db.Ingredient
            .update(body,
                {
                    where: {
                        id: req.params.ingredientId
                    }
                })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

    // Update Step
    app.put("/api/update-step/:stepId", (req, res) => {

        let body = {};

        if (req.body["duration"]) {
            body["duration"] = req.body["duration"];
        }
        if (req.body["instructions"]) {
            body["instructions"] = req.body["instructions"];
        }

        db.Step
            .update(body,
                {
                    where: {
                        id: req.params.stepId
                    }
                })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            });
    });

};