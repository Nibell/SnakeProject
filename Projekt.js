// **********************
// Projekt /av Linus Nibell
// **********************

var $g_sName;
var $g_sSpeed;

var $g_result;
var $g_ScoreCheck;
var $g_refreshIntervalId;

var $g_iDirectionX;
var $g_iDirectionY;

var $g_iPosX;
var $g_iPosY;

var $g_iFruitPosX;
var $g_iFruitPosY;

var $g_iPause = 0;
var $g_iPoints = 0;
var $g_iScore = 0;

var $g_objFruit;
var $g_objSnake;
var $g_objSnakeArray = new Array();

var $g_objHighscore = new Array(10);
for (i=0; i <10; i++)
{
	$g_objHighscore[i]=new Array(4)
}


function HideAll()
{
	for(var $i=0;$i<3;$i++)
	{
		var $objDiv = document.getElementById("Page" + $i);
		$objDiv.style.display = "none";

		var $objDiv = document.getElementById("menu" + $i);
		$objDiv.style.backgroundImage = "url(http://static3.grsites.com/archive/textures/metal/metal067.jpg)";
		$objDiv.style.backgroundColor = "#FFFFFF";
		$objDiv.style.borderBottom = "1px solid #000000";
	}
}

function ShowPage($PageNr)
{
	HideAll();

	var $objDiv = document.getElementById("Page" + $PageNr);
	$objDiv.style.display = "block";

	var $objDiv = document.getElementById("menu" + $PageNr);
	$objDiv.style.backgroundImage = "none";
	$objDiv.style.backgroundColor = "#FFFF00";
	$objDiv.style.borderBottom = "1px solid #FFFFFF";

	if($PageNr == 1)
	{
		$objDiv.style.display = "block";
		CreateGame();
	}
	else if($PageNr == 2)
	{
		$objDiv.style.display = "block";
		ShowHighscore();
	}
}

function CreateObjekts()//Skapar objekten
{
	var $objCreateGameField = document.getElementById("SnakeGameField")
	while($objCreateGameField.firstChild)
	{
		$objCreateGameField.removeChild($objCreateGameField.firstChild);
	}
	
	for(var $i=0;$i<3;$i++)
	{
		$g_objSnake = document.createElement("div");
		$g_objSnake.style.width = "20px";
		$g_objSnake.style.height = "20px";
		$g_objSnake.style.backgroundColor = "#000000";
		$g_objSnakeArray[$i] = $g_objSnake;
		$g_objSnakeArray[$i].style.position = "absolute";
		$objCreateGameField.appendChild($g_objSnakeArray[$i]);
	}
	
	$g_objFruit = document.createElement("div");
	$g_objFruit.style.width = "20px";
	$g_objFruit.style.height = "20px";
	$g_objFruit.style.position = "absolute";
	$g_objFruit.style.backgroundColor = "#FF0000";
	$objCreateGameField.appendChild($g_objFruit);
}

function CreateGame()//Skapar sidan
{
	var $objBody = document.getElementById("Page1")
	while($objBody.firstChild)
	{
		$objBody.removeChild($objBody.firstChild);
	}

	var $objDivGame = document.createElement("h1");
	$objDivGame.innerHTML = "Snake";
	$objBody.appendChild($objDivGame);

	CreateGameField(1);
	CreateObjekts();
	CreateMenu();
}

function CreateMenu()//Skapar Menyn
{
	var $objBody = document.getElementById("Page1")

	var $objDivCreateMenu = document.createElement("div");
	$objDivCreateMenu.id = "SnakeMenu";
	$objDivCreateMenu.style.top = "700px";
	$objDivCreateMenu.style.left = "350px";
	$objDivCreateMenu.style.position = "absolute";
	$objBody.appendChild($objDivCreateMenu);

	var $objPointsGame = document.createElement("h3");
	$objPointsGame.innerHTML = "Points: " + $g_iPoints;
	$objPointsGame.id = "SnakeGamePoints";
	$objDivCreateMenu.appendChild($objPointsGame);

	var $objNewGame = document.createElement("input");
    	$objNewGame.type = "button";
    	$objNewGame.value = "New Game";
	$objNewGame.id = "SnakeGameStart";
    	$objNewGame.onclick = function() {NewGame();};

   	$objDivCreateMenu.appendChild($objNewGame);
}

function CreateGameField(fieldNr)//Skapar spelplanen, fieldNr är förinställt som 0 för Basic-planen.
{
	var $objBody = document.getElementById("Page1")

	var $objCreateGameField = document.createElement("div");
	$objCreateGameField.id = "SnakeGameField";
	$objCreateGameField.style.height = "600px";
	$objCreateGameField.style.width = "600px";
	$objCreateGameField.style.backgroundColor = "#FFFFFF";
	$objCreateGameField.style.border = "2px solid black"
	$objCreateGameField.style.left = "98px";
	$objCreateGameField.style.position = "absolute";

	$objBody.appendChild($objCreateGameField);
}

