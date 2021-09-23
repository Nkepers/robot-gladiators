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
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //Subtract playerAttack from enemyHealth
        enemyHealth = enemyHealth - playerAttack;
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
        playerHealth = playerHealth - enemyAttack;
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
            enemyHealth = 50;
            // pass the pickedEnemyName variable's value into the fight function
            fight(pickedEnemyName);
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

//Start the game when page loads
startGame();