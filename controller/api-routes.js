const db = require("../models");

module.exports = function(app) {
    
    // GET ROUTES

    // User Data
    app.get("/api/user/:username", (req, res) => {
        db.User
        .findAll({
            where: {
                username: req.params.username
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
    app.get("/api/user/:username/brews", (req, res) => {
        db.Brew
        .findAll({
            where: {
                username: req.params.username
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
    app.post("/api/:username/newBrew", (req, res) => {
        db.Brew
        .create({
            name: req.body.brewName,
            description: req.body.description,
            ingredients: req.body.ingredients,
            UserId: req.params.username
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
    app.post("/api/:username/:brewId/newComment", (req, res) => {
        db.Comment
        .create({
            UserId: req.params.username,
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

}