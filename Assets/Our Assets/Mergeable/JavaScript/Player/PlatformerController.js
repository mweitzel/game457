//This script, although modified, originated from the 2D Tutorial Unity provided.  In the tutorial, they encouraged others to use their assets and expand into their own game.
var runTexture : Texture2D;
var jumpTexture : Texture2D;
var deathTexture : Texture2D;
var idleTexture : Texture2D;
var lookingRight;
var runTextureL : Texture2D;
var jumpTextureL : Texture2D;
var deathTextureL : Texture2D;
var idleTextureL : Texture2D;
// current direction
// Does this script currently respond to Input?
var canControl = true;
// The character will spawn at spawnPoint's position when needed.  This could be changed via a script at runtime to implement, e.g. waypoints/savepoints.
var spawnPoint : Transform;
// in work code
	//var newObj = gameObject.Find("Physical Component");
	//newObj.renderer.material.mainTexture = jumpTexture;
class PlatformerControllerMovement {
	// The speed when walking 
	var walkSpeed = 3.0;
	// when pressing "Fire1" button (control) we start running
	var runSpeed = 10.0;

	var inAirControlAcceleration = 1.0;

	// The gravity for the character
	var gravity = 60.0;
	var maxFallSpeed = 20.0;

	// How fast does the character change speeds?  Higher is faster.
	var speedSmoothing = 5.0;

	// This controls how fast the graphics of the character "turn around" when the player turns around using the controls.
	var rotationSmoothing = 10.0;

	// The current move direction in x-y.  This will always been (1,0,0) or (-1,0,0)
	// The next line, @System.NonSerialized , tells Unity to not serialize the variable or show it in the inspector view.  Very handy for organization!
	@System.NonSerialized
	var direction = Vector3.zero;

	// The current vertical speed
	@System.NonSerialized
	var verticalSpeed = 0.0;

	// The current movement speed.  This gets smoothed by speedSmoothing.
	@System.NonSerialized
	var speed = 0.0;

	// Is the user pressing the left or right movement keys?
	@System.NonSerialized
	var isMoving = false;

	// The last collision flags returned from controller.Move
	@System.NonSerialized
	var collisionFlags : CollisionFlags; 

	// We will keep track of an approximation of the character's current velocity, so that we return it from GetVelocity () for our camera to use for prediction.
	@System.NonSerialized
	var velocity : Vector3;
	
	// This keeps track of our current velocity while we're not grounded?
	@System.NonSerialized
	var inAirVelocity = Vector3.zero;

	// This will keep track of how long we have we been in the air (not grounded)
	@System.NonSerialized
	var hangTime = 0.0;
}

var movement : PlatformerControllerMovement;

// We will contain all the jumping related variables in one helper class for clarity.
class PlatformerControllerJumping {
	// Can the character jump?
	var enabled = true;

	// How high do we jump when pressing jump and letting go immediately
	var height = 2.0;
	// We add extraHeight units (meters) on top when holding the button down longer while jumping
	var extraHeight = 4.1;
	
	// This prevents inordinarily too quick jumping
	// The next line, @System.NonSerialized , tells Unity to not serialize the variable or show it in the inspector view.  Very handy for organization!
	@System.NonSerialized
	var repeatTime = 0.05;

	@System.NonSerialized
	var timeout = 0.15;

	// Are we jumping? (Initiated with jump button and not grounded yet)
	@System.NonSerialized
	var jumping = false;
	
	@System.NonSerialized
	var reachedApex = false;
  
	// Last time the jump button was clicked down
	@System.NonSerialized
	var lastButtonTime = -10.0;
	
	// Last time we performed a jump
	@System.NonSerialized
	var lastTime = -1.0;

	// the height we jumped from (Used to determine for how long to apply extra jump power after jumping.)
	@System.NonSerialized
	var lastStartHeight = 0.0;
}
// Calvin 345
// We will contain all the stance related variables in one helper class for clarity.
class PlatformerControllerStance {
	// Can the character change Stance?	
	// This prevents inordinarily too quick jumping
	// The next line, @System.NonSerialized , tells Unity to not serialize the variable or show it in the inspector view.  Very handy for organization!
	@System.NonSerialized
	var repeatTime = 0.01;

