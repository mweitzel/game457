var whoAmIListeningFor : Collider;

function Update () {
}

function OnControllerColliderHit(){
	print("anything?");
}

var i = 1;
function OnTriggerEnter(other : Collider){
	if(other == whoAmIListeningFor){
		print("anything trigger?"+i);	
		i++;
	}
}

