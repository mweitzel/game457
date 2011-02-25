/// <summary>
/// Shooter.js
/// Feb 22, 2011
/// Matthew Weitzel
/// On mouse click attacks,
/// variables:
///	none
/// </summary>
var projectile : GameObject;

function Update () {
	// Ctrl was pressed, launch a projectile
	if (shouldShoot()) {
		//shoot();
		shoot();
	}
}

function shoot(){

	var clone : GameObject;
	var shootDirection = GetComponent(DirectionToShoot).vector;

	clone = Instantiate(projectile, transform.position, transform.rotation);
//	clone.transform.position += 2*shootDirection;
	clone.rigidbody.velocity = GetComponent(CharacterController).velocity + 13*shootDirection;
	
	Physics.IgnoreCollision(collider, clone.collider);
	
	Destroy(clone, 1.2);
}

function shouldShoot() {
//	return Input.GetKeyDown(KeyCode.Mouse0);

	return Input.GetButtonDown("Fire1");
}
/*
function mouseShoot(){

	var clone : GameObject;
	clone = Instantiate(projectile, transform.position, transform.rotation);
	Destroy(clone, 1);
	
	var playerPlane = new Plane(Vector3.up, transform.position);
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hitdist = 0.0;

	if (playerPlane.Raycast (ray, hitdist)) {
		var targetPoint = ray.GetPoint(hitdist);
		
		aVector3 = targetPoint - transform.position;
		aVector3.y = aVector3.z;
		aVector3.z = 0;
		aVector3.Normalize();
		
		Physics.IgnoreCollision(collider, clone.collider);
	//	clone.transform.position = 2*aVector3 + transform.position;		
		clone.rigidbody.velocity = aVector3*13;
	}
}
*/

function mouseShoot2() {
	position = Vector3.up*10;
	var clone : GameObject;
	clone = Instantiate(projectile, transform.position, transform.rotation);
	//Destroy(clone, 1);
	
	
	clone.rigidbody.velocity = Input.mousePosition*10 + Vector3.right;	
	
}



