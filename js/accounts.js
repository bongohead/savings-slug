document.addEventListener("DOMContentLoaded", function(event) {

	/********** Initialize **********/
	$('div.overlay').show();
	const initialize = init(_addDefaultState = function(newData) {
		// @loadInstance gives an indicator of page load: 0 = initial load, 1 = later load
		return {page: {
			useDate: newData.dates[newData.dates.length - 1],
			loadInstance: 0
			}};
	}, true).then((userData) => updateUi(userData));
	
	
	
	/********** Attach Table Event Listener to Expand/Collapse Rows **********/
	$('#accounts-table').on('click', 'a.expandable', function(event) {
		const dt = $('#accounts-table').DataTable();
		const thisRow = dt.row($(this).closest('tr'));
		const thisRowData = thisRow.data();
		let newRowData = thisRowData;
		newRowData['childrenState'] = thisRowData['childrenState'] === 1 ? 0 : 1;
		thisRow.data(newRowData);
		dt.draw();
	});
	
	/********** Attach Table Event Listener to Show/Hide All Accounts **********/
	$('main').on('click', 'input[name="show-all-accounts"]:checked', function(event) {
		const dt = $('#accounts-table').DataTable();
		const showAllAccounts = parseInt($('input[name="show-all-accounts"]:checked').val());
		dt.rows().every(function (rowIdx, tableLoop, rowLoop) {
			let rowData = this.data();
			rowData.showAllAccounts = showAllAccounts;
			this.data(rowData);
		});
		dt.draw();
		// console.log(showAllAccounts);
	});

	
	
	/********** Attach Table Event Listener to Create Editing Modal **********/
	$('#accounts-table').on('click', 'button.edit-account', function(event) {
		const dt = $('#accounts-table').DataTable();
		const thisRowData = dt.row($(this).closest('tr')).data();
		const modal = $('#edit-account-modal');
		$('#edit-account-id').val(thisRowData.id);
		$('#edit-account-name').val(thisRowData.name);
		
		$('#edit-account-parent-id').html(
			dt.rows().data().toArray()
				.map(account =>
					'<option value="'+account.id+'" ' + (account.id === thisRowData.id_path[thisRowData.id_path.length - 2] ? 'selected' : '') + ' ' + (account.id === thisRowData.id ? 'disabled' : '') + '>' + '&nbsp;'.repeat(account.id_path.length) + account.name + '</option>'
				)
				.join('\n')
			);

		$('#edit-account-rel-order').html(
			dt.rows().data().toArray()
			.filter(x => thisRowData.siblings.includes(x.id) || thisRowData.id === x.id) // Get siblings
			.map((x, i) => '<option value="'+(i + 1)+'" ' + (thisRowData.rel_order === i + 1 ? 'selected' : '') + '>' + (i + 1) + '</option>')
			.join('\n')
			);
			
		$('input[name="edit-account-debit-effect"]')
			.each(function() {
				// console.log($(this));
				if (parseInt($(this).val()) === thisRowData.debit_effect) {
					$(this).prop('checked', true);
				} else {
					$(this).prop('checked', false);
				}
			});
		
		// Set default onload toggle for editing modal
		$('#edit-account-is-open').prop('checked', thisRowData.is_open === true);
		//$('#edit-account-is-open').bootstrapToggle(thisRowData.is_open === true ? 'on' : 'off');

		modal.modal('show');
	});
	
	/********** Attach Modal Event Listener to Editing Parents Affect on ID **********/
	$('#edit-account-parent-id').on('change', function(event) {
		const accounts = getData('accounts');
		const thisAccount = accounts.filter(x => x.id === parseInt($('#edit-account-id').val()))[0];
		const newParentAccount = accounts.filter(x => x.id === parseInt($('#edit-account-parent-id').val()))[0];
		//console.log($('#edit-account-id').val(), thisAccount, newParentAccount);
		
		$('#edit-account-rel-order').html(
			seq(1, newParentAccount.children.length + 1).map(i => '<option value ="' + i + '">' + i + '</option>')
			);
	});
		
	/********** Attach Modal Event Listener to Submit Editing Modal **********/
	$('#edit-account-submit').on('click', function(event) {
		console.log('submitted');
		const id = parseInt($('#edit-account-id').val());
		const name = $('#edit-account-name').val();
		const rel_order = parseInt($('#edit-account-rel-order > option:selected').val());
		const parent_id = parseInt($('#edit-account-parent-id > option:selected').val());
		const debit_effect = parseInt($('input[name=edit-account-debit-effect]:checked').val());
		const is_open = $('#edit-account-is-open').prop('checked') ? 1 : 0;
		console.log('inputs', id, name, rel_order, parent_id, debit_effect, is_open);
				
		getFetch('editAccount', toScript = ['updatedAccounts'], fromAjax = {id: id, name: name, rel_order: rel_order, parent_id: parent_id, debit_effect: debit_effect, is_open: is_open}).then(function(ajaxRes) {
			//console.log(ajaxRes);
			if (ajaxRes.updatedAccounts === 1) {
				$('#edit-account-modal').modal('hide');
				$('div.overlay').show();
				init(_addDefaultState = function(newData) {
					return {page: {useDate: newData.dates[newData.dates.length - 1], loadInstance: 1}};
				}, true).then((userData) => updateUi(userData));
			} else {
				$(this).closest('form').find('.invalid-feedback').text('SQL Error').show();
			}
		});
	});
	
	
	
	/********** Attach Button Event Listener to New Account **********/
	$('#add-account-open').on('click', function(event) {
		const modal = $('#add-account-modal');		
		modal.modal('show');
		$('#add-account-parent-id').html(
			getData('accounts')
				.map(account =>
					'<option value="'+account.id+'" >' + '&nbsp;'.repeat(account.id_path.length) + account.name + '</option>'
				)
				.join('\n')
			);

		modal.modal('show');
	});
	
	/********** Attach Modal Event Listener to Editing Parents Effect on Order **********/
	$('#add-account-parent-id').on('change', function(event) {
		const accounts = getData('accounts');
		const newParentAccount = accounts.filter(x => x.id === parseInt($('#add-account-parent-id').val()))[0];			
		$('#add-account-rel-order').html(
			seq(1, newParentAccount.children.length + 1).map(i => '<option value ="' + i + '" ' + (newParentAccount.children.length + 1 === i ? 'selected' : '') + '>' + i + '</option>').join('\n')
			);
	});
	
	/********** Attach Modal Event Listener to Submit New Account **********/
	$('#add-account-submit').on('click', function(event) {
		const form = $(this).closest('form');
		form.find('.is-invalid').removeClass('is-invalid');
		form.find('.invalid-feedback').hide().text('');
		
		/*
		const name_html = $('#add-account-name');
		const parent_id_html = $('#add-account-parent-id > option:selected');
		const rel_order_html = $('#add-account-rel-order > option:selected');
		const debit_effect_html = $('#add-account-debit-effect > label.active > input');
		*/
		
		const name = $('#add-account-name').val();
		const parent_id = parseInt($('#add-account-parent-id > option:selected').val());
		const rel_order = parseInt($('#add-account-rel-order > option:selected').val());
		const debit_effect = parseInt($('input[name=add-account-debit-effect]:checked').val());
	
		if (typeof(name) !== 'string' || name.length < 1) {
			$('#add-account-name').addClass('is-invalid');
			form.find('.invalid-feedback').text('Invalid Account Name').show();
			return;
		}
				
		if (typeof(parent_id) !== 'number' || isNaN(parent_id)) {
			$('#add-account-parent-id').addClass('is-invalid');
			form.find('.invalid-feedback').text('Invalid Parent Account').show();
			return;
		}
		if (typeof(rel_order) !== 'number'|| isNaN(rel_order)) {
			$('#add-account-rel-order').addClass('is-invalid');
			form.find('.invalid-feedback').text('Invalid Order').show();
			return;
		}
		if (debit_effect !== 1 && debit_effect !== -1) {
			form.find('.invalid-feedback').text('Choose a Valid Debit Effect').show();
			return;
		}
		console.log('submitted', name, parent_id, rel_order, debit_effect);

		getFetch('addAccount', toScript = ['addedAccounts'], fromAjax = {name: name, rel_order: rel_order, parent_id: parent_id, debit_effect: debit_effect}).then(function(ajaxRes) {
			//console.log(ajaxRes);
			if (ajaxRes.addedAccounts === 1) {
				$('#add-account-modal').modal('hide');
				$('div.overlay').show();
				init(_addDefaultState = function(newData) {
					return {page: {useDate: newData.dates[newData.dates.length - 1], loadInstance: 1}};
				}, true).then((userData) => updateUi(userData));
			} else {
				form.find('.invalid-feedback').text('SQL Error').show();
			}
		});

	});
	

});


