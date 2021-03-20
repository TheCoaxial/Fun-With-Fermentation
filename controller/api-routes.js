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

    // User Brews
    app.get("/api/user/:userId/brews", (req, res) => {
        db.Brew
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

    // POST ROUTES

    // New Brew
    app.post("/api/:userId/new-brew", (req, res) => {
        db.Brew
            .create({
                name: req.body.name,
                author: req.body.author,
                UserId: req.params.userId
            })
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
                author: req.params.name,
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

    app.post("/api/new-user", (req, res) => {
        console.log(req.body);
        db.User.create({
            name: req.body.name,
            //Todo: make sure password is hashed
            password: req.body.password,
            email: req.body.email,
        })
            .then(newUser => res.Json(newUser))
            .catch(err => {
                res.sendStatus(500);
                throw err;
            })
    });

}