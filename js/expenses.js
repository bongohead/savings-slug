$(document).ready(function() {

	/********** Initialize **********/
	$('div.overlay').show();
	const initialize = init(_addDefaultState = function(newData) {
		return {page: {activeMonth: moment.max(newData.dates.map(x => moment(x))).format('YYYY-MM-DD'), loadInstance: 0}};
	}, true).then((userData) => updateUi(userData));
	
	
	
	/********** Attach Event Listener to Arrows - Back & Forward Dates **********/
	$('button.active-month-change').on('click', function() {
		const newActiveMonth = moment(getData('page').activeMonth).add((this.id === 'active-month-next' ? 1 : -1), 'months').format('YYYY-MM-DD');
		
		init(_addDefaultState = function(newData) {
			return {page: {activeMonth: newActiveMonth, loadInstance: 1}};
		}, true).then((userData) => updateUi(userData));
	});

});


function updateUi(userData) {
	drawActiveMonth(userData.page.activeMonth, userData.page.loadInstance);
	drawChart(userData.accounts, userData.dailyBals, userData.dates, userData.page.loadInstance);

	$('div.overlay').hide();
}

function drawActiveMonth(activeMonth, loadInstance) {
	$('#active-month').text(moment(activeMonth).format('MMM YYYY'));
}

function drawChart(accounts, dailyBals, dates, loadInstance) {
	
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
		
		const accountTransactions = dailyBals.filter(x => x.id === account.id)[0].bals.map(x => [x.dt, x.bc]);	
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
				fontColor: 'var(--bs-green)'
			},
			height: 550,
			plotBorderColor: 'black',
			plotBorderWidth: 2
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
            selected: 2
        },
		legend: {
			enabled: true,
			align: 'left',
			// backgroundColor: 'rgba(244, 241, 187, .9)',
			borderColor: 'var(--bs-black)',
			verticalAlign: 'middle',
			layout: 'vertical',
			title: {
				text: 'Expense Categories <span style="font-size: .7rem; color: #666; font-weight: normal; font-style: italic">(click to hide/show)</span>',
			}
		},
		navigator: {
			enabled: false
		},
        tooltip: {
            useHTML: true,
			shared: true,
			// valueDecimals: 2,
			formatter: function() {
				const dataGrouping = this.points[0].series.currentDataGrouping.unitName;
				console.log(dataGrouping);
				const table = '<div>' +
					'<h5 class="text-right">' +
						(dataGrouping === 'month' ? moment(this.x).format('MMM Y') : dataGrouping === 'week' ? moment(this.x).format('[Week of] M/D/Y') : moment(this.x).format('M/D/Y')) +
					'</h5>' +
					this.points.sort((a, b) => a.y < b.y ? 1 : -1).slice(0, 10).map(x => 
						'<span class="fw-bolder" style="color:'+ x.color +'">' + x.series.name + '</span>:  ' + x.y.toFixed(2)
					).join('<br>') +
					'<hr>' +
					'<span class="fw-bold" >Total Income:  ' + this.points.map(x => x.y).reduce((a, b) => a + b, 0).toFixed(2) + '</span><br>' +
				'</div>';
				// return table;
				return table;
			}
        },
        series: chartData
	};
	const chart = Highcharts.stockChart('expenses-chart-container', o);
	
	return;
}