	@System.NonSerialized
	var timeout = 0.05;

	// Last time the stance button was clicked down
	@System.NonSerialized
	var lastButtonTime = -10.0;
	
	// Last time we performed a stance change
	@System.NonSerialized
	var lastTime = -1.0;
	
	// Current Stance
	@System.NonSerialized
	var currentStance = 0;
}
var jump : PlatformerControllerJumping;
// Calvin 345
var stance : PlatformerControllerStance;

private var controller : CharacterController;

// Moving platform support.
private var activePlatform : Transform;
private var activeLocalPlatformPoint : Vector3;
private var activeGlobalPlatformPoint : Vector3;
private var lastPlatformVelocity : Vector3;

// This is used to keep track of special effects in UpdateEffects ();
private var areEmittersOn = false;

function Awake () {
	movement.direction = transform.TransformDirection (Vector3.forward);
	controller = GetComponent (CharacterController);
	Spawn ();
}

function Spawn () {
	// reset the character's speed
	movement.verticalSpeed = 0.0;
	movement.speed = 0.0;
	
	// reset the character's position to the spawnPoint
	//transform.position = spawnPoint.position;
	
}

function OnDeath () {
	Spawn ();
}

function UpdateSmoothedMovementDirection () {	
	var h = Input.GetAxisRaw ("Horizontal");
	if (!canControl)
		h = 0.0;
	
	movement.isMoving = Mathf.Abs (h) > 0.1;
	if (movement.isMoving){
		//CharcterTextureDirectionSelect(h);
		runTextureApply();
		movement.direction = Vector3 (h, 0, 0);
	}
	else{
		idleTextureApply();
		//~ if(lookingRight == true)
			//~ switchmainTexture(idleTexture);
		//~ else
			//~ switchmainTexture(idleTextureL);
	}
	
	// Grounded controls
	if (controller.isGrounded) {
		// Smooth the speed based on the current target direction
		var curSmooth = movement.speedSmoothing * Time.deltaTime;
		
		// Choose target speed
		var targetSpeed = Mathf.Min (Mathf.Abs(h), 1.0);
	
		// Pick speed modifier
		if (Input.GetButton ("Fire2") && canControl)
			targetSpeed *= movement.runSpeed;
		else
			targetSpeed *= movement.walkSpeed;
		
		movement.speed = Mathf.Lerp (movement.speed, targetSpeed, curSmooth);
		
		movement.hangTime = 0.0;
	}
	else {
		// In air controls
		movement.hangTime += Time.deltaTime;
		if (movement.isMoving)
			movement.inAirVelocity += Vector3 (Mathf.Sign(h), 0, 0) * Time.deltaTime * movement.inAirControlAcceleration;
	}
}

function FixedUpdate () {
	// Make sure we are absolutely always in the 2D plane.
	transform.position.z = 0;

}

function ApplyJumping () {
	// Prevent jumping too fast after each other
	if (jump.lastTime + jump.repeatTime > Time.time)
		return;

	if (controller.isGrounded) {
		
		// Jump
		// - Only when pressing the button down
		// - With a timeout so you can press the button slightly before landing		
		if (jump.enabled && Time.time < jump.lastButtonTime + jump.timeout) {
			movement.verticalSpeed = CalculateJumpVerticalSpeed (jump.height);
			movement.inAirVelocity = lastPlatformVelocity;
			SendMessage ("DidJump", SendMessageOptions.DontRequireReceiver);
		}
	}

}
// Stance change
function ApplyStanceChange(){
		if (stance.lastTime + stance.repeatTime > Time.time)
			return;
		// Stance
		// - Only when pressing the button down
		// - With a timeout 
		
		//if (stance.enabled && Time.time < stance.lastButtonTime + stance.timeout) {
			// CHANGE ME
			//movement.verticalSpeed = CalculateJumpVerticalSpeed (jump.height);
			//movement.inAirVelocity = lastPlatformVelocity;
			//SendMessage ("DidJump", SendMessageOptions.DontRequireReceiver);
			if (Input.GetButtonDown ("Stance 1") && canControl) {
				stance.lastButtonTime = Time.time;
				ApplyStance(0);
			}
			if (Input.GetButtonDown ("Stance 2") && canControl) {
				stance.lastButtonTime = Time.time;
				ApplyStance(1);
			}
			if (Input.GetButtonDown ("Stance 3") && canControl) {
				stance.lastButtonTime = Time.time;
				ApplyStance(2);
			}
		//}
}
// Stance change 
function ApplyStance(stance : int) {
	//gameObject.tag = "Player";
	//gameObject.tag = "Bullet";
	var stats = gameObject.GetComponent(Stats);
	//stats = Bullet.GetComponent("Stats");
	switch(stance){
		case 0:
			stats.eleType = "FIRE";
			break;
		case 1:
			stats.eleType = "WATER";
			break;
		case 2:
			stats.eleType = "EARTH";
			break;
	}
	
	gameObject.GetComponent(Shooter).updateProjetile();
}


