var explodingThing : GameObject;

function OnDestroy () {
	Instantiate(explodingThing);

	Application.LoadLevel("Credit");
}