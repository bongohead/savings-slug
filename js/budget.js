$(document).ready(function() {

	/********** Initialize **********/
	$('div.overlay').show();
	const initialize = init(_addDefaultState = function(newData) {
		return {page: {loadInstance: 0}};
	}, true).done((userData) => updateUi(userData));
	
	
	/********** Attach Button Event Listener to New Budget **********/
	$('#add-budget-open').on('click', function(event) {
		const modal = $('#add-budget-modal');		
		modal.modal('show');
	});

	/********** Attach Event Listener to New Budget - "Include in Budget" & "Auto-Calculate" **********/
	$('#add-budget-table').on('click', 'input.add-budget-include:enabled', function(event) {
		const dt = $('#add-budget-table').DataTable();
		const thisRow = dt.row($(this).closest('tr'));
		const thisRowData = thisRow.data();
		let newRowData = thisRowData;
		newRowData['includeInBudget'] = $(this).is(':checked');
		thisRow.data(newRowData);
		dt.draw();
	});
	$('#add-budget-table').on('click', 'input.add-budget-calculate:enabled', function(event) {
		const dt = $('#add-budget-table').DataTable();
		const thisRow = dt.row($(this).closest('tr'));
		const thisRowData = thisRow.data();
		let newRowData = thisRowData;
		newRowData['autoCalculate'] = $(this).is(':checked');
		thisRow.data(newRowData);
		dt.draw();
	});


	var typingTimer;                //timer identifier
	// https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up
	$('#add-budget-table').on('change keyup', 'input.add-budget-value:enabled', function(event) {
			clearTimeout(typingTimer);
			typingTimer = setTimeout(function() {
				console.log('Done typing');
				const dt = $('#add-budget-table').DataTable();
				const thisRow = dt.row($(this).closest('tr'));
				const thisRowData = thisRow.data();
				let newRowData = thisRowData;
				newRowData['monthlyBudget'] = Number($(this).val());
				thisRow.data(newRowData);
				
				const thisId = thisRow.index()
				const lastIndex = dt.rows().count() - 1
				// Get any ancestors
				seq(0, thisId).filter(i => dt.row(i).data().descendants.includes(thisRowData.id))
				.sort((a, b) => dt.row(a).data().nest_level > dt.row(b).data().nest_level ? -1 : 1)
				// Iterate through ancestors (in reverse order of nest_level) and add through descendants
				.forEach(function(i) {
					const parentId = dt.row(i).data().id;
					console.log('parentId', parentId);
					let newRowData = dt.row(i).data();
					// Iterate through and get any rows which are direct descendants
					const res = seq(0, lastIndex).filter(j => dt.row(j).data().parent == parentId).map(j => Number(dt.row(j).data().monthlyBudget) || 0);
					newRowData['monthlyBudget'] = res.reduce((a, b) => a + b);
					console.log(res);
					dt.row(i).data(newRowData);
				});
			}.bind(this), 500); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind 
			// Also set done Typing Interval here
	});
	

	/********** Attach Event Listener to New Budget - Validation & Submit **********/
	$('#add-budget-table').on('change keyup click', 'input, #add-budget-submit', function() {
		
		// Validate inputs
		document.querySelectorAll('input.add-budget-value').forEach(function(x) {
			const val = Number(x.value);
			x.classList.remove('is-valid');
			x.classList.remove('is-invalid');
			x.classList.add(typeof(val) === 'number' && !isNaN(val) ? 'is-valid' : 'is-invalid')
		});
		
		
		
	});


});


function updateUi(userData) {
	/*$('#account-name').text(userData.page.account.name);
	$('#account-balance').text(Number(userData.page.dailyBals[userData.page.dailyBals.length - 1].bal).toLocaleString('en-US', {style: 'currency',currency: 'USD'}));

	drawTable($('#transactions-table'), userData.accounts, userData.page.account, userData.page.transactions, userData.page.loadInstance);
	drawChart('transactions-chart-div', userData.page.account, userData.page.dailyBals, userData.page.loadInstance);*/
	drawTable($('#add-budget-table'), userData.accounts, userData.dailyBals, userData.page.loadInstance);
	$('div.overlay').hide();
}



