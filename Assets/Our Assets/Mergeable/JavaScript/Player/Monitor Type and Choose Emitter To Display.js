var fire : GameObject;
var fireBurst : GameObject;
var water : GameObject;
var waterBurst : GameObject;
var earth : GameObject;
var earthBurst : GameObject;

var heightAdjust = -2.5;

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
	currentEffect.transform.position = this.gameObject.transform.position;
	currentEffect.transform.position.y += heightAdjust;
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
	burst = Instantiate(fireBurst);
	burst.transform.position = gameObject.transform.position;
	burst.transform.position.y += heightAdjust;
	Destroy(burst, 1);
	currentEffect = Instantiate(fire);
}
function ChangeToWater() {
	burst = Instantiate(waterBurst);
	burst.transform.position = gameObject.transform.position;
	burst.transform.position.y += heightAdjust;
	Destroy(burst, 1);
	currentEffect = Instantiate(water);
}
function ChangeToEarth() {
	burst = Instantiate(earthBurst);
	burst.transform.position = gameObject.transform.position;
	burst.transform.position.y += heightAdjust;
	Destroy(burst, 1);
	currentEffect = Instantiate(earth);
}
function turnAllOff() {
	Destroy (currentEffect);
}