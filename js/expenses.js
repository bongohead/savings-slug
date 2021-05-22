$(document).ready(function() {

	/********** Initialize **********/
	$('div.overlay').show();
	const initialize = init(_addDefaultState = function(newData) {
		return {page: {activeMonth: moment.max(newData.dates.map(x => moment(x))).format('YYYY-MM-DD'), loadInstance: 0}};
	}, true).done((userData) => updateUi(userData));
	
	
	
	/********** Attach Event Listener to Arrows - Back & Forward Dates **********/
	$('button.active-month-change').on('click', function() {
		const newActiveMonth = moment(getData('page').activeMonth).add((this.id === 'active-month-next' ? 1 : -1), 'months').format('YYYY-MM-DD');
		
		init(_addDefaultState = function(newData) {
			return {page: {activeMonth: newActiveMonth, loadInstance: 1}};
		}, true).done((userData) => updateUi(userData));
	});

});


function updateUi(userData) {
	drawActiveMonth(userData.page.activeMonth, userData.page.loadInstance);
	drawChart(userData.accounts, userData.dailyBalsChange, userData.dates, userData.page.loadInstance);

	$('div.overlay').hide();
}

function drawActiveMonth(activeMonth, loadInstance) {
	$('#active-month').text(moment(activeMonth).format('MMM YYYY'));
}

function drawChart(accounts, dailyBalsChange, dates, loadInstance) {
	
	const accountsData = accounts.filter(x => x.name_path.includes('Expenses') );
	
	function dateSeq(startDate, stopDate) {
		var dateArray = [];
		var currentDate = moment(startDate);
		var stopDate = moment(stopDate);
		while (currentDate <= stopDate) {
			dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
			currentDate = moment(currentDate).add(1, 'days');
		}
		return dateArray;
	}
	// Get all dates between start and end
	const allDates = dateSeq(dates[0], dates[dates.length-1]);
	
	const chartData = accountsData.map(function(account, i) {
		
		const accountTransactions = dailyBalsChange.filter(x => x.id === account.id).map(x => [x.date, x.balChange]);	
		const accountData = allDates.map(function(date) {
			return [parseInt(moment(date).format('x')), accountTransactions.filter(x => x[0] === date).reduce((accum, x) => accum + x[1], null)]
		}).map(x => [x[0], x[1] === 0 ? null : x[1]]);
		
		return {
			name: account.name,
			data: accountData,
			type: 'column',
			color: getColorArray()[i],
			visible: account.nest_level === 3
		};
	});
	
	console.log('chartData', chartData);
	
	const o = {
        chart: {
			spacingTop: 0,
			backgroundColor: 'rgba(255, 255, 255, 0)',
			plotBackgroundColor: '#FFFFFF',
			style: {
				fontColor: 'var(--bs-econgreen)'
			},
			height: 500,
			plotBorderColor: 'black',
			plotBorderWidth: 2
        },
		time: {
			timezone: 'America/New_York'
		},
        credits: {
			enabled: false
        },
        title: {
			useHTML: true,
			text: '<span style="font-size:1.8rem">Expense Tracker</span>',
        },
		plotOptions: {
			series: {
				opacity: 0.9,
				lineWidth: 1,
				stacking: 'normal',
				pointPadding: .05,
				groupPadding: .05,

				dataGrouping: {
					approximation: 'sum',
					enabled: true,
					forced: true,
					units: [
						['day', [1]]
					]
				}
			}
		},
		xAxis: {
			type: 'datetime',
            dateTimeLabelFormats: {
                day: "%m/%d",
                week: "%m/%d"
            },
			labels: {
				style: {
					color: 'black'
				}
			}
		},
		yAxis: {
			title: {
				text: ''
			},
			opposite: false,

            labels: {
				reserveSpace: true,
				align: 'left',
				style: {
					color: 'black',
					fontSize: '1.0rem'
				},
                formatter: function () {
                    return '$' + this.value.toFixed(0);
                }
            }
		},
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{
                type: 'all',
                text: 'Group By Day',
                dataGrouping: {
                    forced: true,
                    units: [['day', [1]]]
                }
            }, {
                type: 'all',
                text: 'Group By Week',
                dataGrouping: {
                    forced: true,
                    units: [['week', [1]]]
                }
            }, {
                type: 'all',
                text: 'Group By Month',
                dataGrouping: {
                    forced: true,
                    units: [['month', [1]]]
                }
            }
			],
            buttonTheme: {
                width: 160
            },
            selected: 1
        },
		legend: {
			enabled: true,
			align: 'center',
			backgroundColor: 'rgba(244, 241, 187, .9)',
			borderColor: 'var(--bs-black)',
			verticalAlign: 'bottom',
			layout: 'horizontal',
			title: {
				text: 'Expense Categories <span style="font-size: .8rem; color: #666; font-weight: normal; font-style: italic">(click to hide/show)</span>',
			}
		},
        tooltip: {
            useHTML: true,
			shared: true,
			valueDecimals: 2
        },
        series: chartData
	};
	const chart = Highcharts.stockChart('expenses-chart-container', o);
	
	return;
}
