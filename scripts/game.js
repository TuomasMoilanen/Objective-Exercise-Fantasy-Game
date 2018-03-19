
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

function Monster(name, health, weapon){                                         //proto for regular monsters
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

//Warriors can attack. When calling this function, one needs to define the object of the attack. => playerWarrior.attack(monster)
Warrior.prototype.attack = function (target) {
console.log(`${this.name} attacks ${target.name} with the ${this.weapon}.`);
target.health = target.health - 10;
console.log(`${target.name} has ${target.health} health left.`);
}

//Mages can heal. When calling this function, one needs to specify the target object => playerMage.heal(playerWarrior)
Mage.prototype.spell = function (target) {
  target.health = target.health + 15;
  console.log(`${this.name} casts ${this.spell} on ${target.name}. ${target.name} has ${target.health} left.`);
}

//Create instances of different classes
var playerCharacter;
var wolf = new Monster('Wolf', 150, "Fangs");
var cultist = new Villain("Cultist", 100, "Dagger");

function createCharacter(){                                                     //starts the player character creation
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
    playerCharacter =
    new Warrior(document.getElementById("characterNameInput").value,
    document.getElementById("characterGenderInput").value, 1, 100, "Axe",
    "Block");
  }
  function createMage(){                                                        //creates a player mage
    playerCharacter =
    new Mage(document.getElementById("characterNameInput").value,
    document.getElementById("characterGenderInput").value, 1, 75, "Staff",
    "Heal");
  }
  function createRogue(){                                                       //creates a player rogue
    playerCharacter =
    new Rogue(document.getElementById("characterNameInput").value,
    document.getElementById("characterGenderInput").value, 1, 75, "Daggers",
    "Backstab");
  }
}

//Testing the different methods
function fight(){
  playerWarrior.greet();
  playerWarrior.attack(enemy);
  playerMage.greet();
  playerMage.heal(playerWarrior);
}
