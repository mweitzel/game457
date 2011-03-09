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
var invincible  = false;
var isPlayer = false;
var eleType = "WATER";

function Update () {
	destroyObjectIfPossible();
	updateHealthBar();
}

function destroyObjectIfPossible(){
	if(shouldDie())
		Destroy(gameObject);
}

function updateHealthBar(){
	if(isPlayer == true) {
		var hpBar : PlayerHealth;
		hpBar = this.gameObject.GetComponent("PlayerHealth");
		hpBar. SetCurrentHealth(health);
	}
}

function shouldDie() {
	return health <= 0 && !invincible;
}

function DecreaseHealth(amount){
	health -= amount;	
}


