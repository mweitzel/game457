function Update () {
}

function applyAttack(attacker : Stats, defender : Stats) {
	
	damageTotal = baseDamage(attacker, defender) * variance();

	defender.DecreaseHealth(damageTotal);
	
	if(attacker.gameObject.GetComponent("Rigidbody"))
		aDirection = attacker.gameObject.rigidbody.velocity;
	else
		aDirection = Vector3.zero;
	
	gameObject.GetComponent("DamageTextDrawer").drawNewDamage(damageTotal, defender.transform.position, aDirection);
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