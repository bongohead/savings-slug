<?php
session_start();
if (!isset($_SESSION['id'])) {
	$errMsg = 'Session error';
	exit();
}

$varsToBind =
	array(
		'users_id' => (int) $_SESSION['id'] ?? 9999999999,
		'name' => (string) $fromAjax['name'] ?? null,
		'start_date' => (string) $fromAjax['start_date'] ?? null,
		'end_date' => (string) $fromAjax['end_date'] ?? null
	);

//	SELECT setval('budgets_id_seq', (SELECT MAX(id) + 1 from users));

$sql -> getQueryResult("
	INSERT INTO budgets
		(users_id, name, start_date, end_date)
	VALUES
		(:users_id, :name, :start_date, :end_date);
", $varsToBind);

$addedAccounts = $sql -> successRowsChanged;