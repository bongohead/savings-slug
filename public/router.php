<?php
foreach (glob('/var/www/web-framework/php-files/*.php') as $filename) {
    require_once($filename);
}



if (isset($_POST) && isset($_POST['isAjax'])) {
	routeAjax(
		$postVars = $_POST,
		$modelsDir = __DIR__.'/../php-models',
		$db = 'budget'
	);
} else {
	routePage(
		templatesDir: __DIR__.'/templates',
		templatesCacheDir: __DIR__.'/cache',
		modelsDir: __DIR__.'/../php-models',
		toScript: [],
		jsDir: __DIR__.'/../js',
		routes : [
			//['template' => 'home', 'request' => ['', 'home'], 'title' => 'Home', 'models' => ['checkSession'], 'js' => []],
			['template' => 'login', 'request' => 'login', 'title' => 'Login', 'models' => ['destroySession'], 'js' => ['login']],
			['template' => 'accounts', 'request' => ['accounts', 'home', ''], 'title' => 'Accounts', 'models' => ['checkSession'], 'js' => ['init', 'accounts']],
			['template' => 'transactions', 'request' => ['transactions'], 'title' => 'Transactions Log', 'models' => ['checkSession'], 'js' => ['init', 'transactions']],
			['template' => 'budget', 'request' => ['budget'], 'title' => 'Budget', 'models' => ['checkSession'], 'js' => ['init', 'budget']],
			['template' => 'expenses', 'request' => ['expenses'], 'title' => 'Expense Tracker', 'models' => ['checkSession'], 'js' => ['init', 'expenses']]
		],
		errorRoute: ['template' => 'error', 'request' => 'error', 'title' => 'Error', 'js' => []],
		baseJsFiles: ['functions', 'moment.min', 'moment-timezone-with-data-1970-2030.min'],
		devMode: TRUE,
		db: 'budget'
	);
}

