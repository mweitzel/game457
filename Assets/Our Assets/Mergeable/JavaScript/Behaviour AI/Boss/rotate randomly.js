var rotationalVelocity = 3;
var changeDirectionEverySoManySeconds = 3;

var timeToChangeDirection;

var randomDirectionA;
var randomDirectionB;
var randomDirectionC;

function Start(){
	timeToChangeDirection = Time.time;
	pickNewDirections();
}

function Update() {
	if(itIsTimeForNewDirection()){
		pickNewDirections();
		resetTime();
	}
	setRandomRotation();	
}

function resetTime(){
	timeToChangeDirection = Time.time + changeDirectionEverySoManySeconds;	
}

function itIsTimeForNewDirection() {
	return (timeToChangeDirection < Time.time);
}

function setRandomRotation(){
	transform.Rotate(randomDirectionA * rotationalVelocity * Vector3.right * Time.deltaTime);
	transform.Rotate(randomDirectionB * rotationalVelocity * Vector3.up * Time.deltaTime);
	transform.Rotate(randomDirectionC * rotationalVelocity * Vector3.forward * Time.deltaTime);	
}

function pickNewDirections() {
	randomDirectionA = Random.Range(-1, 1);
	randomDirectionB = Random.Range(-1, 1);
	randomDirectionC = Random.Range(-1, 1);		
}