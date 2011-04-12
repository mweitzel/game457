var explodingThing : GameObject;

function OnDestroy () {
	Instantiate(explodingThing);
	yield WaitForSeconds (4);
	Application.LoadLevel("Credit");
}