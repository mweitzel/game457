var damageText : GameObject;

function Start() {
}

function Update () {
}

function drawNewDamage(numberToDisplay : int, whereToPut : Vector3, howFast : Vector3){
	damageTextClone = Instantiate (damageText, whereToPut, Quaternion.identity);
	damageTextClone.gameObject.rigidbody.velocity = howFast;
	damageTextClone.gameObject.rigidbody.velocity += varianceVector();
	damageTextClone.gameObject.GetComponent("TextMesh").text = "" + numberToDisplay;
//	damageTextClone.gameObject.GetComponent("TextMesh").font.material.color = Color.red;
//	damageTextClone.gameObject.GetComponent("TextMesh").font.material.color.a = .85;
	
/*	
	for(var i = 1.0; i >0; i -= 0.05) {
		yield WaitForSeconds (.1);
		damageTextClone.gameObject.GetComponent("TextMesh").font.material.color.a = i;
	}
	*/
	
//	yield Fade.use.Alpha(damageTextClone.gameObject.GetComponent("TextMesh").font.material, 1.0, 0.0, 2.0, EaseType.Out);

	Destroy(damageTextClone, .8);
}

function varianceVector(){
	someVector = Vector3.one;
	someVector.x *= Random.Range(-1,1);
	someVector.y *= Random.Range(-1,1);
	someVector.z *= Random.Range(-1,1);
	return someVector;
}