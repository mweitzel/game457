var targetPointFirst : Collider;
var targetPointOther : Collider;

var walkSpeed = 5;

var currentTarget;
var directionToGo;// = Vector3.left;

function Start(){
	currentTarget = targetPointFirst;
	directionToGo = findDirectionFromMeTo(targetPointFirst);
}

function Update () {
	walkWhereIShould();
}

function walkWhereIShould(){
	directionToGo = findDirectionFromMeTo(currentTarget);
	goTo(directionToGo);		
}


function goTo(directionToGo : Vector3){
	directionToGo.Normalize();
	gameObject.transform.position.x += directionToGo.x * walkSpeed * Time.deltaTime;

}

function findDirectionFromMeTo(targetDirection : Collider){
	var aDirection = targetDirection.transform.position;// gameObject.GetComponent("AttackableEnemy").transform.position -targetDirection.transform.position;

	aDirection.y = 0;
	//aDirection.Normalize();

	return aDirection;
}

function OnCollisionEnter(collision : Collision){
	print("happened");
	if(collision.collider == currentTarget)
		directionToGo = findDirectionFromMeTo(findNextTarget(currentTarget));
}

function findNextTarget(currentTarget : Collider){
	if(currentTarget == targetPointFirst)
		nextTarget = targetPointOther;
	else
		nextTarget = targetPointFirst;
		
	return nextTarget;
}



function OnTriggerEnter(other : Collider){
	currentTarget = findNextTarget(other);	
}