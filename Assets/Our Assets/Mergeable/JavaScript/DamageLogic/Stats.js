/// <summary>
/// Stats.js
/// Feb 22, 2011
/// Matthew Weitzel
/// 
/// Stores information about the entity.
/// 
/// </summary>
var attack = 1;
var defense = 1;
var health = 1;
var maxHealth = 1;
var invincible  = false;
var eleType = "WATER";

function Update () {
	destroyObjectIfPossible();
}

function destroyObjectIfPossible(){
	if(shouldDie())
		Destroy(gameObject);
}

function shouldDie() {
	return health <= 0 && !invincible;
}

function DecreaseHealth(amount){
	health -= amount;	
	
	if(health > maxHealth)
		health = maxHealth;
}
function Kill(){
	health = 0;
}


