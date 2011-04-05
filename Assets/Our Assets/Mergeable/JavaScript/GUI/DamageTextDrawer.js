/// <summary>
/// DamageTextDrawer.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Displays damage text
/// variables:
///	damageText
/// </summary>
var damageText : GameObject;
var healingText : GameObject;
var showInvincible = false;

function Start() {
}

function Update () {
}

function drawNewDamage(numberToDisplay : String, whereToPut : Vector3, howFast : Vector3){

	if(!showInvincible){
		if(numberToDisplay == "Invincible")
			return;
	}
	
	textToUse = null;
	if(numberToDisplay[0] == '-'){
		textToUse = healingText;
		
	}
	else{
		textToUse = damageText;
		
	}

	damageTextClone = Instantiate (textToUse, whereToPut, Quaternion.identity);
	damageTextClone.gameObject.rigidbody.velocity = howFast;
	damageTextClone.gameObject.rigidbody.velocity += varianceVector();
	damageTextClone.gameObject.GetComponent("TextMesh").text = numberToDisplay;
	
	if(numberToDisplay[0] == '-'){
	damageTextClone.gameObject.GetComponent("TextMesh").font.material.color = Color.green;
	}
	else{
	damageTextClone.gameObject.GetComponent("TextMesh").font.material.color = Color.red;
	}

	damageTextClone.gameObject.GetComponent("TextMesh").font.material.color.a = .85;

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
	someVector.z *= Random.Range(0,1);
	return someVector;
}