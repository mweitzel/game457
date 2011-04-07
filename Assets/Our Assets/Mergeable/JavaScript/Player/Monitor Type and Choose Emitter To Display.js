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
}

function turnAllOff() {
/*	fire.emit = false;
	water.emit = false;
	earth.emit = false;	*/
}