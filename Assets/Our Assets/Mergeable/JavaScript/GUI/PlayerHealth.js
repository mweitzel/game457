/// <summary>
/// PlayerHealth.js
/// Modified By Calvin Slusarski
/// February 19 2011
/// Display the players health in game
/// Attach this class to your player character
/// </summary>
/// PlayerHealth.cs
/// Oct 20, 2010
/// Peter Laliberte


var maxHealth = 1000;
var curHealth = 1000;
var healthBarLength = 0;

function Update () {
		AddjustCurrentHealth(0);
}

// use for initialization
function Start() {
		healthBarLength = Screen.width /4;
	}
	//Update is called once pre frame
	function update() {
		//AddjustCurrentHealth(0);
		OnGUI();
	}
	function OnGUI() {
		 GUI.Box(Rect(10,10,healthBarLength, 20), curHealth + "/" + maxHealth);
	}
	function SetCurrentHealth(adj: int) {
	  		curHealth = adj;
  		
  		if(curHealth < 0){
  			curHealth = adj;
			}
  		
  		if(curHealth > maxHealth)
  			curHealth = maxHealth;
  		
 		if(maxHealth < 1)
 			maxHealth = 1;

 		//healthBarLength = (Screen.width / 2);
 	}
	function AddjustCurrentHealth(adj: int) {
  		curHealth += adj;
  		  		
  		if(curHealth > maxHealth)
  			curHealth = maxHealth;
  		
 		if(maxHealth < 1)
 			maxHealth = 1;

 		//healthBarLength = (Screen.width / 2);
 	}

/////////////////////////////////////////////////////////////////////////
/// <summary>
/// PlayerHealth.cs
/// Oct 20, 2010
/// Peter Laliberte
/// 
/// Modified By Calvin Slusarski
/// February 19 2011
/// Display the players health in game
/// 
/// Attach this class to your player character
/// </summary>
/* using UnityEngine;
 * using System.Collections;
 * 
 * public class PlayerHealth : MonoBehaviour {
 * 	public int maxHealth = 100;
 * 	public int curHealth = 100;
 * 	// Added By Calvin: Adjust colors via inspector
 * 	//public GUIStyle newStyles = new  GUIStyle();
 * 	
 * 	public float healthBarLength;
 * 
 * 	// Use this for initialization
 * 	void Start () {
 * 		healthBarLength = Screen.width / 2;
 * 	}
 * 	
 * 	// Update is called once per frame
 * 	void Update () {
 * 		AddjustCurrentHealth(0);
 * 	}
 * 	
 * 	void OnGUI() {
 * 		GUI.Box(new Rect(10, 10, healthBarLength, 20), curHealth + "/" + maxHealth/*, newStyles*//*);
 * 	}
 * 	
 * 	public void AddjustCurrentHealth(int adj) {
 * 		curHealth += adj;
 * 		
 * 		if(curHealth < 0)
 * 			curHealth = 0;
 * 		
 * 		if(curHealth > maxHealth)
 * 			curHealth = maxHealth;
 * 		
 * 		if(maxHealth < 1)
 * 			maxHealth = 1;
 * 		
 * 		healthBarLength = (Screen.width / 2) * (curHealth / (float)maxHealth);
 * 	}
 * } */
