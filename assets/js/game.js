// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

//Player will be prompted to create a name for their robot.
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

//Create the function
var fight = function (enemyNames) {
    //Repeat and execute as long as the enemy robot is alive
    while (playerHealth > 0 && enemyHealth > 0) {
        //Ask if player wants to run or fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

        if (promptFight === "SKIP" || promptFight === "skip") {
            //Confirm if the player wants to skip the fight
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight!");
                //subtract money from player for skipping the fight
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //generate random damage based on player's attack
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);
        //Log a message showing it worked
        console.log(
            playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining. "
        );
        //Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyNames + " has died!");
            break;
        }
        else {
            window.alert(enemyNames + " still has " + enemyHealth + " health left.");
        }

        //Subtract enemyAttack from playerHealth
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);
        //Log a message showing it worked
        console.log(
            enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
        );
        //Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health remaining.");
        }
    }
};

//function to start new game
var startGame = function () {
    //Reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        // if player is still alive, keep fighting
        if (playerHealth > 0) {
            // let player know what round they are in and add 1 to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
            // pick new enemy to fight
            var pickedEnemyName = enemyNames[i];
            // reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);
            // pass the pickedEnemyName variable's value into the fight function
            fight(pickedEnemyName);

            //if we're still alive and not at the last enemy in the array, prompt the shop
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Good job surviving the game, you're score is " + playerMoney + ".");
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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("Not enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("Not enough money!");
            }
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