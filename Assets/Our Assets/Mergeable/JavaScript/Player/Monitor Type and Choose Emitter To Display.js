var fire : GameObject;
var water : GameObject;
var earth : GameObject;

var currentType;
var currentEffect;
function Start() {
 currentType = gameObject.GetComponent(Stats).eleType	== "WATER";
 currentEffect = Instantiate(fire);
}

function Update() {
	realCurrentType = gameObject.GetComponent(Stats).eleType;
	if(currentType != realCurrentType){
		currentType = realCurrentType;
		dealWithIt(currentType);
	}
	currentEffect.transform.position = gameObject.transform.position;
}

function dealWithIt(elementType){
	turnAllOff();
	if(elementType == "FIRE")
		 ChangeToFire();
	if(elementType == "WATER")
		 ChangeToWater();
	if(elementType == "EARTH")
		 ChangeToEarth();
}

function ChangeToFire() {
	currentEffect = Instantiate(fire);
}
function ChangeToWater() {
	currentEffect = Instantiate(water);
}
function ChangeToEarth() {
	currentEffect = Instantiate(earth);
}
function turnAllOff() {
	Destroy (currentEffect);
}