function drawTable(tbl, accounts, dailyBals, loadInstance) {
	
	// Include all expense data
	const dtData =
		accounts
		.filter(x => x.name_path.includes('Expenses'))
		.map(account => 
			({...account, ... {
				childrenState: account.descendants.length > 0 ? (account.id_path.length <= 1 ? 1 : 0) : -1,
				includeInBudget: true,
				autoCalculate: account.descendants.length > 0 ? true : false,
				monthlyBudget: 0
			}})
		);
			
			;		
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
				{title: 'Include In Budget', data: 'includeInBudget'},
				{title: 'Auto-Calculate', data: 'autoCalculate'},
				{title: 'Monthly Budget', data: 'monthlyBudget'},
				{title: '#', data: 'id'},
			].map(function(x, i) {
				return {...x, ...{
					visible: (!['Row Number', 'Descendants', 'Children State', 'Nest Level'].includes(x.title)),
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
							return
							'<span style="padding-left: ' + Math.round((row.nest_level - 2) * 1) + 'rem">' +
							'<a style="font-size:0.90rem;font-weight:bold" href="transactions?account=' + row.id + '">' +
								row.name +
							'</a>';
						}
						: x.title === 'Include In Budget' ? (data, type, row) => (data === true ? '<input class="form-check-input add-budget-include" type="checkbox" checked>' : '<input class="form-check-input add-budget-include" type="checkbox">')
						: x.title === 'Auto-Calculate' ? (data, type, row) =>
							'<input class="form-check-input add-budget-calculate" type="checkbox" ' +
							(row.autoCalculate === true ? 'checked' : '') +
							(row.includeInBudget === true && row.descendants.length !== 0 ? '' : 'disabled') +
							'>'
						: x.title === 'Monthly Budget' ? (data, type, row) => 
							'<input type="text" class="form-control form-control-sm add-budget-value" value='+Number(row.monthlyBudget).toFixed(2)+' ' +
							(row.includeInBudget === true && row.autoCalculate === false ? '' : 'disabled') +
							'>'
						: false
				}};
			});
				
		const dt =
			tbl
			.DataTable({
				data: dtData,
				columns: dtCols,
				iDisplayLength: 1000,
				dom:
					"<'row'<'col-6 px-0 justify-content-start d-flex'f><'col-6 px-0 justify-content-end d-flex toggle-container'>>" +
					"<'row'<'px-0'tr>>" +
					"<'row'<'col-2'i><'col-10 justify-content-end d-flex px-0'B>>", // Flex display needed for right alignment
				buttons: [ // https://datatables.net/reference/option/buttons.buttons
					{extend: 'copyHtml5', text: 'Copy to clipboard', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn-sm btn-primary btn' },
					{extend: 'csvHtml5', text: 'Export to CSV', exportOptions: {columns: seq(3, dtCols.length - 1)}, className: 'btn-sm btn-primary btn'}
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
				info: false
				})
			.draw();
				
		// Filter: show things with parents that have childrenState = 1, and showAllAccounts = 1 or is_open = 1
		/*
		$.fn.dataTable.ext.search.push(function(settings, searchData, rowIndex, originalData, searchCounter) { // https://datatables.net/manual/plug-ins/search
			const ancestorStatuses =
				dt.rows()
				.data()
				.toArray()
				.filter(x => x['descendants'].includes(originalData['id']))
				.map(x => x['childrenState']);
			
			const show = (ancestorStatuses.length === 0 : (ancestorStatuses.every(x => x === 1))) && (originalData.showAllAccounts === 1 || originalData.is_open === true);
			//console.log(originalData['name'], ancestorStatuses, show);
			return(show);
		});
		*/
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

