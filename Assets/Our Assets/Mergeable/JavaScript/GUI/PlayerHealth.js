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

	var characterStats : Stats;
	var healthBarLength = 0;
	var textureForBehindText : Texture;
	
	function Start() {
		healthBarLength = Screen.width /4;
	}
		
	function OnGUI() {
		currentBarLength = healthBarLength * characterStats.health / characterStats.maxHealth;
//		GUI.Box(Rect(10, 10, currentBarLength, 20), characterStats.health + "/" + characterStats.maxHealth);
		shape = Rect(10, 10, currentBarLength, 20);
//		content = GUIContent (characterStats.health + "/" + characterStats.maxHealth, textureForBehindText);
		content = GUIContent (textureForBehindText);
		GUI.Box(shape, content);
		GUI.Box(Rect(10, 30, 60, 25), characterStats.eleType);
//		GUIContent (text : string, image : Texture) :
	}
