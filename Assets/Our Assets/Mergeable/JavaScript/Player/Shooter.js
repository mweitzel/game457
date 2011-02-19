var projectile : GameObject;

function Update () {
	// Ctrl was pressed, launch a projectile
	if (shouldShoot()) {
		shoot();
	}
}

function shoot(){

	var clone : GameObject;
	var shootDirection = GetComponent(DirectionToShoot).vector;

	clone = Instantiate(GameObject.Find("Bullet"), transform.position, transform.rotation);
	clone.transform.position += shootDirection;
	clone.rigidbody.velocity = GetComponent(CharacterController).velocity + 13*shootDirection;
}

function shouldShoot(){
	return Input.GetButtonDown("Fire1");
}