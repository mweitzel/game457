/// <summary>
/// DamageApplier.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Only one per level adjust all damage,
/// variables:
///	none
/// </summary>
function Update () {
}

function applyAttack(attacker : Stats, defender : Stats) {
	//damageTotal = baseDamage(attacker, defender) * variance();
	var damageTotal = baseDamage(attacker, defender) * variance();
	// Change for elements
	//---------------------
	// Elements
	// 0: fire
	// 1: water
	// 2: earth
	//----------------------
	switch(attacker.eleType)
	{
		case 0: // fire
			if(defender.eleType == 0) // standard ==
				break;
			if(defender.eleType == 1) // heal or low dps <
			{
				 damageTotal = -90 + damageTotal;
				 break;
			}
			if(defender.eleType == 2) // bonus >
			{
				 damageTotal = damageTotal*2;
				 break;
			}
		case 1: // water
			if(defender.eleType == 0) // bonus >
			{
				damageTotal = damageTotal*2;
				break;
			}
			if(defender.eleType == 1) // standard ==
				break;
			if(defender.eleType == 2) // heal or low dps <
			{
				damageTotal = -90 + damageTotal;
				break;
			}
		case 2: // earth
			if(defender.eleType == 0) // heal or low dps <
			{
				 damageTotal = -90 + damageTotal;
				 break;
			 }
			if(defender.eleType == 1) // bonus >
			{
				 damageTotal = damageTotal*2;
				 break;
			 }
			if(defender.eleType == 2) // standard ==
				break;

		default:
				Debug.Log(defender.eleType + ": Is not an Element Type");
				break;
	}
	
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
	
//	if(defender.invincible)
	
	gameObject.GetComponent("DamageTextDrawer").drawNewDamage(damageToDisplay, defender.transform.position, aDirection);
	// Added calvin
	//return damageTotal;
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