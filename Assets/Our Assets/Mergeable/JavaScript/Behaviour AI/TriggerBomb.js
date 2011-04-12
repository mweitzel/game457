var explosionStrength = 10;
var delayTime = 1;
var bomb : Stats[];


function Update () {
	
}

function respond() {
	whichType = Random.Range(0,bomb.length);
	whichType = Mathf.Floor(whichType);
	
	yield WaitForSeconds (delayTime);
	positionToMake = gameObject.transform.position;
	clone = Instantiate(bomb[whichType], positionToMake, Quaternion.identity);
	clone.GetComponent(Stats).attack = explosionStrength;
	Destroy(clone, 2);	
}