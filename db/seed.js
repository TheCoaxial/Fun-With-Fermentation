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
     * 
     */

    
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

insertData();