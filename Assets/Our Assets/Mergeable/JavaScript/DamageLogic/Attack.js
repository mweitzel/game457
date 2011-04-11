/// <summary>
/// attack.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Projectile attack script
/// variables:
///	attackLogic
///	destroySelfOnHit
/// </summary>

var attackLogic : DamageApplier;
var destroySelfOnHit = true;

function Update () {
}

function OnCollisionEnter(collision : Collision) {

	attacker = this.gameObject.GetComponent("Stats");
	defender = collision.collider.gameObject;
	print("hello");
	if(isAnObjectWithStats(defender))
		attackLogic.applyAttack(attacker, isAnObjectWithStats(defender));
	print("hello");
	if(destroySelfOnHit)
		Destroy(this.gameObject);
	
}

function isAnObjectWithStats(thingToCheck){
	return thingToCheck.GetComponent("Stats");	
}