var getVectorTo : GameObject;


function getVector (){
	vectorToReturn = getVectorTo.transform.position - this.gameObject.transform.position;
	vectorToReturn.Normalize();
	return vectorToReturn;
}