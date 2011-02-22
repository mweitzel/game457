var attack = 1;
var defense = 1;
var health = 1;
var invincible  = false;

	
function Update () {
	if(shouldDie())
		Destroy(gameObject);
}

function shouldDie() {
	return health <= 0 && !invincible;
}

function DecreaseHealth(amount){
	health -= amount;	
}


