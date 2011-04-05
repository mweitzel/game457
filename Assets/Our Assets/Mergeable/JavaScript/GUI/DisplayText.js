	/// <summary>
/// DisplayText.js
/// Feb 20, 2011
/// Calvin Slusarski
/// 
/// This class is for putting text boxes on the screen,
/// 
/// </summary>
var textFieldString = "Enter text here";
var x = 25;
var y = 25;
var width = 200;
var height = 25;
/* Declare a GUI Style */
var guiStyle : GUIStyle;

function OnGUI () {
// GUI.TextField(position, text, maxLength, style)
/* position	 Rectangle on the screen to use for the text field.
 * text	 	Text to edit. The return value of this function should be assigned back to the string as shown in the example.
 * maxLength	The maximum length of the string. If left out, the user can type for ever and ever.
 * style	 	The style to use. If left out, the textField style from the current GUISkin is used.
 */
	textFieldString = GUI.TextField (Rect (x, y, width, height), textFieldString/*, guiStyle*/);
}