function updateUi(userData) {
	equityId = userData.accounts.filter(x => x.name === 'Equity')[0].id;
	equityBal = userData.dailyBals.filter(x => x.id === equityId)[0].bals.slice(-1)[0].bal;
	$('#net-worth').html(equityBal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
	//console.log('equityBal', equityBal);

	drawTable($('#accounts-table'), userData.accounts, userData.dailyBals, userData.dates, userData.page.useDate, userData.page.loadInstance);
	drawChart('accounts-chart-div', userData.accounts, userData.dailyBals, userData.page.loadInstance);
	drawStatistics(userData.accounts, userData.dailyBals, userData.dates, userData.page.useDate, userData.transactions);
	$('div.overlay').hide();
}


	/********** Code For Creating Rel Orders in JS **********/
	/*
	UPDATE accounts AS a SET
  rel_order = a2.rel_order
FROM (VALUES
  ('Assets', 1),
  ('Equity', 2),
  ('Liabilities', 3)
) as a2(name, rel_order)
WHERE a2.name = a.name;

accounts
		.filter(x => x.id_path.length >= 2)
		.map(account => {
			const info = accounts.filter(x => x.id_path.length >= 2 && x.id_path[x.id_path.length - 2] === account.id_path[account.id_path.length - 2]) // Get siblings
			.sort((a, b) => a.full_order - b.full_order).map((x, i) => ({...x, ...{relOrder: i + 1}})) // Get relative order of siblings
			.filter(x => x.id === account.id)[0]; return `('${info.name}', ${info.relOrder})`
		}).join(',\n')
*/

function drawTable(tbl, accounts, dailyBals, dates, useDate, loadInstance) {

	const last_month_end_date = dates.filter(y => new Date(y) <= (new Date(new Date(useDate).getFullYear(), new Date(useDate).getMonth(), 1) - (24*60*60*1000))).pop();

	// Get last bals before each end date, 0 otherwise
	const last_bals = dailyBals.map(a => {
		const matching_bals_arr = a.bals.filter(x => x.dt <= useDate);
		const bal = matching_bals_arr.length === 0 ? 0 : matching_bals_arr.sort((a, b) => a.dt > b.date ? 1 : -1).slice(-1)[0].bal;
		return {id: a.id, bal: bal}
	});

	const last_month_end_bals = dailyBals.map(a => {
		const matching_bals_arr = a.bals.filter(x => x.dt <= last_month_end_date);
		const bal = matching_bals_arr.length === 0 ? 0 : matching_bals_arr.sort((a, b) => a.dt > b.date ? 1 : -1).slice(-1)[0].bal;
		return {id: a.id, bal: bal}
	});
	
	const dtData = accounts.map(account => {
		const last_bal_for_account = last_bals.filter(x => x.id === account.id)[0].bal;
		const last_month_bal_for_account = last_month_end_bals.filter(x => x.id === account.id)[0].bal;
		return {
			...account,
			showAllAccounts: 0,
			bal: last_bal_for_account,
			childrenState: account.descendants.length > 0 ? (account.id_path.length <= 1 ? 1 : 0) : -1,
			changeThisMonth: last_bal_for_account - last_month_bal_for_account
		}
	});

	// console.log('dtData', dtData);

	if (loadInstance === 0) {
		// On load, sets the initial data -> data gets pushed to table -> table renders data including +/- -> table conducts initial filtration
		// On click, edits table data -> table renders data including +/- -> table conducts initial filtration

		const dtCols =
			[
				{title: 'Row Number', data: 'full_order'},
				{title: 'Children State', data: 'childrenState'},
				{title: 'Nest Level', data: 'nest_level'},
				{title: 'Descendants', data: 'descendants'},
				{title: 'Account', data: null},
				{title: '', data: null},
				{title: '#', data: 'id'},
				{title: 'Balance', data: 'bal'},
				{title: 'Change This Month', data: 'changeThisMonth'},
				{title: 'Fixed', data: 'is_fixed'}
			].map(function(x, i) {
				return {
					...x,
					visible: (!['Row Number', 'Descendants', 'Children State', 'Nest Level', 'Fixed', '#'].includes(x.title)),
					orderable: false,
					ordering: (x.title === 'Row Number' ? true : false),
					searchable: (x.title === 'Account'),
					type: (x.title === 'Account' ? 'html' : 'num'),
					className: (x.title === 'Account' ? 'dt-left' : 'dt-center'),
					render:
						x.title === 'Account' ? (data, type, row) => {
							/* If row itself has children & children are shown (1) - */
							/* Else if row has children & children are hidden (0) + */
							/* Else if row has no children (-1) */
							return '<span style="padding-left: ' + Math.round((row.nest_level - 1) * 15) + 'px">' +
							'<a style="font-size:0.95rem;font-weight:bold" href="transactions?account=' + row.id + '">' +
								row.name +
							'</a>' +
							(row.childrenState === -1 ? '' : ('<a class="expandable" style="cursor:pointer">' + (row.childrenState === 1 ? '<i class="ps-2 bi bi-dash-lg"></i>' : '<i class="ps-2 bi bi-plus-lg"></i>') + '</a>'));
						}
						: x.title === '' ? (data, type, row) => (row.is_fixed === true ? '' : '<button type="button" class="btn btn-secondary btn-sm edit-account" style="font-size:.75rem;padding: .05rem .4rem">Edit</button>')
						/*
						: x.title === '' ? (data, type, row) => (row.id_path.length === 1 ? '<button type="button" class="btn btn-primary btn-sm" disabled>Edit</button>' : '<button type="button" class="btn btn-primary btn-sm edit-account">Edit</button>')
						*/
						: x.title === 'Balance' ? (data, type, row) => '<span style="font-weight:500;font-size:0.95rem;">' + data.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '</span>'
						: x.title === 'Change This Month' ?  (data, type, row) => '<span class="small">' + (data < 0 ? '<span class="fas fa-arrow-down text-danger me-1"></span>' : (data === 0 ? '<span class="fas fa-arrows-alt-h me-1"></span>' : '<span class="fas fa-arrow-up text-success me-1"></span>')) + data.toFixed(2) + '</span>'
						: false
				};
			});
				
		const dt = tbl.DataTable({
			data: dtData,
			columns: dtCols,
			iDisplayLength: 1000,
			dom:
				"<'row'<'col-6 px-0 justify-content-start d-flex'f><'col-6 px-0 justify-content-end d-flex toggle-container'>>" +
				"<'row my-2'<'px-0'tr>>" +
				"<'row'<'col-2'i><'col-10 justify-content-end d-flex px-0'B>>", // Flex display needed for right alignment
			buttons: [ // https://datatables.net/reference/option/buttons.buttons
				{extend: 'copyHtml5', text: 'Copy to clipboard', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn-sm btn-secondary btn' },
				{extend: 'csvHtml5', text: 'Export to CSV', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn-sm btn-secondary btn'}
				//{extend: 'excelHtml5', text: 'Export to Excel', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn-sm'} requires jszip
			],
			order: [[0, 'asc']],
			language: {
				search: '',
				searchPlaceholder: 'Search by Account',
				info: "_START_ - _END_ (_TOTAL_ total rows)"
			},
			//ordering: true,
			paging: false,
			info: false,
			createdRow: function(row, data, index) {
				if (data.nest_level === 1) {
					$(row).css('border-top', '1px dashed gray');
				} else {
					
				}
				$(row).css('height', '2rem');
			}
		}).draw();
				
		// Filter: show things with parents that have childrenState = 1, and showAllAccounts = 1 or is_open = 1
		$.fn.dataTable.ext.search.push(function(settings, searchData, rowIndex, originalData, searchCounter) { // https://datatables.net/manual/plug-ins/search
			const ancestorStatuses =
				dt.rows()
				.data()
				.toArray()
				.filter(x => x['descendants'].includes(originalData['id']))
				.map(x => x['childrenState']);
			
			const show = (ancestorStatuses.length === 0 ? true : (ancestorStatuses.every(x => x === 1))) && (originalData.showAllAccounts === 1 || originalData.is_open === true);
			//console.log(originalData['name'], ancestorStatuses, show);
			return(show);
		});
		dt.draw();		
		
	} else if (loadInstance === 1) {
	
		const dt =
			tbl.DataTable()
			.clear()
			.rows.add(dtData) // Add new data
			.draw();

	}
	
	// Reloading data always resets showAllAccounts: 0 // Add justify content end for right alignment
	$('div.toggle-container').html(`
		<div class="input-group input-group-sm my-0 justify-content-end"> 
			<div class="btn-group btn-group-sm" role="group">
				<button class="btn btn-secondary" disabled="">Show All Accounts</button>
				<input id="show-all-accounts-1" type="radio" class="btn-check" name="show-all-accounts" value="0" autocomplete="off" checked>
				<label class="btn btn-outline-primary" for="show-all-accounts-1">No</label>
				<input id="show-all-accounts-2" type="radio" class="btn-check" name="show-all-accounts" value="1" autocomplete="off">
				<label class="btn btn-outline-primary" for="show-all-accounts-2">Yes</label>
			</div>
		</div>

		`);
		

	return true;
}




function drawChart(chartId, accounts, dailyBals, loadInstance) {
	
	
	const accountsByCategory = [
		{category: 'assets', colors: ['forestgreen', 'cadetblue'], accounts: accounts.filter(x => x.name_path[0] === 'Assets' && x.name_path.length <= 2)},
		{category: 'liabilities', colors: ['firebrick', 'lightsalmon'], accounts: accounts.filter(x => x.name_path[0] === 'Liabilities' && x.name_path.length <= 2)},
		{category: 'equity', colors: ['brown'], accounts: accounts.filter(x => x.name_path[0] === 'Equity' && x.name_path.length === 1)}
		]
	// console.log('accountsByCategory', accountsByCategory);
		
	const chartData =
		accountsByCategory.map(function(category) {
			return category.accounts.map(function(account, i) {
				const res = {
					name: account.name,
					visible: ['Equity'].includes(account.name),
					color: (category.accounts.length >= 2 ? gradient.valToColor(i, gradient.create([0,  category.accounts.length - 1], category.colors, 'htmlcolor'), 'rgba') : category.colors[0]),
					lineWidth: (category.category !== 'equity' ? 2 : 3),
					category: category.category,
					type: (category.category !== 'equity' ? 'areaspline' : 'line'),
					stacking: (category.category !== 'equity' ? 'normal' : false),
					stack: (category.category !== 'equity' ? category.category : false),
					data: dailyBals.filter(x => x.id === account.id)[0].bals.map(x => [new Date(x.dt).getTime(), x.bal * (category.category === 'liabilities' ? -1 : 1)])
				}
				return res;
			});
		}).flat();
	//console.log('chartData', chartData);

	if (loadInstance >= 0) {
		
		Highcharts.setOptions({
			lang: {
				rangeSelectorZoom: 'Display:'
			},
			credits: {
				enabled: false
			},
			scrollbar: {
				enabled: false
			},
			tooltip: {
				style: {
					/*fontWeight: 'bold',*/
					fontSize: '0.9rem'
				}
			},
			rangeSelector: {
				buttonTheme: { // styles for the buttons
					fill: 'var(--bs-secondary)',
					style: {
						color: 'white'
					},
					states: {
						hover: {
							fill: 'var(--bs-primary)'
						},
						select: {
							fill: 'var(--bs-primary)',
							style: {
								color: 'white'
							}
						}
					}
				},
				inputBoxBorderColor: 'gray',
				inputStyle: {
					color: 'black'
				},
				labelStyle: {
					color: 'black',
				},
			}

		});

	// Reload whole chart regardless
		const chartOptions = {
			chart: {
				type: 'line',
				spacingTop: 0,
				backgroundColor: 'rgba(255, 255, 255, 0)',
				plotBackgroundColor: '#FFFFFF',
				height: 320,
				plotBorderColor: 'black',
				plotBorderWidth: 2
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
				enabled: true,
				allButtonsEnabled: true,
				buttons: [{
					type: 'month',
					count: 3,
					text: '3m',
					title: 'View 3 months'
				}, {
					type: 'month',
					count: 6,
					text: '6m',
					title: 'View 6 months'
				}, {
					type: 'ytd',
					text: 'YTD',
					title: 'View year to date'
				}, {
					type: 'year',
					count: 1,
					text: '1y',
					title: 'View 1 year'
				}, {
					type: 'all',
					text: 'All',
					title: 'View all'
				}],
				selected: 3
				//buttonTheme: {display: 'none'}
			},
			legend: {
				title: {
					text: 'Accounts<br/><span style="font-size: .8remrem; color: #666; font-weight: normal">(Click to hide)</span>'
				},
				backgroundColor: '#FCFFC5',
				useHTML: true,
				enabled: true,
				align: 'right',
				verticalAlign: 'top',
				layout: 'vertical'
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
				opposite: false,
				//min: 0
			},
			plotOptions: {
				series: {
				}
			},
			tooltip: {
				formatter: function () {
						text = '';
						for (i = 0; i < this.points.length; i++) {
								text += '<span style="color:'+this.points[i].series.color+'">' + this.points[i].series.name + ': </span>' +
								this.points[i].y.toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + '<br>';
						}
						return text;
				},
				shared: true
			},
			series: chartData,
		};
		
		const chart = new Highcharts.stockChart(chartId, chartOptions);
		chart.addSeries({ 
			name: 'Target: 100k',
			color: 'red',
			type:'line',
			dashStyle: 'shortdash',
			lineWidth: 2,
			visible: false,
			data: [[chart.xAxis[0].dataMin, 100000], {x: chart.xAxis[0].dataMax, y: 100000, dataLabels: { enabled: true }}]
		});
		
		chart.addSeries({
			name: 'Target: 1m',
			color: 'orange',
			type:'line',
			dashStyle: 'shortdash',
			lineWidth: 2,
			visible: false,
			data: [[chart.xAxis[0].dataMin, 1000000], {x: chart.xAxis[0].dataMax, y: 1000000, dataLabels: { enabled: true }}]
		});
		

	}
	
	return true;
	//chart.xAxis[0].setExtremes(Date.UTC(2009, 12, 31), Date.UTC(2020, 12, 31))
}


function drawStatistics(accounts, dailyBals, dates, useDate, transactions)  {

	const tr30_date = dates.filter(y => new Date(y) <= moment(useDate).subtract(1, 'months').format('x')).pop();
	const ytd_date = dates.filter(y => new Date(y) <= (new Date(new Date(useDate).getFullYear(), 0, 1) - (24*60*60*1000))).pop();

	const last_bals = dailyBals.map(a => {
		const matching_bals_arr = a.bals.filter(x => x.dt <= useDate);
		const bal = matching_bals_arr.length === 0 ? 0 : matching_bals_arr.sort((a, b) => a.dt > b.date ? 1 : -1).slice(-1)[0].bal;
		return {id: a.id, bal: bal}
	});

	const tr30_bals = dailyBals.map(a => {
		const matching_bals_arr = a.bals.filter(x => x.dt <= tr30_date);
		const bal = matching_bals_arr.length === 0 ? 0 : matching_bals_arr.sort((a, b) => a.dt > b.date ? 1 : -1).slice(-1)[0].bal;
		return {id: a.id, bal: bal}
	});

	const ytd_bals = dailyBals.map(a => {
		const matching_bals_arr = a.bals.filter(x => x.dt <= ytd_date);
		const bal = matching_bals_arr.length === 0 ? 0 : matching_bals_arr.sort((a, b) => a.dt > b.date ? 1 : -1).slice(-1)[0].bal;
		return {id: a.id, bal: bal}
	});

	// Get equity change - later add whole row, YTD +/-, 30d +/-, etc.
	/*
	const equityId = accounts.filter(x => x.name === 'Equity')[0].id;
	const last_equity_val = lastBals.filter(x => x.id === equityId)[0].bal;
	
	const trail_30_date = dates.filter(y => new Date(y) <= moment(useDate).subtract(1, 'months').format('x')).pop();
	const trail_30_bals = dailyBals.filter(x => x.date === trail_30_date);
	const equity_30_change = last_equity_val - trail_30_bals.filter(x => x.id === equityId)[0].bal;
	$('#net-worth-1 > span.base').html((equity_30_change > 0 ? '+' : '') + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(equity_30_change));
	$('#net-worth-1 > span.change').addClass(equity_30_change > 0 ? 'bg-success' : 'bg-danger').html((equity_30_change > 0 ? '<i class="bi bi-caret-up"></i>' : '<i class="bi bi-caret-down"></i>') + (equity_30_change/last_equity_val * 100).toFixed(1) + '%');
	
	const ytd_date = dates.filter(y => new Date(y) <= (new Date(new Date(useDate).getFullYear(), 0, 1) - (24*60*60*1000))).pop();
	const ytd_bals = dailyBals.filter(x => x.date === ytd_date);
	const equity_ytd_change = last_equity_val - ytd_bals.filter(x => x.id === equityId)[0].bal;
	$('#net-worth-2 > span.base').html((equity_ytd_change > 0 ? '+' : '') + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(equity_ytd_change));
	$('#net-worth-2 > span.change').addClass(equity_ytd_change > 0 ? 'bg-success' : 'bg-danger').html((equity_ytd_change > 0 ? '<i class="bi bi-caret-up"></i>' : '<i class="bi bi-caret-down"></i>') + (equity_ytd_change/last_equity_val * 100).toFixed(1) + '%');

	const trail_30_count = transactions.filter(x => moment(x.date) > moment(trail_30_date)).length;
	const ytd_count = transactions.filter(x => moment(x.date) > moment(ytd_date)).length;
	$('#net-worth-3 > span.base').html(trail_30_count);
	$('#net-worth-4 > span.base').html(accounts.filter(x => x.is_open === true).length);
	*/

	// Get expenses		
	const change_stats = ['Equity', 'Income', 'Expenses', 'Liabilities', 'Assets'].map(function(x) {
		const id = accounts.filter(y => y.name === x)[0].id;
		const last_bal = last_bals.filter(y => y.id === id)[0].bal;
		const tr30_change = last_bal - tr30_bals.filter(y => y.id === id)[0].bal;
		const ytd_change = last_bal - ytd_bals.filter(y => y.id === id)[0].bal;
		return {
			account_name: x,
			tr30_change: 
				'<span class="base fw-bolder pe-1">' +
					(tr30_change > 0 ? '+' : '') + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(tr30_change) +
				'</span>' +
				(['Income', 'Expenses'].includes(x) === false ?
				'<span class="badge rounded-pill ' + (tr30_change > 0 ? 'bg-success' : 'bg-danger') + '">' +
					(tr30_change > 0 ? '<i class="bi bi-caret-up"></i>' : '<i class="bi bi-caret-down"></i>') +
					(tr30_change/(tr30_bals.filter(y => y.id === id)[0].bal) * 100).toFixed(1) + '%' +
				'</span>'
				: ''),
			ytd_change: 
				'<span class="base fw-bolder pe-1">' +
					(ytd_change > 0 ? '+' : '') + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(ytd_change) +
				'</span>' +
				(['Income', 'Expenses'].includes(x) === false ?
				'<span class="badge rounded-pill ' + (ytd_change > 0 ? 'bg-success' : 'bg-danger') + '">' +
					(ytd_change > 0 ? '<i class="bi bi-caret-up"></i>' : '<i class="bi bi-caret-down"></i>') +
					(ytd_change/(ytd_bals.filter(y => y.id === id)[0].bal) * 100).toFixed(1) + '%' +
				'</span>'
				: ''),
		};
	});
	
	$('#stats-1').append(change_stats.filter(x => x.account_name === 'Equity')[0].tr30_change);
	$('#stats-2').append(change_stats.filter(x => x.account_name === 'Equity')[0].ytd_change);
	
	const tr30_count = transactions.filter(x => moment(x.dt) > moment(tr30_date)).length;
	const ytd_count = transactions.filter(x => moment(x.dt) > moment(ytd_date)).length;
	$('#stats-3').append(tr30_count);
	$('#stats-4').append(accounts.filter(x => x.is_open === true).length);

	$('#stats-5').append(change_stats.filter(x => x.account_name === 'Income')[0].tr30_change);
	$('#stats-6').append(change_stats.filter(x => x.account_name === 'Expenses')[0].tr30_change);
	
	$('#stats-7').append(change_stats.filter(x => x.account_name === 'Assets')[0].tr30_change);
	$('#stats-8').append(change_stats.filter(x => x.account_name === 'Liabilities')[0].tr30_change);

	/*
	$('#net-worth-1 > span.base').html((equity_30_change > 0 ? '+' : '') + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(equity_30_change));
	$('#net-worth-1 > span.change').addClass(equity_30_change > 0 ? 'bg-success' : 'bg-danger').html((equity_30_change > 0 ? '<i class="bi bi-caret-up"></i>' : '<i class="bi bi-caret-down"></i>') + (equity_30_change/last_equity_val * 100).toFixed(1) + '%');
*/
	// console.log(change_stats);
	
	
	const expenseId = accounts.filter(x => x.name === 'Expenses')[0].id;
	

	
	const asset_colors = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
	
	const asset_l1_data =
		accounts.filter(x => x.name_path[0] === 'Assets' && x.name_path.length === 2).map(x => ({
			...x,
			bal: last_bals.filter(y => y.id == x.id)[0].bal
		})).map((x, i) => ({name: x.name, y: x.bal, color: asset_colors[i]}));
		
		
	const asset_l2_data =
		asset_l1_data.flatMap(function(x) {
			const child_accounts = accounts.filter(y => y.name_path[0] === 'Assets' && y.name_path[1] === x.name && y.name_path.length === 3);
			
			if (child_accounts.length !== 0) {
				return child_accounts.map((child, i) => ({
					name: child.name,
					y: last_bals.filter(z => z.id == child.id)[0].bal,
					color: gradient.valToColor(.25, gradient.create([0, 1], [x.color, getColorArray()[i]], 'hex'), 'rgba'),
					same_as_parent: false
				}));
			} else {
				return [{
					name: x.name,
					y: x.y,
					color: x.color,
					same_as_parent: true
				}];
			}
		});
	// console.log(asset_l2_data);
		

	$('#statistics-card').append('<h3 class="text-center">Asset Mix</h3><div id="statistics-01"></div>');
	
	Highcharts.chart('statistics-01', {
		chart: {
			type: 'pie',
			height: 350,
			margin: [0, 0, 0, 0],
			spacing: [0, 0, 0, 0]
		},
		title: {
			text: null
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true
				},
				startAngle: -90,
				endAngle: 90,
				center: ['50%', '75%']
			}
		},
		series: [{
			name: 'L1',
			size: '80%',
			data: asset_l1_data,
			dataLabels: {
				formatter: function () {
					return this.percentage > 0 ? this.point.name + ' ' + this.point.percentage.toFixed(0) + '%': null;
				},
				color: '#ffffff',
				distance: -30
			}

		}, {
			name: 'L2',
			size: '100%',
			innerSize: '90%',
			dataLabels: {
				formatter: function () {
					return this.percentage > 2 && this.point.same_as_parent === false ? '<b>' + this.point.name + ':</b> ' +
						this.point.percentage.toFixed(0) + '%' : null;
				}
			},
			data: asset_l2_data
		}]
	});
	
	
	const liability_colors = ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'];

	const liability_l1_data =
		accounts.filter(x => x.name_path[0] === 'Liabilities' && x.name_path.length === 2).map(x => ({
			...x,
			bal: last_bals.filter(y => y.id == x.id)[0].bal
		})).map((x, i) => ({name: x.name, y: x.bal, color: liability_colors[i]}));
		
		
	const liability_l2_data =
		liability_l1_data.flatMap(function(x) {
			const child_accounts = accounts.filter(y => y.name_path[0] === 'Liabilities' && y.name_path[1] === x.name && y.name_path.length === 3);
			
			if (child_accounts.length !== 0) {
				return child_accounts.map((child, i) => ({
					name: child.name,
					y: last_bals.filter(z => z.id == child.id)[0].bal,
					color: gradient.valToColor(.25, gradient.create([0, 1], [x.color, getColorArray()[i]], 'hex'), 'rgba'),
					same_as_parent: false
				}));
			} else {
				return [{
					name: x.name,
					y: x.y,
					color: x.color,
					same_as_parent: true
				}];
			}
		});
		

	$('#statistics-card').append('<h3 class="text-center">Liabilities Mix</h3><div id="statistics-02"></div>');
	
	Highcharts.chart('statistics-02', {
		chart: {
			type: 'pie',
			height: 350,
			margin: [0, 0, 0, 0],
			spacing: [0, 0, 0, 0]
		},
		title: {
			text: null
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true
				},
				startAngle: -90,
				endAngle: 90,
				center: ['50%', '75%']

			}
		},
		series: [{
			name: 'L1',
			size: '80%',
			data: liability_l1_data,
			dataLabels: {
				formatter: function () {
					return this.percentage > 0 ? this.point.name + ' ' + this.point.percentage.toFixed(0) + '%': null;
				},
				color: '#ffffff',
				distance: -50
			}

		}, {
			name: 'L2',
			size: '100%',
			innerSize: '90%',
			dataLabels: {
				formatter: function () {
					return this.percentage > 2 && this.point.same_as_parent === false ? '<b>' + this.point.name + ':</b> ' +
						this.point.percentage.toFixed(0) + '%' : null;
				},
				distance: 20
			},
			data: liability_l2_data
		}]
	});

}
