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
	
	function Start() {
		healthBarLength = Screen.width /4;
	}
		
	function OnGUI() {
		 GUI.Box(Rect(10,10,healthBarLength, 20), characterStats.health + "/" + characterStats.maxHealth);
	}
