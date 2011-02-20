var damageRules : DamageApplier;
function Update () {
}

function OnCollisionEnter(collision : Collision) {
	
	attacker = this.gameObject.GetComponent("Stats");
	defender = collision.collider.gameObject;
	if(isAnObjectWithStats(defender))
		damageRules.applyAttack(attacker, isAnObjectWithStats(defender));
	
	Destroy(gameObject);
	
}

function isAnObjectWithStats(thingToCheck){
	return thingToCheck.GetComponent("Stats");	
}