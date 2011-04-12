
var projectiles : GameObject[];
var projectile;

function Start(){
	projectile = projectiles[0];	
}

function Update () {
//	if (shouldShoot()) {
//		shoot();
//	}
}

function shoot(){	

	var clone : GameObject;
	var shootDirection : Vector3;
	shootDirection = new Vector3(Random.Range(-1,1), Random.Range(-1,1), 0);
	shootDirection.Normalize();
	clone = Instantiate(projectile, transform.position, transform.rotation);
	clone.rigidbody.velocity = 5*shootDirection;
	Physics.IgnoreCollision(collider, clone.collider);
	
	Destroy(clone, 1.2);
}
function shoot(setDestoryRange : int){	

	var clone : GameObject;
	var shootDirection = GetComponent(GetVectorFromTarget).getVector();
	clone = Instantiate(projectile, transform.position, transform.rotation);
	clone.rigidbody.velocity = GetComponent(CharacterController).velocity + 5*shootDirection;
	Physics.IgnoreCollision(collider, clone.collider);
	
	Destroy(clone, setDestoryRange);
}
function shoot(setDestoryRange : int, setTargetDirection : int){	

	var clone : GameObject;
	//var shootDirection = GetComponent(GetVectorFromTarget).getVector();
	var shootDirection = setTargetDirection;
	clone = Instantiate(projectile, transform.position, transform.rotation);
	clone.rigidbody.velocity = GetComponent(CharacterController).velocity + 5*shootDirection;
	Physics.IgnoreCollision(collider, clone.collider);
	
	Destroy(clone, setDestoryRange);
}
//
//function updateProjetile() {
//	for (var aProjectile in projectiles)
//		if(aProjectile.GetComponent(Stats).eleType == gameObject.GetComponent(Stats).eleType)
//			projectile = aProjectile;
//	
//}
//

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
/*
function mouseShoot2() {
	position = Vector3.up*10;
	var clone : GameObject;
	clone = Instantiate(projectile, transform.position, transform.rotation);
	//Destroy(clone, 1);
	
	
	clone.rigidbody.velocity = Input.mousePosition*10 + Vector3.right;	
	
}



*/