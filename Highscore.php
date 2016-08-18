<?php 
	$con = mysql_connect("localhost","Database","PassWord");
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db("Database", $con);
	
	if(IsSet($_GET["getHighScoreList"]))
	{
		$sSql = "SELECT * FROM tblHighscoreList";
		if($objSokResultat = mysql_query($sSql))
		{
			while($objRow = mysql_fetch_array($objSokResultat))
			{
				echo $objRow["hId_Pk"] . " ------ " . $objRow["hName"] . " ------ " . $objRow["hPoints"] . " ------ " . $objRow["hChoice"] . "<br />\n";
			}
		}
		else
		{
			echo "Knepig SQL det dÃ¤r!\n";
			mysql_error();
		}
	}

	if(IsSet($_GET["getPoints"]))
	{
		$getPoints = $_GET["getPoints"];
		if($getPoints!= "")
		{
			$sSql = "SELECT * FROM tblHighscoreList WHERE hPoints <= '" . mysql_real_escape_string($getPoints) . "'";
			if($objSokResultat = mysql_query($sSql))
			{
				if(mysql_num_rows($objSokResultat) >= 1)
				{
					echo "1";
				}
				else
				{
					echo "0";
				}
			}
			else
			{
				echo "Knepig SQL det dÃ¤r!\n";
				mysql_error();
			}
		}
	}
	
	if(IsSet($_GET["getPointsInsert"]) && IsSet($_GET["getName"]) && IsSet($_GET["getChoice"]))
	{
		$getPointsInsert = $_GET["getPointsInsert"];
		$getName = $_GET["getName"];
		$getChoice = $_GET["getChoice"];
		
		$NameArray = array($getName);
		$PointsArray = array($getPointsInsert);
		$ChoiceArray = array($getChoice);
		
		if($getPointsInsert!= "" && $getName!= "" && $getChoice!= "")
		{
			$sSql = "SELECT * FROM tblHighscoreList";
			if($objSokResultat = mysql_query($sSql))
			{
				while($objRow = mysql_fetch_array($objSokResultat))
				{
					array_push($NameArray,$objRow["hName"]);
					array_push($PointsArray,$objRow["hPoints"]);
					array_push($ChoiceArray,$objRow["hChoice"]);
				}
			}
			else
			{
				echo "Knepig SQL det dÃ¤r!\n";
				mysql_error();
			}
		
			for($i=0;$i<11;$i++)
			{
				for($j=0;$j<11;$j++)
				{
					if($PointsArray[$i] > $PointsArray[$j])
					{
						$temp = $PointsArray[$i];
						$PointsArray[$i] = $PointsArray[$j];
						$PointsArray[$j] = $temp;
					
						$temp = $NameArray[$i];
						$NameArray[$i] = $NameArray[$j];
						$NameArray[$j] = $temp;
					
						$temp = $ChoiceArray[$i];
						$ChoiceArray[$i] = $ChoiceArray[$j];
						$ChoiceArray[$j] = $temp;
					}
				}
			}
			
			for($i=0;$i<10;$i++)
			{
				$query = "UPDATE tblHighscoreList SET hName='" . $NameArray[$i] . "', hPoints='" . $PointsArray[$i] . "', hChoice='" . $ChoiceArray[$i] . "' WHERE hId_Pk= " . ($i+1);

				// Utför mysql satsen
				mysql_query($query);

				// Kollar ifall mysql satsen har några fel isåfall skriver ut dem
				echo mysql_error();
			}
		}
	}
?>