function NewGame()//Skapar nytt spel.
{
	var $objCreateGameField = document.getElementById("SnakeGameField")
	
	if($g_objSnakeArray.length>3)
	{
		for (var $i = $g_objSnakeArray.length - 1; $i >= 0; $i--)
		{
			if($i >= 3)
			{
				$objCreateGameField.removeChild($g_objSnakeArray[$i]);
				$g_objSnakeArray.splice($i,1);
			}
		}
	}
	
	$g_iDirectionX = 20;
	$g_iDirectionY = 0;
	
	$g_sSpeed = 300;

	$g_iPosX = 0;
	$g_iPosY = 0;
	
	$g_iPoints = 0;
	
	$g_iFruitPosX = (Math.floor(Math.random()*30)*20);
	$g_iFruitPosY = (Math.floor(Math.random()*30)*20);

	var $objNewGame = document.getElementById("SnakeGameStart")
	$objNewGame.style.visibility = "hidden";

	var $objPointsGame = document.getElementById("SnakeGamePoints")
	$objPointsGame.innerHTML = "Points: " + $g_iPoints;
	
	for (var $i = $g_objSnakeArray.length - 1; $i >= 0; $i--)
	{
		if($i == 0)
		{
			$g_iPosX = 40;
		}
		else if($i == 1)
		{
			$g_iPosX = 20;
		}
		
		$g_objSnakeArray[$i].style.top = $g_iPosY + "px";
		$g_objSnakeArray[$i].style.left = $g_iPosX + "px";
		$g_objSnakeArray[$i].style.position = "absolute";
	}
	
	$g_objFruit.style.top = $g_iFruitPosY + "px";
	$g_objFruit.style.left = $g_iFruitPosX + "px";

	$g_refreshIntervalId = setInterval(RunGame,$g_sSpeed);
}
function RunGame()//Kör spelet
{
	var $Check = CheckCrash();

	if ($Check  == 1)
	{
		clearInterval($g_refreshIntervalId);
		
		$g_iScore = $g_iPoints;
		CheckScore($g_iScore);

		var $objNewGame = document.getElementById("SnakeGameStart")
		$objNewGame.style.visibility = "visible";
	}
	else
	{
		MoveSnake();
		CheckFruit();
	}
}

function MoveSnake()//Rör ormen, ett div-block per sekund (basic, snabbare med avancerat val). direction är piltangenterna. Om man klickar ”P” så stannar ormen, man klickar P för att starta igen.
{
	$g_iPosX = $g_iPosX + $g_iDirectionX;
	$g_iPosY = $g_iPosY + $g_iDirectionY;

	for (var $i = $g_objSnakeArray.length - 1; $i >= 0; $i--)
	{
		if($i == 0)
		{
			$g_objSnakeArray[0].style.left = $g_iPosX + "px";
			$g_objSnakeArray[0].style.top = $g_iPosY + "px";	
		}
		else
		{
			$g_objSnakeArray[$i].style.left = $g_objSnakeArray[$i-1].style.left;
			$g_objSnakeArray[$i].style.top = $g_objSnakeArray[$i-1].style.top;
		}
	}
}

