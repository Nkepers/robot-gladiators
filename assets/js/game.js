//Player will be prompted to create a name for their robot.
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

//Create the function
var fight = function () {
    //Alert the players that the round is starting
    window.alert("Welcome to Robot Gladiators!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")
    //If player chooses FIGHT then:
    if (promptFight === "FIGHT" || promptFight === "fight") {


        //Subtract playerAttack from enemyHealth
        enemyHealth = enemyHealth - playerAttack;
        //Log a message showing it worked
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. "
        );
        //Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //Subtract enemyAttack from playerHealth
        playerHealth = playerHealth - enemyAttack;
        //Log a message showing it worked
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
        );
        //Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health remaining.");
        }
    }
    else if
        (promptFight === "SKIP" || promptFight === "skip") {
        //Confirm if the player wants to skip the fight
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight!");
            //subtract money from player for skipping the fight
            playerMoney = playerMoney - 2;
        }
        //If no (false), ask question again by running fight() again
        else {
            fight();
        }
    }
}
//Execute the function
fight();