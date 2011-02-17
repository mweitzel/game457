public var LastDirectionOf : CharacterController;

public var vector = Vector3.right;
function Update () {
//	if(Input.GetButtonDown("Negative Button"))
//		vector = Vector3.right;
	if(Input.GetButtonDown("Horizontal"))
		vector = Vector3.left;
}