// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma!
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

//Create the function
var fight = function (enemy) {
    //Repeat and execute as long as the enemy robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        //Ask if player wants to run or fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

        if (promptFight === "SKIP" || promptFight === "skip") {
            //Confirm if the player wants to skip the fight
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight!");
                //subtract money from player for skipping the fight
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        //generate random damage based on player's attack
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        //Log a message showing it worked
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. "
        );
        //Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //Subtract enemyInfo.attack from playerInfo.health
        var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        //Log a message showing it worked
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
        );
        //Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining.");
        }
    }
};

//function to start new game
var startGame = function () {
    //Reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in and add 1 to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
            // pick new enemy to fight
            var pickedEnemyObj = enemyInfo[i];
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            // pass the pickedEnemyName variable's value into the fight function
            fight(pickedEnemyObj);

            //if we're still alive and not at the last enemy in the array, prompt the shop
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to shop before next round
                var storeConfirm = window.confirm("You win, would you like to visit the shop?")
                //if yes, proceed to store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }

        // if player isn't alive, stop the game
        else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    endGame();
}


//Function to end the game
var endGame = function () {
    //If the player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Good job surviving the game, you're score is " + playerInfo.money + ".");
    }
    else {
        window.alert("The game has now ended, you lost your robot.");
    }
    //ask the player if they want to go again
    var playAgainConfirm = window.confirm("Play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }

    else {
        window.alert("Thanks for playing, come back soon!");
    }
};

var shop = function () {
    //ask player what they want to do
    var shopOptionPropmt = window.prompt(
        "Would you like to REFILL health, UPGRADE attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.?"
    );

    switch (shopOptionPropmt) {

        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            //do nothing so function ends
            break;

        default:
            window.alert("You did not pick a valid option, try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//Start the game when page loads
startGame();