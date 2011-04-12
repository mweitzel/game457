/// <summary>
/// ControllerColliderHit.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Only one per level adjust all damage,
/// variables:
///	DamageApplier
/// </summary>
var attackLogic : DamageApplier;

function OnControllerColliderHit (hit : ControllerColliderHit)
{
	checkForDamageToYou(hit);
}

function OnTriggerStay(other : Collider){
	checkForDamageToYou(other);
}
function checkForDamageToYou(otherObject){
// suggested renaming them to world or enemy ?
//currentCollisionEntity object hit playing.
	currentCollisionEntity = otherObject.gameObject.GetComponent("Stats"); 

	player = gameObject.GetComponent("Stats");
	if(currentCollisionEntity && player/*us*/) {
		//attackLogic.applyAttack(them, player/*us*/);
		attackLogic.applyAttack(currentCollisionEntity, player);
		}
}
