<?php 
	
	global $admin_list, $super_admin_list;
	
	$admin_list = array(
	);
	
	$super_admin_list = array(
		'nullsage@gmail.com',
		'hallsofhype@gmail.com'
	);
	
	/**
		pdo and db hookups
	*/
	$db = new PDO("mysql:host=localhost;dbname=hallsofh_db", "hallsofh_admin", "0zz3o7#4y{rx");
	require $_SERVER['DOCUMENT_ROOT'].'/routes/NotORM.php';
	
	/**
		slim stuff
	*/
	require $_SERVER['DOCUMENT_ROOT'].'/routes/Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	
	/**
		Error Messages.
	*/
	$ERROR_MSG = array(
		"Not Admin" => "You were denied this action because you do not have enough permission."
	);
	
	/**
		Slim
	*/
	$app = new \Slim\Slim();
	
	/**
		NotORM
	*/
	$hdb = new NotORM($db);
?>