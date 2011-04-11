var getVectorTo : GameObject;


function getVector (){
	vectorToReturn = getVectorTo.transform.position - this.gameObject.transform.position;
//	vectorToReturn.z = 0;
	vectorToReturn.Normalize();
	return vectorToReturn;
}