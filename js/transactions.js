document.addEventListener("DOMContentLoaded", function(event) {

	/********** Initialize **********/
	$('div.overlay').show();
	const initialize = init(_addDefaultState = function(newData) {
		const accountId = parseInt(getUrlVars()['account']);
		const account = newData.accounts.filter(x => x.id === accountId)[0];
		if (typeof(account) === 'undefined') window.location.replace('/login');
		
		const child_accounts = newData.accounts.filter(x => x.id_path.includes(accountId) && x.id !== accountId).map(x => x.id);
		
		const transactions =
			newData.transactions.filter(x => x.cr === accountId || x.db === accountId).map(x => ({...x, from_child: false}))
			.concat(newData.transactions.filter(x => child_accounts.includes(x.cr) || child_accounts.includes(x.db)).map(x => ({...x, from_child: true})));

		const dailyBals = newData.dailyBals.filter(x => x.id === accountId);
		// @loadInstance gives an indicator of page load: 0 = initial load, 1 = later load
		return {page: {
			accountId: accountId,
			account: account,
			transactions: transactions,
			dailyBals: dailyBals,
			loadInstance: 0
		}};		
	}, true).then((userData) => updateUi(userData));

	
	
	/********** Attach Table Event Listener to Submit New Transaction **********/
	$('#transactions-table').on('change keyup click', 'input, #add-transaction-submit', function() {
		const inputs = [
			{key: 'date', htmlId: 'add-transaction-date', type: 'input', validate: (x => typeof(x) === 'string' && x.length === 10 && !isNaN(new Date(x))), parse: x => x},
			{key: 'description', htmlId: 'add-transaction-description', type: 'input', validate: (x => typeof(x) === 'string' && x.length >= 1), parse: x => x},
			{key: 'value', htmlId: 'add-transaction-value', type: 'select', validate: (x => typeof(x) === 'number' && !isNaN(x)), parse: x => parseFloat(x)},
			{key: 'other_account', htmlId: 'add-transaction-other-account', type: 'input', validate: (x => typeof(x) === 'number' && !isNaN(x)), parse: x => parseInt(x)}
			];
		const validatedInputs = inputs.map(function(x) {
			x.jqueryObj = $('#' + x.htmlId);
			x.val = x.parse(x.jqueryObj.val());
			x.valid = x.validate(x.val);
			return x;
		});
		validatedInputs.forEach(x => x.jqueryObj.removeClass('is-valid is-invalid').addClass(x.valid ? 'is-valid' : 'is-invalid'));
		
		
		// Add debit, credit selection if valid 
		if (validatedInputs.filter(x => x.key === 'value')[0].valid !== true || validatedInputs.filter(x => x.key === 'other_account')[0].valid !== true) return;
		const date = validatedInputs.filter(x => x.key === 'date')[0].val;
		const description = validatedInputs.filter(x => x.key === 'description')[0].val;
		const value = validatedInputs.filter(x => x.key === 'value')[0].val;
		const other_account = validatedInputs.filter(x => x.key === 'other_account')[0].val;

		const accounts = getData('accounts');
		const accountId = getData('page').accountId;
		const account = accounts.filter(x => x.id === accountId)[0];
		
		const debitThis = ((value >= 0 && account.debit_effect === 1) || (value < 0 && account.debit_effect === -1))
		const debit = debitThis ? accountId : other_account;
		const credit = debitThis? other_account : accountId;
		const valuePositive = Math.abs(value);
		
		$('#add-transaction-debit').attr('value', debit);
		$('#add-transaction-credit').attr('value', credit);
		

		// Get data
		if ($(this).prop('id') !== 'add-transaction-submit') return;
		
		
		getAJAX('addTransaction', toScript = ['addedTransactions'], fromAjax = {date: date, description: description, value: valuePositive, debit: debit, credit: credit}).done(function(ajaxRes) {
			if (JSON.parse(ajaxRes).addedTransactions === 1) {
				$('div.overlay').show();
				init(_addDefaultState = function(newData) {
					console.log('Added transaction', ajaxRes);
					const accountId = parseInt(getUrlVars()['account']);
					const account = newData.accounts.filter(x => x.id === accountId)[0];
					if (typeof(account) === 'undefined') window.location.replace('/login');
					const child_accounts = newData.accounts.filter(x => x.id_path.includes(accountId) && x.id !== accountId).map(x => x.id);
					const transactions =
						newData.transactions.filter(x => x.cr === accountId || x.db === accountId).map(x => ({...x, from_child: false}))
						.concat(newData.transactions.filter(x => child_accounts.includes(x.cr) || child_accounts.includes(x.db)).map(x => ({...x, from_child: true})));
					const dailyBals = newData.dailyBals.filter(x => x.id === accountId);
					return {page: {accountId: accountId, account: account, transactions: transactions, dailyBals: dailyBals, loadInstance: 1}};
				}, true).then((userData) => updateUi(userData));
			}
		});

		
	});

	/********** Attach Table Event Listener to Autocomplete Descriptions **********/
	$('#transactions-table').on('keyup', '#add-transaction-description', function() {
		const dt = $('#transactions-table').DataTable();
		const descriptionInput = $(this).val();
		
		// Delete if already exists
		$('#autocomplete-description').remove();

		if (descriptionInput.length < 2) return;
		
		// Get account transactions, sorted by reverse date
		const accountTransactionsDescriptions = getData('page').transactions.sort((a, b) => new Date(b.dt) > new Date(a.dt)).map(x => x.desc);
		
		// Finding matching transactions
		// const matchingAccountTransactionsDescriptions = accountTransactionsDescriptions.filter(x => x.substr(0, descriptionInput.length).toUpperCase() === descriptionInput.toUpperCase());
		const matchingAccountTransactionsDescriptions = accountTransactionsDescriptions.filter(x => x.toUpperCase().match(descriptionInput.toUpperCase()) !== null).slice(0, 9);
		console.log(descriptionInput, matchingAccountTransactionsDescriptions);		
		
		// Create div of matching descriptions
		const html = 
			'<div id="autocomplete-description" class="list-group position-absolute" style="min-width: '+ $('#add-transaction-description').parent().width() + 'px">' +
				matchingAccountTransactionsDescriptions.map(function(x) {
					return(
						'<a href="#" class="autocomplete-description-item list-group-item list-group-item-action py-1 text-truncate" style="font-size:.8rem" href="#" data-description="' + x + '">' +
						x +
						'</a>'
						);
				}).join('') +
			'</div>';
		$(this).after(html);
	});
	
	/********** Attach Autocomplete Event Listener when Clicked **********/
	$('#transactions-table').on('click', '#autocomplete-description > .autocomplete-description-item', function() {
		//console.log($(this).data('description'));
		$('#add-transaction-description').val($(this).data('description'));
		$('#autocomplete-description').remove();
	});

	/********** Attach Body Listener to Kill Autocomplete if Clicked Out **********/
	$('body').on('click', function(e) { 
		target = $(e.target);
		if (target.hasClass('autocomplete-description-item') !== true) {
			$('#autocomplete-description').remove();
		}
		//console.log(target, target.hasClass('autocomplete-description-item'));
	});
	
	/********** Attach Table Event Listener to Open Edit Transaction Modal **********/
	$('#transactions-table').on('click', '.edit-transaction', function() {
		const modal = $('#edit-transaction-modal');
		const dt = $('#transactions-table').DataTable();
		const thisRowData = dt.row($(this).closest('tr')).data();
		const accounts = getData('accounts');
		const thisAccount = getData('page').account;
		const otherAccount = accounts.filter(x => x.id === thisRowData.other_account)[0];
		
		console.log(thisRowData, thisAccount, otherAccount);
		
		$('#edit-transaction-id').val(thisRowData.id);
		$('#edit-transaction-date').val(thisRowData.date);
		$('#edit-transaction-description').val(thisRowData.description);
		$('#edit-transaction-value').val(Number(thisRowData.value_effect * thisRowData.value).toFixed(2));
		$('#edit-transaction-other-account').html(
			accounts.map(account =>
				'<option value="'+account.id+'"' + (account.descendants.length !==0 || account.id === thisAccount.id ? ' disabled': '') + (account.id === thisRowData.other_account ? ' selected' : '') + '>' +
					'&nbsp;'.repeat(account.name_path.length) + account.name +
				'</option>'
				).join('\n')
			);
			
		$('#edit-transaction-debit-statement').html(
			'This transaction results in a debit of <strong>' + Number(thisRowData.value).toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + '</strong>' +
			' to <code class="highlighter-rouge">' + (thisRowData.debited_account_id === thisAccount.id ? thisAccount.name : otherAccount.name) + '</code>' +
			' and a credit of <strong>' + Number(thisRowData.value).toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + '</strong> to ' +
			'<code class="highlighter-rouge">' + (thisRowData.credited_account_id === thisAccount.id ? thisAccount.name : otherAccount.name) + '</span>.'
		);
		
		modal.find('input, select').removeClass('is-invalid is-valid');
		modal.modal('show');
	});
		

	
	/********** Attach Modal Event Listener to Validate & Display Debit/Credit Message **********/
	$('#edit-transaction-modal').on('click change keydown', 'input, select, #edit-transaction-submit', function() {
		const modal = $('#edit-transaction-modal');		
		modal.find('input, select').removeClass('is-invalid is-valid');
		const id = parseInt($('#edit-transaction-id').val());
		const date = $('#edit-transaction-date').val();
		const value = parseFloat($('#edit-transaction-value').val());
		const description = $('#edit-transaction-description').val();
		const other_account = parseInt($('#edit-transaction-other-account').val());
		
		//console.log(date, value, description, other_account);
		let isValid = true;
		if (!isNaN(new Date(date))) {
			$('#edit-transaction-date').addClass('is-valid');
		} else {
			$('#edit-transaction-date').addClass('is-invalid');
			isValid = false;
		}
		
		if (typeof(value) === 'number' && !isNaN(value)) {
			$('#edit-transaction-value').addClass('is-valid');
		} else {
			$('#edit-transaction-value').addClass('is-invalid');
			isValid = false;
		}
		
		if (typeof(description) === 'string' && description.length >= 1) {
			$('#edit-transaction-description').addClass('is-valid');
		} else {
			$('#edit-transaction-description').addClass('is-invalid');
			isValid = false;
		}
		
		if (typeof(other_account) === 'number' && !isNaN(other_account)) {
			$('#edit-transaction-other-account').addClass('is-valid');
		} else {
			$('#edit-transaction-other-account').addClass('is-invalid');
			isValid = false;
		}
		
		
		// Show edit text
		if (!isValid) {
			$('#edit-transaction-debit-statement').html();
			return;
		}
		
		const accounts = getData('accounts');
		const thisAccount = getData('page').account;
		const otherAccount = accounts.filter(x => x.id === other_account)[0];
		
		const debitThisAccount = ((value >= 0 && thisAccount.debit_effect === 1) || (value < 0 && thisAccount.debit_effect === -1));
		const debitAccount = debitThisAccount ? thisAccount : otherAccount;
		const creditAccount = debitThisAccount? otherAccount : thisAccount;
		const valuePositive = Math.abs(value);

		$('#edit-transaction-debit-statement').html(
			'This transaction results in a debit of <strong>' + Number(valuePositive).toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + '</strong>' +
			' to <code class="highlighter-rouge">' + debitAccount.name + '</code>' +
			' and a credit of <strong>' + Number(valuePositive).toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + '</strong> to ' +
			'<code class="highlighter-rouge">' + creditAccount.name + '</span>.'
		);
		
		
		// Submit form
		if ($(this).attr('id') !== 'edit-transaction-submit') return;
		
		getAJAX('editTransaction', toScript = ['updatedTransactions'], fromAjax = {id: id, date: date, description: description, value: valuePositive, debit: debitAccount.id, credit: creditAccount.id}).done(function(ajaxRes) {
			/*console.log( {id: id, date: date, description: description, value: valuePositive, debit: debitAccount.id, credit: creditAccount.id}, ajaxRes);*/
			if (JSON.parse(ajaxRes).updatedTransactions === 1) {
				$('div.overlay').show();
				$('#edit-transaction-modal').modal('hide');
				init(_addDefaultState = function(newData) {
					console.log('Edited Transaction!');
					const accountId = parseInt(getUrlVars()['account']);
					const account = newData.accounts.filter(x => x.id === accountId)[0];
					if (typeof(account) === 'undefined') window.location.replace('/login');
					const child_accounts = newData.accounts.filter(x => x.id_path.includes(accountId) && x.id !== accountId).map(x => x.id);
					const transactions =
						newData.transactions.filter(x => x.cr === accountId || x.db === accountId).map(x => ({...x, from_child: false}))
						.concat(newData.transactions.filter(x => child_accounts.includes(x.cr) || child_accounts.includes(x.db)).map(x => ({...x, from_child: true})));
					const dailyBals = newData.dailyBals.filter(x => x.id === accountId);
					return {page: {accountId: accountId, account: account, transactions: transactions, dailyBals: dailyBals, loadInstance: 1}};
				}, true).then((userData) => updateUi(userData));
			}
		});
	});
	
	
	/********** Attach Modal Event Listener to Delete Account **********/
	$('#edit-transaction-modal').on('click', '#edit-transaction-delete', function() {
		const verifyDeletion = confirm('Are you sure you wish to delete this transaction?');
		if (verifyDeletion === false) return;
		
		// Submit form
		const modal = $('#edit-transaction-modal');		
		const id = parseInt($('#edit-transaction-id').val());
		
		getAJAX('deleteTransaction', toScript = ['deletedTransactions'], fromAjax = {id: id}).done(function(ajaxRes) {
			if (isJson(ajaxRes) && JSON.parse(ajaxRes).deletedTransactions === 1) {
				$('#edit-transaction-modal').modal('hide');
				$('div.overlay').show();
				init(_addDefaultState = function(newData) {
					console.log('Deleted Transaction!');
					const accountId = parseInt(getUrlVars()['account']);
					const account = newData.accounts.filter(x => x.id === accountId)[0];
					if (typeof(account) === 'undefined') window.location.replace('/login');
					const child_accounts = newData.accounts.filter(x => x.id_path.includes(accountId) && x.id !== accountId).map(x => x.id);
					const transactions =
						newData.transactions.filter(x => x.cr === accountId || x.db === accountId).map(x => ({...x, from_child: false}))
						.concat(newData.transactions.filter(x => child_accounts.includes(x.cr) || child_accounts.includes(x.db)).map(x => ({...x, from_child: true})));
					const dailyBals = newData.dailyBals.filter(x => x.id === accountId);
					return {page: {accountId: accountId, account: account, transactions: transactions, dailyBals: dailyBals, loadInstance: 1}};
				}, true).then((userData) => updateUi(userData));
			}
		});

	});
	

	/********** Attach Table Event Listener to Clone Transaction **********/
	$('#transactions-table').on('click', '.clone-transaction', function() {
		const dt = $('#transactions-table').DataTable();
		const thisRowData = dt.row($(this).closest('tr')).data();
		
		$('#add-transaction-description').val(thisRowData.description);
		$('#add-transaction-value').val(thisRowData.value);
		$('#add-transaction-other-account').val(thisRowData.other_account);
		
		// Trigger on change calback (requires event binding to have also been done with jQuery)
		$('#add-transaction-description').change();
		console.log(thisRowData);
	});
		


});

