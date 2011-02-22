var damageApplier : DamageApplier;

function OnControllerColliderHit (hit : ControllerColliderHit)
{
	checkForDamageToYou(hit);
}

function checkForDamageToYou(otherObject){
	them = otherObject.gameObject.GetComponent("Stats");
	us = gameObject.GetComponent("Stats");
	if(them && us)
		damageApplier.applyAttack(them, us);
}
