<?php // подключаем язык PHP
$_POST = json_decode( file_get_contents("php://input"), true ); // если используем JSON
echo var_dump($_POST); // массив данных которые пришли с клиента, превращает их в строку и показывает на клиенте