function updateUi(userData) {
	console.log('userData', userData);
	$('#account-name').text(userData.page.account.name);
	$('#account-balance').text(Number(userData.page.dailyBals[userData.page.dailyBals.length - 1].bal).toLocaleString('en-US', {style: 'currency',currency: 'USD'}));

	drawTable($('#transactions-table'), userData.accounts, userData.page.account, userData.page.transactions, userData.page.loadInstance);
	drawChart('transactions-chart-div', userData.page.account, userData.page.dailyBals, userData.page.loadInstance);
	$('div.overlay').hide();
}


function drawTable(tbl, accounts, thisAccount, accountTransactions, loadInstance) {

	//console.log('account-find', transactions, thisAccount, accountTransactions);
	const dtData =
		accountTransactions.map(function(x) {
			return {
				id: x.id,
				from_child: x.from_child,
				input_row: false,
				date: x.dt,
				description: x.desc,
				value_effect: ((x.db === thisAccount.id & thisAccount.debit_effect === 1 ) || (x.cr === thisAccount.id & thisAccount.debit_effect === -1)) ? 1 : -1,
				value: x.val,
				account: accounts.filter(y => y.id === (x.db === thisAccount.id ? x.db : x.cr))[0].id,
				account_name: accounts.filter(y => y.id === (x.db === thisAccount.id ? x.db : x.cr))[0].name,
				other_account: accounts.filter(y => y.id === (x.db === thisAccount.id ? x.cr : x.db))[0].id,
				other_account_name: accounts.filter(y => y.id === (x.db === thisAccount.id ? x.cr : x.db))[0].name,
				debited_account: x.db,
				credited_account: x.cr
			}
		}).concat({
			input_row: true,
			date: '<input id="add-transaction-date" type="text" class="form-control form-control-sm" style="text-align:center" value="'+moment().format('Y-MM-DD')+'"><span style="display:none">9999-99-99</span></input>',
			description: '<span style="display:none">!!!!!</span><input id="add-transaction-description" type="text" class="form-control form-control-sm"></input>',
			value_effect: null,
			value: '<input type="text" id="add-transaction-value" class="form-control form-control-sm"></input>',
			account: -1,
			account_name: '',
			other_account: -1,
			other_account_name: '<select id="add-transaction-other-account" class="form-control form-control-sm form-select form-select-sm"><option value="none"></option>' +
				accounts.map(account =>
					(account.id !== thisAccount.id ? '<option value="'+account.id+'"' + (account.descendants.length !== 0 ? 'disabled': '') + '>' + '&nbsp;'.repeat(account.name_path.length) + account.name + '</option>' : '')
					).join('') +
			'</select>',
			debited_account: '',
			credited_account: '',
		});

		
	console.log('dtData', dtData);
		
		
	if (loadInstance === 0) {
	
		const dtCols =
			[
				{title: 'Transaction Date', data: 'date'},
				{title: 'Description', data: 'description'},
				{title: 'Funds In/Out', data: 'value'},
				{title: 'Account', data: 'account_name'},
				{title: 'Other Account', data: 'other_account_name'},
				{title: 'Debit ID', data: 'debited_account'},
				{title: 'Credit ID', data: 'credited_account'},
				{title: 'Action', data: null}
			].map(function(x, i) {
				return {...x, ...{
					visible: (!['debited_account', 'credited_account', 'other_account_id'].includes(x.data)),
					orderable: true,
					ordering: (x.title === 'Transaction Date' ? true : false),
					searchable: (x.title === 'Description'),
					type: (x.title === 'Transaction Date' ? 'html' : ['value', 'debited_account_id', 'credited_account_id'].includes(x.data) ? 'html-num' : 'html'),
					className: ['Description', 'Other Account', 'Account'].includes(x.title) === true ? 'dt-left' : 'dt-center',
					render:
						x.data === 'value' ? function(data, type, row) {
							if (row.input_row === false) return (row.value_effect === -1 ? '<span style="color:red">-' + data.toFixed(2) + '</span>' : data.toFixed(2));
							else return data;
						}
						: x.title === 'Action' ? function(data, type, row) {
							if (row.input_row === false && row.from_child === false) return '<button type="button" style="font-size:.8rem;padding:.2rem .4rem" class="btn btn-warning btn-sm edit-transaction me-1">Edit</button><button style="font-size:.8rem;padding:.2rem .4rem" type="button" class="btn btn-info btn-sm clone-transaction">Clone</button>';
							else if (row.input_row === false && row.from_child === true) return '<button type="button" style="font-size:.8rem;padding:.2rem .4rem" class=" me-1 btn btn-secondary btn-sm"  data-bs-toggle="tooltip" data-bs-placement="left" title="This transactions belongs to a child account - please use the child account page to edit.">Edit</button><button type="button" style="font-size:.8rem;padding:.2rem .4rem" class="btn btn-secondary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="This transactions belongs to a child account - please use the child account page to edit.">Clone</button>';
							else return '<button type="button" class="btn btn-success btn-sm " id="add-transaction-submit">Add</button>';
						}
						: x.title === 'Description' ? (data, type, row) => '<span>' + /* (data.includes('add-transaction') === false && data.length > 40 ? data.substr(0, 40) + '...' : data)*/ data + '</span>' 
						: x.title === 'Account' ? function(data, type, row){
							if (row.from_child === true) return '<a href="/transactions?account='+row.account+'">' + data + '</span>'
							else return data;
						}
						: x.title === 'Other Account' ? function(data, type, row){
							if (row.input_row === false) return '<a href="/transactions?account=' + row.other_account + '">' + data + '</a>';
							else return data;
						}
						: false
				}};
			});
		//console.log(dtCols);
		const dt = tbl.DataTable({
			data: dtData,
			columns: dtCols,
			iDisplayLength: 50,
			dom:
				"<'row'<'col-6 px-0 justify-content-start d-flex'f><'col-md-6 px-0 justify-content-end d-flex'B>>" +
				"<'row'<'col-12 pt-4 pb-1 px-0'tr>>" +
				"<'row'<'col-auto me-auto'i><'col-auto'p>>",
			buttons: [
				{extend: 'copyHtml5', text: 'Copy to clipboard', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn btn-sm btn-secondary'},
				{extend: 'csvHtml5', text: 'Export to CSV', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn btn-sm btn-secondary'}
			],
			language: {
				search: "",
				searchPlaceholder: "Filter by description",
				info: "_START_ - _END_ (_TOTAL_ total transactions)"
			},
			order: [[0, 'desc']],
			paging: true,
			info: true,
			//responsive: true
			//scrollX: true
			createdRow: function(row, data, index) {
				if (data.from_child === true) {
					$(row).addClass('from-child');
				}
			}
		}).draw();

	} else {
	
		const dt =
			tbl.DataTable()
			.clear();
		
		dt.rows.add(dtData); // Add new data
		dt.draw();
	}

	tbl.get(0).querySelectorAll('[data-bs-toggle="tooltip"]').forEach(x => new bootstrap.Tooltip(x))

	/********** Attach Table Event Listener to Expand Rows **********/
	return true;
}



function drawChart(chartId, thisAccount, accountDailyBals, loadInstance) {
		
	const chartData = [{
		name: thisAccount.name,
		visible: true,
		lineWidth: 4,
		type: 'area',
		data: accountDailyBals.map(x => [new Date(x.dt).getTime(), x.bal])
		}];
	//console.log('chartData', chartData);

	if (loadInstance >= 0) {
	// Reload whole chart regardless
		const chartOptions = {
			chart: {
				marginRight: 10,
				backgroundColor: 'rgba(225, 233, 240,.6)',
				plotBackgroundColor: '#FFFFFF',
				plotBorderColor: '#C0C0C0',
				//plotBorderWidth: 1,
				height: 200,
				animation: false,
				style: {
					fontFamily: "Helvetica, Arial, sans-serif"
				}
			},
			title: {
				text: 'Account Balance History'
			},
			scrollbar: {
				enabled: false
			},
			credits: {
				enabled: false
			},
			navigator: {
				enabled: false
			},
			exporting :{
				enabled: false
			},
			rangeSelector: {
				enabled: false,
			},
			legend: {
				enabled: false
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: { 
					day: "%b %e",
					week: "%b %e",
					month: "%b %Y"
				},
				gridLineWidth: 1,
			},
			yAxis: {
				title: {
					text: ''
				},
				opposite: true
			},
			plotOptions: {
				series: {
				}
			},
			tooltip: {
				formatter: function () {
						text = '';
						for (i = 0; i < this.points.length; i++) {
								text += '<span style="font-weight:bold;color:'+this.points[i].series.color+'">' + this.points[i].series.name + ': </span>' +
								this.points[i].y.toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + '<br>';
						}
						return text;
				},
				shared: true
			},
			series: chartData,
		};
		
		const chart = new Highcharts.stockChart(chartId, chartOptions);
		
	}
	
	return true;
}
