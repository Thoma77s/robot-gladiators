var fightOrSkip = function() {
    //ask player if they'd like to fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip ();
    }
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
        window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        return true; 
    } 
    return false; 
}
};
var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }
    // Subtract the value of 'playerInfo.attack' from value of 'enemy.health and use that result to uptade the value in the 'enemy.health' variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    // Log a resulting message to the console so we know that it worked.
    console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    // check enemy's health
    if (enemy.health <=0) {
        window.alert(enemy.name + " has died!");
        playerInfo.money = playerInfo.money + 20
        break;
    }
    else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.")
    }

    // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable.
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
    }
    else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }  
}

var startGame = function() {
    //reset player stats
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i]
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                //if yes, take them to the store() function
                if (storeConfirm) {
                shop();
            }    
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
        }
    }
    endGame();
};

var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ". ");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restart the game
        startGame()
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL you health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            
            // increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!")
            }
            break;
        case 2:
            if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            //increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money");
            }
            break;
        case 3:
            window.alert("Leaving the store.");

            //do nothing, so funtion will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

//function to set name
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is" + name);
};
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }
};

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack,playerInfo.health );

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    },
];





startGame();
// restart for loop for players to play game again

// Add shop option for players to refill their health after "skip" or end of round.

