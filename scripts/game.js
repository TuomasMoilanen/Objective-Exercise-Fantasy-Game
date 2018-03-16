
  function Hero(name, level, health) {
    this.name = name;
    this.level = level;
    this.health = health;
  }

//Constructor for Warrior object which inherits properties from Hero -class. Every warrior also has name, level and health and also one property unique to them: weapon.
  function Warrior(name, level, health, weapon) {
    Hero.call(this, name, level, health);
    this.weapon = weapon;
  }

//Constructor for Mage object which inherits properties from Hero -class. Every Mage also has name, level and health and also one property unique to them: spell.
  function Mage(name, level, health, spell) {
    Hero.call(this, name, level, health);
    this.spell = spell;
  }

  function Monster(name, health){
    this.name = name;
    this.health = health;
    this.weapon = ["fangs", "bite"];
  }

// Link prototypes so that Warrior and Mage get the properties and methods from Hero.prototype.
Warrior.prototype = Object.create(Hero.prototype);
Mage.prototype = Object.create(Hero.prototype);

//Add methods to existing prototypes.
Hero.prototype.greet = function () {
  console.log(this.name + " says hello.");
}

//Warriors can attack. When calling this function, one needs to define the object of the attack. => playerWarrior.attack(monster)
Warrior.prototype.attack = function (target) {
  console.log(`${this.name} attacks ${target.name} with the ${this.weapon}.`);
  target.health = target.health-10;
  console.log(`${target.name} has ${target.health} health left.`);
}

//Mages can heal. When calling this function, one needs to specify the target object => playerMage.heal(playerWarrior)
  Mage.prototype.heal = function (target) {
    target.health = target.health+15;
    console.log(`${this.name} casts ${this.spell} on ${target.name}. ${target.name} has ${target.health} left.`);
    console.log(this.name + " casts " + this.spell + " on " );
  }

//Create instances of different classes
var playerWarrior = new Warrior('Bjorn', 1, 100, 'axe');
var playerMage = new Mage('Ben', 1, 80, 'cure');
var enemy = new Monster('Johnny', 200);


//Testing the different methods
  function fight(){
    playerWarrior.greet();
    playerWarrior.attack(enemy);
    playerMage.greet();
    playerMage.heal(playerWarrior);
  }
