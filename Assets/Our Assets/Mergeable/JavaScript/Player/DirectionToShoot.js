/// <summary>
/// DirectionToShoot.js
/// Feb 22, 2011
/// Matthew Weitzel
/// Selects a direction to fire.
/// variables:
///	private var rightOrLeft = Vector3.right;
///	private var upOrDown = Vector3.up;
///	public var vector;
/// </summary>
private var rightOrLeft = Vector3.right;
private var upOrDown = Vector3.up;
public var vector;

function Update () {


	SetLeftOrRight();	
	SetUpOrDown();
	
	if(HoldingDirectionAndVerticle())
		SetDirectionToDiagonal();
	else if(HoldingVerticle())
		SetDirectionToVerticle();
	else
		SetDirectionToHorizontal();
		
		
}

function SetLeftOrRight(){
	if(Input.GetKeyDown("right"))
		rightOrLeft = Vector3.right;
	if(Input.GetKeyDown("left"))
		rightOrLeft = Vector3.left;
}

function SetUpOrDown(){
	if(Input.GetKey("up"))
		upOrDown = Vector3.up;
	else
		upOrDown = (-1) * Vector3.up;
}

function HoldingDirectionAndVerticle(){
	return (HoldingVerticle()) && (Input.GetKey("right") || Input.GetKey("left"));
}

function HoldingVerticle() {
	return Input.GetKey("up") || Input.GetKey("down");
}

function SetDirectionToDiagonal(){
	vector = rightOrLeft + upOrDown;	
}

function SetDirectionToVerticle(){
	vector = upOrDown;
}

function SetDirectionToHorizontal(){
	vector = rightOrLeft;	
}