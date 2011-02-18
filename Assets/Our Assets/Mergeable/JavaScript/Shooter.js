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
	var shootDirection = GetComponent(DirectionToShoot).vector;
//	Physics.IgnoreCollision(clone.collider, GetComponent(CharacterController).collider);
	clone = Instantiate(projectile, transform.position, transform.rotation);
	clone.position += shootDirection;
	clone.velocity = GetComponent(CharacterController).velocity + 13*shootDirection;
}

function shouldShoot(){
	return Input.GetButtonDown("Fire1");
}