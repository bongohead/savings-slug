<?php
session_start();
if (!isset($_SESSION['id'])) {
	$errMsg = 'Session error';
	exit();
}

$varsToBind =
	array(
		'id' => (int) $_SESSION['id'] ?? 9999999999
	);

$transactions = $sql->select("
	--	SELECT id, date, description, value * random()*(10-.1)+.1 AS value, debit, credit
	SELECT id, date, description, value, debit, credit
	FROM transactions
	WHERE users_id = :id
	ORDER by date ASC
", $varsToBind);