function ApplyGravity () {
	// Apply gravity
	var jumpButton = Input.GetButton ("Jump");
	
	if (!canControl)
		jumpButton = false;
	
	// When we reach the apex of the jump we send out a message
	if (jump.jumping && !jump.reachedApex && movement.verticalSpeed <= 0.0) {
		jump.reachedApex = true;
		SendMessage ("DidJumpReachApex", SendMessageOptions.DontRequireReceiver);
	}
	
	// * When jumping up we don't apply gravity for some time when the user is holding the jump button
	//   This gives more control over jump height by pressing the button longer
	var extraPowerJump =  jump.jumping && movement.verticalSpeed > 0.0 && jumpButton && transform.position.y < jump.lastStartHeight + jump.extraHeight && !IsTouchingCeiling ();
	
	if (extraPowerJump)
		return;
	else if (controller.isGrounded)
		movement.verticalSpeed = -movement.gravity * Time.deltaTime;
	else
		movement.verticalSpeed -= movement.gravity * Time.deltaTime;
		
	// Make sure we don't fall any faster than maxFallSpeed.  This gives our character a terminal velocity.
	movement.verticalSpeed = Mathf.Max (movement.verticalSpeed, -movement.maxFallSpeed);
}

function CalculateJumpVerticalSpeed (targetJumpHeight : float) {
	// From the jump height and gravity we deduce the upwards speed 
	// for the character to reach at the apex.
	return Mathf.Sqrt (2 * targetJumpHeight * movement.gravity);
}

function DidJump () {
	jump.jumping = true;
	jump.reachedApex = false;
	jump.lastTime = Time.time;
	jump.lastStartHeight = transform.position.y;
	jump.lastButtonTime = -10;
}

function UpdateEffects () {
	wereEmittersOn = areEmittersOn;
	areEmittersOn = jump.jumping && movement.verticalSpeed > 0.0;
	
	// By comparing the previous value of areEmittersOn to the new one, we will only update the particle emitters when needed
	if (wereEmittersOn != areEmittersOn) {
		for (var emitter in GetComponentsInChildren (ParticleEmitter)) {
			emitter.emit = areEmittersOn;
		}
	}
}

