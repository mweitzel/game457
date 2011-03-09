/// <summary>
/// DamageApplier.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Only one per level adjust all damage,
/// variables:
///	none
/// </summary>

var fire = 0;
var water = 1;
var earth = 2;

function Update () {
}

function applyAttack(attacker : Stats, defender : Stats) {
	
	var damageTotal = baseDamage(attacker, defender) * variance();


	damageTotal = applyElementalRelations(attacker, defender, damageTotal);

	// Can Take Damage
	if(!defender.invincible){
		defender.DecreaseHealth(damageTotal);
		damageToDisplay = "" + Mathf.Round(damageTotal);
	}
	// Can Not Take Damage
	else{
		damageToDisplay = "Invincible";
	}
	
	if(attacker.gameObject.GetComponent("Rigidbody"))
		aDirection = attacker.gameObject.rigidbody.velocity;
	else
		aDirection = Vector3.zero;
		
	gameObject.GetComponent("DamageTextDrawer").drawNewDamage(damageToDisplay, defender.transform.position, aDirection);
}


function applyElementalRelations(attacker : Stats, defender : Stats, damageTotal : int){
		return damageTotal*elementMultiplier(attacker.eleType, defender.eleType);
}

function elementMultiplier(attackerType : int, defenderType : int){

	if(attackerType == defenderType)
		return 1;
	if((attackerType == fire && defenderType == water)
	|| (attackerType == water && defenderType == earth)
	|| (attackerType == earth && defenderType == fire))
		return -0.5;
	else
		return 2;
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