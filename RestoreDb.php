<?php
	$con = mysql_connect("localhost","DataBase","PassWord");
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("DataBase", $con);
	
	$sql = "DROP TABLE IF EXISTS tblHighscoreList";
	mysql_query($sql, $con);
	echo "dÃ¶dade tblHighscoreList<br>";
	
	// Create table
	$sql = "CREATE TABLE tblHighscoreList
	(
	hId_Pk MEDIUMINT NOT NULL AUTO_INCREMENT,
	hName varchar(20),
	hPoints INT NOT NULL,
	hChoice varchar(20),
	PRIMARY KEY (hId_Pk)
	)";
	echo "SQL: " . $sql . "<br />\n";
	echo "Skapade tblChat<br />\n";
	// Execute query
	mysql_query($sql,$con);
	
	//1
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//2
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//3
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//4
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//5
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//6
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//7
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//8
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//9
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	//10
	mysql_query("INSERT INTO tblHighscoreList(hName, hPoints, hChoice)
	VALUES ('Test', '1', '1')");
	echo "Lade till Test<br>";
	
	mysql_close($con);
?>
