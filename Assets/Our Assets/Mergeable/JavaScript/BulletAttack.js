var projectile : Rigidbody;
function Update () {
}

function OnCollisionEnter(collision : Collision) {
	
	//Destroy(collision.collider.gameObject, 1); 
	Destroy(gameObject);
	
	GameObject.Find("DamageApplier").GetComponent("DamageApplier").applyAttack(collision.collider.gameObject);
	
	
}