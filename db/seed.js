/**
 * Run while express server is running
 */
const fetch = require("node-fetch");

async function insertData() {
    /**
     * Users
     */
    await insertUser("Ehrman", "username1@email.com", "unhashedpassword");
    await insertUser("UsernamePerson", "username2@email.com", "unhashedpassword");
    await insertUser("brewguy", "username3@email.com", "unhashedpassword");
    await insertUser("soccerlover774", "username4@email.com", "unhashedpassword");
    await insertUser("qwerty", "username5@email.com", "unhashedpassword");
    await insertUser("reddituser72", "username6@email.com", "unhashedpassword");

    /**
     * Brews
     */
    await insertBrew("Username1's first Brew", "Ehrman", 1);
    await insertBrew("Username1's second Brew", "Ehrman", 1);
    await insertBrew("Username2's first Brew", "UsernamePerson", 2);
    await insertBrew("pineapple Brew", "soccerlover774", 4);
    await insertBrew("beginner brew", "reddituser72", 6);
    await insertBrew("banana brew", "qwerty", 5);

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
        name: "ehrman brew 1",
        difficulty: "expert"
    }, 1);
    await editBrew({
        description: "This is my brew description.",
        name: "ehrman brew 2",
        difficulty: "beginner"
    }, 2);
    await editBrew({
        description: "This is my brew description.",
        name: "username persons brew",
        difficulty: "intermediate"
    }, 3);
    await editBrew({
        description: "This is my brew description.",
        difficulty: "expert"
    }, 4);
    await editBrew({
        description: "This is my brew description.",
        difficulty: "beginner"
    }, 5);
    await editBrew({
        description: "This is my brew description.",
        difficulty: "beginner"
    }, 6);



    /**
   * Comments
   */
    await insertComment("WOW INCREDIBLE", "Ehrman", 1, 3);
    await insertComment("This Is my brew", "Ehrman", 1, 2);
    await insertComment("This Is Username3's comment", "brewguy", 3, 1);
    await insertComment("This was actually very difficult you lied", "brewguy", 3, 6);
    await insertComment("You copied my recipe!", "UsernamePerson", 2, 4);
    await insertComment("You ALSO copied my recipe!", "UsernamePerson", 2, 5);

    await editComment({
        body: "This Is my brew"
    }, 1);

    await editComment({
        body: "WOW INCREDIBLE"
    }, 2);

    await editComment({
        body: "new This Is Username3's comment 3"
    }, 3);

    /**
    * Ingredients
    */
    await insertIngredient("potatos", 5, "Oz", 1);
    await insertIngredient("salad dressing", 10, "lb", 1);
    await insertIngredient("lettuce", 13, "teaspoon", 1);

    await insertIngredient("pineapple", 6, "cups", 2);
    await insertIngredient("ingredient2", 11, "ml", 2);
    await insertIngredient("ingredient3", 14, "pinch", 2);

    await insertIngredient("alcohol", 7, "pint", 3);
    await insertIngredient("ingredient2", 13, "fluid ounce", 3);
    await insertIngredient("bees", 17, "gallon", 3);


    await insertIngredient("alcohol", 7, "pint", 4);
    await insertIngredient("ingredient2", 13, "fluid ounce", 4);
    await insertIngredient("bees", 17, "gallon", 4);

    await insertIngredient("alcohol", 7, "pint", 5);
    await insertIngredient("ingredient2", 13, "fluid ounce", 5);
    await insertIngredient("bees", 17, "gallon", 5);

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

    await insertStep(5, "instruction 1 on brew 2", 2);
    await insertStep(150, "instruction 2 on brew 2", 2);
    await insertStep(15, "instruction 3 on brew 2", 2);

    await insertStep(25, "instruction 1 brew 3", 3);
    await insertStep(200, "instruction 2 brew 3", 3);
    await insertStep(50, "instruction 3 brew 3", 3);

    await insertStep(25, "instruction 1 brew 3", 4);
    await insertStep(200, "instruction 2 brew 3", 4);
    await insertStep(50, "instruction 3 brew 3", 4);


    await insertStep(25, "instruction 1 brew 3", 5);
    await insertStep(200, "instruction 2 brew 3", 5);
    await insertStep(50, "instruction 3 brew 3", 5);


    await insertStep(25, "instruction 1 brew 3", 6);
    await insertStep(200, "instruction 2 brew 3", 6);
    await insertStep(50, "instruction 3 brew 3", 6);

    await editStep({
        duration: 9000,
        instructions: "the duration for this instructions is over 9000!"
    }, 6);

    /**
    * Tags
    */
    await insertTag("Expert", 1);
    await insertTag("Beginner", 2);
    await insertTag("Intermediate", 3);

    /**
    * Favorites
    */
    await insertFavorite(1, 1);
    await insertFavorite(2, 1);
    await insertFavorite(3, 1);

    await insertFavorite(1, 2);
    await insertFavorite(2, 2);
    await insertFavorite(3, 2);

    await insertFavorite(1, 3);
    await insertFavorite(2, 3);
    await insertFavorite(3, 3);

    await removeFavorite(2, 1);
    await removeFavorite(2, 2);
    await removeFavorite(2, 3);

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
            author: author,
            UserId: UserId
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
            body: body,
            UserId: UserId
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

async function insertTag(name, BrewId) {
    await fetch(`http://localhost:3001/api/${BrewId}/new-tag`, {
        method: "POST",
        body: JSON.stringify({
            name: name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return;
}

async function insertFavorite(BrewId, UserId) {
    await fetch(`http://localhost:3001/api/favorite/${BrewId}/${UserId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return;
}

async function removeFavorite(BrewId, UserId) {
    await fetch(`http://localhost:3001/api/delete-favorite/${BrewId}/${UserId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

insertData();