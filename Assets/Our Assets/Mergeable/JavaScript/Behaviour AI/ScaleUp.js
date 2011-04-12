var increaseRate = .5;
var original;

function Start() {
	original = increaseRate;	
}

function Update () {
	increaseRate -= 0.01;
	if(increaseRate < original * -1)
		Destroy(gameObject);
	transform.localScale += Vector3(increaseRate, increaseRate, increaseRate);
}