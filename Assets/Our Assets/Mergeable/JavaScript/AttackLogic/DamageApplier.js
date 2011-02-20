
function Update () {
}

function applyAttack(attacker : Stats, defender : Stats) {
	
	damageTotal = baseDamage(attacker, defender) * variance();

	defender.DecreaseHealth(damageTotal);
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