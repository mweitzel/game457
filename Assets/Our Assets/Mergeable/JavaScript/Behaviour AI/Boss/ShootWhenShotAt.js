
function Update () {
}

function OnCollisionEnter(other : Collision) { 
	
	this.gameObject.GetComponent(AIShooterRandomDirection).shoot();
}