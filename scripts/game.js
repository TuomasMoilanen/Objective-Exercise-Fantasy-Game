
function start(){                                                               // disabling the battle buttons
  document.getElementById("playerAxeAttackButton").disabled = true;
  document.getElementById("playerKnifeAttackButton").disabled = true;
  document.getElementById("wolfTurnButton").disabled = true;
  $(document).ready(function(){
    $("#battleContainer").hide();
    $("#battleButton").hide();
    $("#battleButton").on("click", function(){
      $("#battleContainer").show();
    });
  });
}

function Hero(name, gender, level, health, weapon) {                             //a proto for a player character
  this.name = name;
  this.gender = gender;
  this.level = level;
  this.health = health;
  this.weapon = weapon;
}

function Warrior(name, gender, level, health, weapon, ability) {                //warrior class proto
  Hero.call(this, name, gender, level, health, weapon);
  this.ability = ability;
}

function Mage(name, gender, level, health, weapon, spell) {                     //mage class proto
  Hero.call(this, name, gender, level, health, weapon);
  this.spell = spell;
}

function Rogue(name, gender, level, health, weapon, ability){                   //rogue class proto
  Hero.call(this, name, gender, level, health, weapon);
  this.ability = ability;
}

function Wolf(name, health, weapon){                                            //proto for regular wolves
  this.name = name;
  this.health = health;
  this.weapon = weapon;
}

function Villain(name, health, weapon){                                         //proto for a villain
  this.name = name;
  this.health = health;
  this.weapon = weapon;
}

// Link prototypes so that Warrior and Mage get the properties and methods from Hero.prototype.
Warrior.prototype = Object.create(Hero.prototype);
Mage.prototype = Object.create(Hero.prototype);
Rogue.prototype = Object.create(Hero.prototype);

//Add methods to existing prototypes.
Hero.prototype.greet = function () {
  console.log(`${this.name} says hello.`);
}

Warrior.prototype.axeAttack = function (){
  var target = enemyList[document.getElementById("playerTarget").value];
  target.health -= 20;
  console.log(`${this.name} attacks ${target.name} with an Axe! Dealing 20 damage! ${target.name}'s health is now ${target.health}.`);
}
Warrior.prototype.knifeAttack = function (){
  var target = enemyList[document.getElementById("playerTarget").value];
  target.health -= 15;
  console.log(`${this.name} attacks ${target.name} with a Knife! Dealing 15 damage! ${target.name}'s health is now ${target.health}.`);
}

var enemyList = new Array();
var charCreated = false;
var playerCharacter;                                                            //declaring global character variables
var wolfie = new Wolf('Wolfie', 150, "Fangs");
enemyList.push(wolfie);
var cultist = new Villain("Cultist", 100, "Dagger");
enemyList.push(cultist);


Wolf.prototype.attack = function (){                                             //Wolf attacks
  function wolfWeapon(){
    let randomWeapon = Math.floor(Math.random() * 2);
    return randomWeapon;
  }
  var tempName = this.name;
  var tempTargetName = playerCharacter.name;
  switch (wolfWeapon()){
    case 0:
      fangsAttack(playerCharacter);
      break;
    case 1:
      biteAttack(playerCharacter);
      break;
    default:
      return;
  }
  function fangsAttack(playerCharacter){
    playerCharacter.health -= 10;
    console.log(`The ${tempName} attacks ${tempTargetName} with Fangs! Dealing 10 damage! ${tempTargetName} current health is ${playerCharacter.health}.`);
  }
  function biteAttack(playerCharacter){
    playerCharacter.health -= 15;
    console.log(`The ${tempName} attacks ${tempTargetName} with a Bite! Dealing 15 damage! ${tempTargetName} current health is ${playerCharacter.health}.`);
  }
}
function createCharacter(){                                                     //starts the player character creation
  var nameField = document.getElementById('characterNameInput').value;
  if(nameField === null || nameField === ""){
    return;
  }
  charCreated = true;
  switch (document.getElementById("characterClassInput").value) {               //checks the player class
    case "Warrior":
      createWarrior();
      break;
    case "Mage":
      createMage();
      break;
    case "Rogue":
      createRogue();
      break;
    default:
      return;
  }
  function createWarrior(){                                                     //creates a player warrior
    let nameInput = document.getElementById("characterNameInput").value;
    let genderInput = document.getElementById("characterGenderInput").value;
    playerCharacter = new Warrior(nameInput, genderInput, 1, 100, "Axe",
      "Block");
  }
  function createMage(){                                                        //creates a player mage
    let nameInput = document.getElementById("characterNameInput").value;
    let genderInput = document.getElementById("characterGenderInput").value;
    playerCharacter = new Mage(nameInput, genderInput, 1, 75, "Staff", "Heal");
  }
  function createRogue(){                                                       //creates a player rogue
    let nameInput = document.getElementById("characterNameInput").value;
    let genderInput = document.getElementById("characterGenderInput").value;
    playerCharacter = new Rogue(nameInput, genderInput, 1, 75, "Daggers",
      "Backstab");
  }
  $(document).ready(function(){
    $('#createCharacterContainer').hide();
    $("#battleButton").show();
  });
}

var turnNumber = 0;                                                             //global battle variables

function battle(){                                                              //a battle
  if(charCreated === true){
    document.getElementById("playerAxeAttackButton").disabled = false;
    document.getElementById("playerKnifeAttackButton").disabled = false;
    document.getElementById("wolfTurnButton").disabled = false;
  }
  else{
    return;
  }
}
