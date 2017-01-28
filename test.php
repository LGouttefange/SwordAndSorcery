<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php
/**
 * Created by PhpStorm.
 * User: Loïc Gouttefangeas <loic.gouttefangeas.pro@gmail.com>
 * Date: 25/01/2017
 * Time: 15:15
 */
echo file_get_contents("http://localhost/LastTram/mink-lasttram-api/web/dictionnary/city");
echo "<hr>";
echo file_get_contents("http://localhost/LastTram/mink-lasttram-api/web/dictionnary/city/OTL6192449487677451");
?>
<hr>
<form action="http://localhost/LastTram/mink-lasttram-api/web/dictionnary/city/OBO1/delete" method="post">
    <input type="submit" value="supprimer bordeaux sans le bon token">
</form>
<form action="http://localhost/LastTram/mink-lasttram-api/web/dictionnary/city/OBO1/delete?token=blep" method="post">
    <input type="submit" value="supprimer bordeaux">
</form>
<hr>
<form action="http://localhost/LastTram/mink-lasttram-api/web/dictionnary/city/create?token=blep" method="post">
    <input type="submit" value="créer">
    <input type="text" name="key" id="OBO1" value="OBO1">
    <input type="text" name="value" id="OBO1" value="Bordeaux">
</form>
<hr>
<form action="http://localhost/LastTram/mink-lasttram-api/web/dictionnary/city/OBO1/update?token=blep" method="post">
    <input type="submit" value="modifier bordeaux">
    <input type="text" name="value" id="OBO1" value="Bordeaux">
</form>
</body>
</html>

