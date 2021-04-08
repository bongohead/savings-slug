<?php
session_start();
if (!isset($_SESSION['id'])) {
	$errMsg = 'Session error';
	exit();
}

$idsBudgets = (array) $fromAjax['ids_budgets'] ?? [];

// Stupid PDO converts 0 to empty, must convert to string first
$varsToBind =
	// Create array with keys id_0, monthly_budget_0, id_1, monthly_budget_1 
	array_merge(...array_map(
		function($i) use (&$idsBudgets) {
			$res = array();
			$res['id_'.$i] = (int) $idsBudgets[$i]['id'];
			$res['monthly_budget_'.$i] = (string) $idsBudgets[$i]['monthly_budget'] ?? '0';
			return $res;
		},
		range(0, count($idsBudgets) - 1)
		));
		
$varsToBind['users_id'] = (int) $_SESSION['id'] ?? 9999999999;

// Create SQL update query with (id_0, monthly_budget_0), (id_1, monthly_budget_1), ...
$idsBudgetsString = 
    substr(implode(
        array_map(
            function($y) { return '('.$y.'), '; },
            array_map(function($i) { return ':id_'.$i.', :monthly_budget_'.$i; }, range(0, count($idsBudgets) - 1))
            ),
        ), 0, -2);

$sql -> getQueryResult("
	UPDATE accounts AS a SET
		monthly_budget = CAST(a2.monthly_budget AS NUMERIC)
	FROM (VALUES
		$idsBudgetsString
	) AS a2(id, monthly_budget)
	WHERE (
		CAST(a2.id AS INT) = a.id
		AND
		a.users_id = :users_id
		);
", $varsToBind);

$updatedAccounts = $sql -> successRowsChanged;