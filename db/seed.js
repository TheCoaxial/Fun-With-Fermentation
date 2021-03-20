/**
 * Run while express server is running
 */
const fetch = require("node-fetch");

async function insertData() {
    /**
     * Users
     */
    await insertUser("Username1", "username1@email.com", "hashedpassword");
    await insertUser("Username2", "username2@email.com", "hashedpassword");
    await insertUser("Username3", "username3@email.com", "hashedpassword");

    /**
     * Brews
     */
    await insertBrew("Username1's first Brew", "Username1", 1);
    await insertBrew("Username1's second Brew", "Username1", 1);
    await insertBrew("Username2's first Brew", "Username2", 2);

    return;
}

async function insertUser(userName, email, password) {
    await fetch("http://localhost:3001/api/new-user", {
        method: "POST",
        body: JSON.stringify({
            name: userName,
            password: password,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return;
}

async function insertBrew(brewName, author, UserId) {
    await fetch(`http://localhost:3001/api/${UserId}/new-brew`, {
        method: "POST",
        body: JSON.stringify({
            name: brewName,
            author: author
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return;
}

insertData();