function Update () {

	if (Input.GetButtonDown ("Jump") && canControl) {
		jump.lastButtonTime = Time.time;
		//renderer.material.mainTexture = jumpTexture;
	}

	UpdateSmoothedMovementDirection();
	
	// Apply gravity
	// - extra power jump modifies gravity
	ApplyGravity ();

	// Apply jumping logic
	ApplyJumping ();
	
	// Apply stance change
	ApplyStanceChange();
	
	// Moving platform support
	if (activePlatform != null) {
		var newGlobalPlatformPoint = activePlatform.TransformPoint(activeLocalPlatformPoint);
		var moveDistance = (newGlobalPlatformPoint - activeGlobalPlatformPoint);
		transform.position = transform.position + moveDistance;
		lastPlatformVelocity = (newGlobalPlatformPoint - activeGlobalPlatformPoint) / Time.deltaTime;
	} else {
		lastPlatformVelocity = Vector3.zero;	
	}
	
	activePlatform = null;
	
	// Save lastPosition for velocity calculation.
	lastPosition = transform.position;
	
	// Calculate actual motion
	var currentMovementOffset = movement.direction * movement.speed + Vector3 (0, movement.verticalSpeed, 0) + movement.inAirVelocity;
	
	// We always want the movement to be framerate independent.  Multiplying by Time.deltaTime does this.
	currentMovementOffset *= Time.deltaTime;
	
   	// Move our character!
	movement.collisionFlags = controller.Move (currentMovementOffset);
	
	// Calculate the velocity based on the current and previous position.  
	// This means our velocity will only be the amount the character actually moved as a result of collisions.
	movement.velocity = (transform.position - lastPosition) / Time.deltaTime;
	
	// Moving platforms support
	if (activePlatform != null) {
		activeGlobalPlatformPoint = transform.position;
		activeLocalPlatformPoint = activePlatform.InverseTransformPoint (transform.position);
	}
	
	// Set rotation to the move direction	
	//if (movement.direction.sqrMagnitude > 0.01)
//		transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation (movement.direction), Time.deltaTime * movement.rotationSmoothing);
	
	// We are in jump mode but just became grounded
	if (controller.isGrounded) {
		movement.inAirVelocity = Vector3.zero;
		if (jump.jumping) {
			jump.jumping = false;
			SendMessage ("DidLand", SendMessageOptions.DontRequireReceiver);

			var jumpMoveDirection = movement.direction * movement.speed + movement.inAirVelocity;
			if (jumpMoveDirection.sqrMagnitude > 0.01)
				movement.direction = jumpMoveDirection.normalized;
		}
	}
	else{
		jumpTextureApply();
	}

	// Update special effects like rocket pack particle effects
	UpdateEffects ();
}

function OnControllerColliderHit (hit : ControllerColliderHit){
	if (hit.moveDirection.y > 0.01) 
		return;
	
	// Make sure we are really standing on a straight platform
	// Not on the underside of one and not falling down from it either!
	if (hit.moveDirection.y < -0.9 && hit.normal.y > 0.9) {
		activePlatform = hit.collider.transform;	
	}
}

// Various helper functions below:
function GetSpeed () {
	return movement.speed;
}

function GetVelocity () {
	return movement.velocity;
}


function IsMoving () {
	return movement.isMoving;
}

function IsJumping () {
	return jump.jumping;
}

function IsTouchingCeiling () {
	return (movement.collisionFlags & CollisionFlags.CollidedAbove) != 0;
}

function GetDirection () {
	return movement.direction;
}
// Stances 

function GetHangTime() {
	return movement.hangTime;
}

function Reset () {
	gameObject.tag = "Player";
}

function SetControllable (controllable : boolean) {
	canControl = controllable;
}
 function jumpTextureApply(){
 		if(lookingRight == true)// means facing right
			switchmainTexture(jumpTexture);
		else// means facing left
			switchmainTexture(jumpTextureL);
 }
 function runTextureApply(){
	if(movement.direction.x == 1){// means facing left
		switchmainTexture(runTextureL);
		 lookingRight = false;
	}
	if(movement.direction.x == -1){// means facing right
		switchmainTexture(runTexture);
		 lookingRight = true;
	}
 }
 function idleTextureApply(){
 		if(lookingRight == true)// means facing right
			switchmainTexture(idleTexture);
		else// means facing left
			switchmainTexture(idleTextureL);
 }
 function deathTextureApply(){
 }
 // pass a texture and this method will renderer it to the player
 function switchmainTexture(newTexture : Texture2D){
	var newObj = gameObject.Find("Physical Component");
	newObj.renderer.material.mainTexture = newTexture;
}
// which way is the playing looking?
//~ function CharcterTextureDirectionSelect(input : int){
	//~ if((input>0 && movement.direction.x == -1) || (input<0 && movement.direction.x == 1) ){// conditions for flip
		//~ if(lookingRight == true){
			//~ switchmainTexture(runTextureL);
			//~ lookingRight = false;
		//~ }
		//~ else{
			//~ switchmainTexture(runTexture);
			//~ lookingRight = true;
		//~ }
	//~ }
//~ }


function OnTriggerEnter(other : Collider) {
	var superTrigger;
	superTrigger = other.gameObject.GetComponent(TriggerBomb);
	if(superTrigger)
		superTrigger.respond();
	
	superTrigger = other.gameObject.GetComponent(LoadNewLevel);
	if(superTrigger)
		superTrigger.respond();

}
// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterController)
@script AddComponentMenu ("2D Platformer/Platformer Controller")
