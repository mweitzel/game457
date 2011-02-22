function Update () {
}

function applyAttack(attacker : Stats, defender : Stats) {
	
	damageTotal = baseDamage(attacker, defender) * variance();
	
	if(!defender.invincible){
		defender.DecreaseHealth(damageTotal);
		damageToDisplay = "" + Mathf.Round(damageTotal);
	}
	else{
		damageToDisplay = "Invincible";
	}
	
	if(attacker.gameObject.GetComponent("Rigidbody"))
		aDirection = attacker.gameObject.rigidbody.velocity;
	else
		aDirection = Vector3.zero;
	
//	if(defender.invincible)
		
	
	gameObject.GetComponent("DamageTextDrawer").drawNewDamage(damageToDisplay, defender.transform.position, aDirection);
}

function baseDamage(attacker : Stats, defender : Stats) {
	return ((10.0 * attacker.attack / defender.defense) + 2);
}

function variance() {
	return randomBetween80And100() / 100.0;
}

function randomBetween80And100() {
	return Random.Range(0, 20) + 80;	
}