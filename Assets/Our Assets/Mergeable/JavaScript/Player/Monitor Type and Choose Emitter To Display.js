var fire : GameObject;
var fireBurst : GameObject;
var fireOffset = -2.5;
var water : GameObject;
var waterBurst : GameObject;
var waterOffset = -2.5;
var earth : GameObject;
var earthBurst : GameObject;
var earthOffset = 0;
var currentOffset;

var currentType;
var currentEffect;
function Start() {
 currentType = gameObject.GetComponent(Stats).eleType	== "WATER";
 currentEffect = Instantiate(fire);
 currentOffset = fireOffset;
}

function Update() {
	realCurrentType = gameObject.GetComponent(Stats).eleType;
	if(currentType != realCurrentType){
		currentType = realCurrentType;
		dealWithIt(currentType);
	}
	currentEffect.transform.position = this.gameObject.transform.position;
	currentEffect.transform.position.y += currentOffset;
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
	currentOffset = fireOffset;
	burst = Instantiate(fireBurst);
	burst.transform.position = gameObject.transform.position;
	burst.transform.position.y += currentOffset;
	Destroy(burst, 1);
	currentEffect = Instantiate(fire);
}
function ChangeToWater() {
	currentOffset = waterOffset;
	burst = Instantiate(waterBurst);
	burst.transform.position = gameObject.transform.position;
	burst.transform.position.y += currentOffset;
	Destroy(burst, 1);
	currentEffect = Instantiate(water);
}
function ChangeToEarth() {
	currentOffset = earthOffset;
	burst = Instantiate(earthBurst);
	burst.transform.position = gameObject.transform.position;
	burst.transform.position.y += currentOffset;
	Destroy(burst, 1);
	currentEffect = Instantiate(earth);
}
function turnAllOff() {
	Destroy (currentEffect);
}