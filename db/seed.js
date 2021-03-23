/**
 * Run while express server is running
 */
const fetch = require("node-fetch");

async function insertData() {
    /**
     * Users
     */
    let user1Token = await insertUser("Username1", "username1@email.com", "hashedpassword");
    let user2Token = await insertUser("Username2", "username2@email.com", "hashedpassword");
    let user3Token = await insertUser("Username3", "username3@email.com", "hashedpassword");


    console.log(user1Token);
    /**
     * Brews
     */
    await insertBrew("Username1's first Brew", "Username1", 1);
    await insertBrew("Username1's second Brew", "Username1", 1);
    await insertBrew("Username2's first Brew", "Username2", 2);


    /**
   * Comments
   */
    // await insertComment("WOW INCREDIBLE", "Username1", 1, 3);
    // await insertComment("This Is my brew", "Username1", 1, 2);
    // await insertComment("This Is Username3's comment", "Username3", 3, 1);


    return;
}

async function insertUser(userName, email, password) {
    await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            username: userName,
            password: password,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });


    let res = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            username: userName,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return res;
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

async function insertComment(body, author, UserId, BrewId) {
    await fetch(`http://localhost:3001/api/${UserId}/${BrewId}/new-comment`, {
        method: "POST",
        body: JSON.stringify({
            author: author,
            body: body
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return;
}

insertData();