function CheckCrash()//Kollar ifall man crashar
{
	for (var $i = $g_objSnakeArray.length - 1; $i >= 1; $i--)
	{
		if($g_objSnakeArray[$i].style.left == $g_objSnakeArray[0].style.left && $g_objSnakeArray[$i].style.top == $g_objSnakeArray[0].style.top)
		{
			return 1;
		}
	}
	
	if(($g_iPosX == 0 && $g_iDirectionX == -20) || ($g_iPosY == 0 && $g_iDirectionY == -20) || ($g_iPosX == 580 && $g_iDirectionX == 20) || ($g_iPosY == 580 && $g_iDirectionY == 20))
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

function CheckFruit()//Kollar ifall man tar frukten
{
	if($g_iPosX ==  $g_iFruitPosX && $g_iPosY ==  $g_iFruitPosY)
	{
		$g_iPoints++;
		
		$g_iFruitPosX = (Math.floor(Math.random()*30)*20);
		$g_iFruitPosY = (Math.floor(Math.random()*30)*20);

		$g_objFruit.style.left = $g_iFruitPosX + "px";
		$g_objFruit.style.top = $g_iFruitPosY + "px";
		
		var $objPointsGame = document.getElementById("SnakeGamePoints")
		$objPointsGame.innerHTML = "Points: " + $g_iPoints;
		
		var $objCreateGameField = document.getElementById("SnakeGameField")
		
		var $objSnakeAdd = document.createElement("div");
		$objSnakeAdd.style.width = "20px";
		$objSnakeAdd.style.height = "20px";
		$objSnakeAdd.style.backgroundColor = "#000000";
		$objSnakeAdd.style.position = "absolute";
		$objCreateGameField.appendChild($objSnakeAdd);
		
		$g_objSnakeArray.push($objSnakeAdd);
		
		if($g_iPoints<=5)
		{
			$g_sSpeed = $g_sSpeed - 20;
		}
		
		else if($g_iPoints<=10)
		{
			$g_sSpeed = $g_sSpeed - 15;
		}
		
		else if($g_iPoints<=15)
		{
			$g_sSpeed = $g_sSpeed - 10;
		}
		else if($g_iPoints<=20)
		{
			$g_sSpeed = $g_sSpeed - 5;
		}
		
		clearInterval($g_refreshIntervalId);
		$g_refreshIntervalId = setInterval(RunGame,$g_sSpeed);
	}
}

function ChangeDirection(ev)//Kollar vilket håll man vill gå åt.
{
	var $iKeyNumber = -1;

	try
	{
		$iKeyNumber = ev.keyCode;
	}
	catch(ex)
	{
		$iKeyNumber = ev.which;
	}

	if ($iKeyNumber == 37)//left arrow
	{
		if($g_iDirectionX != 20)
		{
			$g_iDirectionX = -20;
			$g_iDirectionY = 0;
		}
	}
	else if ($iKeyNumber == 38)//up arrow
	{
		if($g_iDirectionY != 20)
		{
			$g_iDirectionX = 0;
			$g_iDirectionY = -20;
		}
	}
	else if ($iKeyNumber == 39)//right arrow
	{
		if($g_iDirectionX != -20)
		{
			$g_iDirectionX = 20;
			$g_iDirectionY = 0;
		}
	}
	else if ($iKeyNumber == 40)//down arrow
	{
		if($g_iDirectionY != -20)
		{
			$g_iDirectionX = 0;
			$g_iDirectionY = 20;
		}
	}
	else if ($iKeyNumber == 80)
	{
		if($g_iPause == 0)
		{
			clearInterval($g_refreshIntervalId);
			$g_iPause = 1;
		}
		else
		{
			$g_refreshIntervalId = setInterval(RunGame,$g_sSpeed);
			$g_iPause = 0;
		}
	}
}

function WriteName()//Anropas när man dör, man får skriva in sitt namn.
{
	do
	{
		$g_sName=prompt("Dead Please enter your name","");
	}while(name==null || $g_sName=="")
	
	AJAXsend("Highscore.php?getPointsInsert="+$g_iScore+"&&getName="+$g_sName+"&&getChoice=1");
}


function CheckScore($g_iScore)//Jämför score med poängen i databasen för att se om man platsar i highscore listan.
{
	AJAXCheck("Highscore.php?getPoints="+$g_iScore);
}

function AJAXCheck(url)
{
	var xmlhttp;
	$g_result = null;
	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open('get', url, true);
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			$g_result = xmlhttp.responseText;
		}
	}
	$g_refreshIntervalId = setInterval("getResult()", 10);
}

function getResult()
{
	if($g_result != null)
	{
		$g_refreshIntervalId = clearInterval($g_refreshIntervalId);
		$g_ScoreCheck = $g_result;
		if($g_ScoreCheck == 1)
		{
			WriteName();
		}
		else
		{
			alert("You don't got enough points");
		}
	}
}

function AJAXsend(url)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
  	{// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	xmlhttp.open("GET",url,false);
	xmlhttp.send();
}

function AJAXload(url,divOutput)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//en lyssnare, funktionen körs varige gång readystate ändras
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			divOutput.innerHTML=xmlhttp.responseText;
		}
	}

	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function ShowHighscore()//Visar highscore listan
{
	var $objBody = document.getElementById("Page2")
	while($objBody.firstChild)
	{
		$objBody.removeChild($objBody.firstChild);
	}

	var $objDivHighScore = document.createElement("h1");
	$objDivHighScore.innerHTML = "HighScore";
	$objBody.appendChild($objDivHighScore);
	
	var $objDivHighScoreText = document.createElement("h3");
	$objDivHighScoreText.innerHTML = "Nr ----- Name ----- Points ----- Choice";
	$objBody.appendChild($objDivHighScoreText);

	var $objCreateHighScoreList = document.createElement("div");
	$objCreateHighScoreList.id = "HighScoreList";
	$objCreateHighScoreList.style.height = "600px";
	$objCreateHighScoreList.style.width = "600px";
	$objCreateHighScoreList.style.left = "98px";
	$objCreateHighScoreList.style.fontSize = "25px";
	$objCreateHighScoreList.style.position = "absolute";
	$objBody.appendChild($objCreateHighScoreList);
	
	AJAXload("Highscore.php?getHighScoreList", $objCreateHighScoreList);
}
