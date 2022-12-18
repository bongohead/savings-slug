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
	// drawSavingsChart(userData.accounts, userData.dailyBals, userData.dates, userData.page.loadInstance);

	$('div.overlay').hide();
}

function drawActiveMonth(activeMonth, loadInstance) {
	$('#active-month').text(moment(activeMonth).format('MMM YYYY'));
}

function drawChart(accounts, dailyBalsChange, dates, loadInstance) {
	
	const accountsData = accounts.filter(x => x.name_path.includes('Income') );
	
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
	
	const chart_data_stack_1 = accountsData.map(function(account, i) {
		
		const accountTransactions = dailyBalsChange.filter(x => x.id === account.id).map(x => [x.dt, x.bc]);	
		const accountData = allDates.map(function(date) {
			return [parseInt(moment(date).format('x')), accountTransactions.filter(x => x[0] === date).reduce((accum, x) => accum + x[1], null)]
		}).map(x => [x[0], x[1] === 0 ? null : x[1]]);
		
		return {
			name: account.name,
			data: accountData,
			type: 'column',
			color: getColorArray()[i],
			visible: account.nest_level === 3,
			stack: 'income'
		};
	});
	
	
	// Not get savings data
	const expense_account_id = accounts.filter(x => x.name === 'Expenses')[0].id;
	const expense_transactions = dailyBalsChange.filter(x => x.id === expense_account_id);
	const income_account_id = accounts.filter(x => x.name === 'Income')[0].id;
	const income_transactions = dailyBalsChange.filter(x => x.id === income_account_id);

	const chart_data_stack_2 = [{
		name: 'Savings (Income - Expenses)',
		type: 'column',
		data: allDates.map(function(d) {
			const this_expense_date = expense_transactions.filter(x => x.dt === d);
			const this_income_date = income_transactions.filter(x => x.dt === d);
			return [parseInt(moment(d).format('x')), (this_income_date.length !== 0 ? this_income_date[0].bc : 0) - (this_expense_date.length !== 0 ? this_expense_date[0].bc : 0)]
		}),
		color: 'rgba(150, 200, 100, 1.0)',
		stack: 'savings',
		visible: false
	}];
	
	const chartData = chart_data_stack_1.concat(chart_data_stack_2);

	
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
			text: '<span style="font-size:1.8rem">Income Tracker</span>',
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
			align: 'center',
			backgroundColor: 'rgba(244, 241, 187, .9)',
			borderColor: 'var(--bs-black)',
			verticalAlign: 'bottom',
			layout: 'horizontal',
			title: {
				text: 'Income Categories <span style="font-size: .8rem; color: #666; font-weight: normal; font-style: italic">(click to hide/show)</span>',
			}
		},
		navigator: {
			enabled: false
		},
		scrollbar: {
			enabled: false
		},
        tooltip: {
            useHTML: true,
			split:true,
			// valueDecimals: 2,
			formatter: function() {
				const dataGrouping = this.points[0].series.currentDataGrouping.unitName;
				const primary_points = this.points.filter(x => x.series.options.stack == 'income');
				
				const table =  primary_points.length >= 1 ? ('<div>' +
					'<h5 class="text-right">' +
						(dataGrouping === 'month' ? moment(this.x).format('MMM Y') : dataGrouping === 'week' ? moment(this.x).format('[Week of] M/D/Y') : moment(this.x).format('M/D/Y')) +
					'</h5>' +
					primary_points.sort((a, b) => a.y < b.y ? 1 : -1).slice(0, 10).map(x => 
						'<span class="fw-bolder" style="color:'+ x.color +'">' + x.series.name + '</span>:  ' + x.y.toFixed(2)
					).join('<br>') +
					'<hr>' +
					'<span class="fw-bold" >Total Income:  ' + primary_points.map(x => x.y).reduce((a, b) => a + b, 0).toFixed(2) + '</span><br>' +
				'</div>') : '';
				const sec_points = this.points.filter(x => x.series.options.stack == 'savings');
				const sec_html = sec_points.length === 1 ? 
					'<hr><span class="fw-bold" >Net Savings:  ' + sec_points[0].y.toFixed(2) + '</span><br>':
					'';
					
				// return table;
				return table + sec_html;
			}
        },
        series: chartData
	};
	const chart = Highcharts.stockChart('expenses-chart-container', o);
	
	return;
}

function drawSavingsChart(accounts, dailyBalsChange, dates, loadInstance) {
		
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
	const expense_account_id = accounts.filter(x => x.name === 'Expenses')[0].id;
	const expense_transactions = dailyBalsChange.filter(x => x.id === expense_account_id);
	const income_account_id = accounts.filter(x => x.name === 'Income')[0].id;
	const income_transactions = dailyBalsChange.filter(x => x.id === income_account_id);

	console.log(allDates, expense_account_id, expense_transactions);
	
	const chart_data = allDates.map(function(d) {
		const this_expense_date = expense_transactions.filter(x => x.dt === d);
		const this_income_date = income_transactions.filter(x => x.dt === d);

		return [parseInt(moment(d).format('x')), (this_income_date.length !== 0 ? this_income_date[0].bc : 0) - (this_expense_date.length !== 0 ? this_expense_date[0].bc : 0)]
	});
	const chartData = [{
		name: 'Savings',
		type: 'column',
		data: chart_data,
		color: 'forestgreen'
	}];
	/*
	const chartData = accountsData.map(function(account, i) {
		
		const accountTransactions = dailyBalsChange.filter(x => x.id === account.id).map(x => [x.dt, x.bc]);	
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
	*/
	
	console.log('chartData2', chartData);
	
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
			text: '<span style="font-size:1.8rem">Savings Tracker</span>',
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
			enabled: false
		},
		scrollbar: {
			enabled: false
		},
		navigator: {
			enabled: false
		},
        tooltip: {
            useHTML: true,
			shared: false,
			
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
				'</div>';
				// return table;
				return table;
			}
			
        },
        series: chartData
	};
	const chart = Highcharts.stockChart('savings-chart-container', o);
	
	return;
}

