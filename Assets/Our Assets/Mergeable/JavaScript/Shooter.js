var projectile : Rigidbody;

function Update () {
	// Ctrl was pressed, launch a projectile
	if (shouldShoot()) {
		shoot();
	}
}

function shoot(){
	// Instantiate the projectile at the position and rotation of this transform
	var clone : Rigidbody;
	var lastDirectionVector = GetComponent(LastDirection).vector;
//	Physics.IgnoreCollision(clone.collider, GetComponent(CharacterController).collider);
	clone = Instantiate(projectile, transform.position, transform.rotation);
	clone.position.x = clone.position.x  + lastDirectionVector.x;
	clone.velocity = GetComponent(CharacterController).velocity + 10*lastDirectionVector;
}

function shouldShoot(){
	return Input.GetButtonDown("Fire1");
}