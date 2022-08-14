document.addEventListener("DOMContentLoaded", function(event) {

	/********** Initialize **********/
	$('div.overlay').show();
	const initialize = init(_addDefaultState = function(newData) {
		// @loadInstance gives an indicator of page load: 0 = initial load, 1 = later load
		return {page: {
			loadInstance: 0
			}};
	}, true).then((userData) => updateUi(userData));
	

});


function updateUi(userData) {
	
	function getDates(startDate,stopDate,interval=1,unit='days'){
		var dateArray = [];
		var currentDate = moment(startDate);
		var stopDate = moment(stopDate);
		while(currentDate <= stopDate){
			dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
			currentDate = moment(currentDate).add(interval,unit);
		}
		return dateArray;
	}
	
	const date_range = getDates(moment().startOf('month'), moment().startOf('month').add(12, 'months'), 1, 'months');	
	
	date_range.forEach(function(x) {
	
		const cal_el = document.querySelector('#calendar')
		const new_div = document.createElement('div');
		
		const all_dates = getDates(moment(x).startOf('isoWeek'), moment(x).endOf('month').endOf('isoWeek'), 1, 'day')
		const data_by_week = [...new Set(all_dates.map(d => moment(d).isoWeek()))].map(w => all_dates.filter(d => moment(d).isoWeek() === w))
			.map(function(week_arr) {
				return '<tr>' + week_arr.map(function(d) {
					const m = moment(d);
					const in_month = m.month() === moment(x).month();
					if (in_month === true) {
						return '<td>' + m.date() + '</td>';
					} else {
						return '<td class="muted"></td>';
					}
				}).join('\n') + '</tr>';
			});
		

		console.log(data_by_week);
		const table = '<table>' +
			'<thead><tr>' +
				'<th>MONDAY</th>' +
				'<th>TUESDAY</th>' +
				'<th>WEDNESDAY</th>' +
				'<th>THURSDAY</th>' +
				'<th>FRIDAY</th>' +
				'<th>SATURDAY</th>' +
				'<th>SUNDAY</th>' +
			'</tr></thead>' +
			data_by_week.join('') 
		'</table>'
		
		new_div.innerHTML = `
			<div class="text-container"><h1>${moment(x).format('MMM YYYY')}</h1></div>
			${table}
		`;
		
		new_div.classList.add('calendar-month');
		
		cal_el.appendChild(new_div);

	
	});

	$('div.overlay').hide();
}
