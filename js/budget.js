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
				childrenState: account.descendants.length > 0 ? (account.id_path.length <= 1 ? 1 : 0) : -1
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
				{title: 'Monthly Budget', data: null},
				{title: '#', data: 'id'},
			].map(function(x, i) {
				return {...x, ...{
					visible: (!['Row Number', 'Descendants', 'Children State', 'Nest Level', '#'].includes(x.title)),
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
							'<span style="padding-left: ' + Math.round((row.nest_level - 1) * 1) + 'rem">' +
							'<a style="font-size:0.95rem;font-weight:bold" href="transactions?account=' + row.id + '">' +
								row.name +
							'</a>';
						}
						: x.title === 'Monthly Budget' ? (data, type, row) => '<input type="text" id="disabledTextInput" class="form-control form-control-sm" value=0>'
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

