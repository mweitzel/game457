/// <summary>
/// ControllerColliderHit.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Only one per level adjust all damage,
/// variables:
///	DamageApplier
/// </summary>
var damageApplier : DamageApplier;

function OnControllerColliderHit (hit : ControllerColliderHit)
{
	checkForDamageToYou(hit);
}

function checkForDamageToYou(otherObject){
// suggested renaming them to world or enemy ?
//currentCollisionEntity object hit playing.
	currentCollisionEntity = otherObject.gameObject.GetComponent("Stats"); 

	player = gameObject.GetComponent("Stats");
	if(currentCollisionEntity && player/*us*/) {
		//damageApplier.applyAttack(them, player/*us*/);
		damageApplier.applyAttack(currentCollisionEntity, player);
		}
}
