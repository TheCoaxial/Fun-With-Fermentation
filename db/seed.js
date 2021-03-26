/**
 * Run while express server is running
 */
const fetch = require("node-fetch");

async function insertData() {
    /**
     * Users
     */
    let user1Token = await insertUser("Username1", "username1@email.com", "unhashedpassword");
    let user2Token = await insertUser("Username2", "username2@email.com", "unhashedpassword");
    let user3Token = await insertUser("Username3", "username3@email.com", "unhashedpassword");

    /**
     * Brews
     */
    await insertBrew("Username1's first Brew", "Username1", 1);
    await insertBrew("Username1's second Brew", "Username1", 1);
    await insertBrew("Username2's first Brew", "Username2", 2);

    await editUser({
        bio: "Hello I am the first user.",
        contributionScore: 100
    }, 1);
    await editUser({
        bio: "Hello I am the second user, but have the highest contribution.",
        contributionScore: 200
    }, 2);
    await editUser({
        contributionScore: 5
    }, 3);


    await editBrew({
        description: "This is my brew description.",
        name: "Brew 1"
    }, 1);
    await editBrew({
        description: "This is my brew description.",
        name: "Brew 2"
    }, 2);
    await editBrew({
        description: "This is my brew description.",
        name: "Brew 3"
    }, 3);



    /**
   * Comments
   */
    await insertComment("WOW INCREDIBLE", "Username1", 1, 3);
    await insertComment("This Is my brew", "Username1", 1, 2);
    await insertComment("This Is Username3's comment", "Username3", 3, 1);

    await editComment({
        body: "new comment 1"
    }, 1);

    await editComment({
        body: "new comment 2"
    }, 2);
    
    await editComment({
        body: "new comment 3"
    }, 3);

    /**
    * Ingredients
    */
    await insertIngredient("ingredient1", 5, "Oz", 1);
    await insertIngredient("ingredient2", 10, "lb", 1);
    await insertIngredient("ingredient3", 13, "teaspoon", 1);

    await insertIngredient("ingredient1", 6, "cups", 2);
    await insertIngredient("ingredient2", 11, "ml", 2);
    await insertIngredient("ingredient3", 14, "pinch", 2);

    await insertIngredient("ingredient1", 7, "pint", 3);
    await insertIngredient("ingredient2", 13, "fluid ounce", 3);
    await insertIngredient("ingredient3", 17, "gallon", 3);

    await editIngredient({
        name: "edited ingredient2",
        quantity: 48,
        quantityUnits: "edited units"
    }, 2);

    /**
    * Steps
    */
    await insertStep(5, "stir ingredient1 into ingredient2", 1);
    await insertStep(100, "place mixture in fermentation container, allow to sit", 1);
    await insertStep(5, "add ingredient3 to the mixture", 1);

    await insertStep(5, "instruction 1 on brew 2", 2;
    await insertStep(150, "instruction 2 on brew 2", 2);
    await insertStep(15, "instruction 3 on brew 2", 2);

    await insertStep(25, "instruction 1 brew 3", 3);
    await insertStep(200, "instruction 2 brew 3", 3);
    await insertStep(50, "instruction 3 brew 3", 3);

    await editStep({
        duration: 9000,
        instructions: "the duration for this instructions is over 9000!"
    }, 6);

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

/**
 * 
 * @param body {[description:], [name:]} 
 * @param brewId  
 * @returns 
 */
async function editBrew(body, brewId) {
    await fetch(`http://localhost:3001/api/update-brew/${brewId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

/**
 * 
 * @param body {[contributionScore:], [bio:]} 
 * @param userId  
 * @returns 
 */
async function editUser(body, userId) {
    await fetch(`http://localhost:3001/api/update-user/${userId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return;
}

/**
 * 
 * @param body {[body:]} 
 * @param commentId  
 * @returns 
 */
async function editComment(body, commentId) {
    await fetch(`http://localhost:3001/api/update-comment/${commentId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return;
}

/**
 * 
 * @param body {[name:], [quantity:], [quantityUnits:]} 
 * @param ingredientId  
 * @returns 
 */
async function editIngredient(body, ingredientId) {
    await fetch(`http://localhost:3001/api/update-ingredient/${ingredientId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return;
}

/**
 * 
 * @param body {[duration:], [instructions:]} 
 * @param stepId
 * @returns 
 */
async function editStep(body, stepId) {
    await fetch(`http://localhost:3001/api/update-step/${stepId}`, {
        method: "PUT",
        body: JSON.stringify(body),
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

async function insertIngredient(name, quantity, quantityUnits, BrewId) {
    await fetch(`http://localhost:3001/api/${BrewId}/new-ingredient`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            quantity: quantity,
            quantityUnits: quantityUnits
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return;
}

async function insertStep(duration, instructions, BrewId) {
    await fetch(`http://localhost:3001/api/${BrewId}/new-step`, {
        method: "POST",
        body: JSON.stringify({
            duration: duration,
            instructions: instructions,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return;
}

insertData();