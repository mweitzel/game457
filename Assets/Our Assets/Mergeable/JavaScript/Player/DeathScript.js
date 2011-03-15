
var playerStats : Stats;

function Update () {
	if(playerStats.health < 0)
		Application.LoadLevel(Application.loadedLevelName);
}