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

	drawSankey(userData.accounts, userData.dailyBals, userData.transactions, userData.page.loadInstance);
	// drawSavingsChart(userData.accounts, userData.dailyBals, userData.dates, userData.page.loadInstance);

	$('div.overlay').hide();
}

function drawActiveMonth(activeMonth, loadInstance) {
	$('#active-month').text(moment(activeMonth).format('MMM YYYY'));
}


const drawSankey = function(accounts, dailyBals, loadInstance) {

	const years = [...new Set(dailyBals.flatMap(a => a.bals.map(t => t.dt.substring(0, 4))))];

	const series = years.map(function(year) {

		/// Get all transactions for the year
		const period_bals = dailyBals.flatMap(a => a.bals.filter(t => t.dt.substring(0, 4) === year).map(t => ({...t, id: a.id}))); 

		const income_sub_nodes = accounts.filter(a => a.name_path[a.name_path.length - 2] === 'Income').map(a => ({id: a.id, name: a.name === 'Salary' ? 'After-Tax Salary' : a.name == 'Tax Refunds' ? 'Additional Prior-Year Taxes' : a.name}));
		const income_nodes = accounts.filter(a => a.name_path[a.name_path.length - 1] === 'Income').map(a => ({id: a.id, name: a.name}));
		const expense_nodes = accounts.filter(a => a.name_path[a.name_path.length - 1] === 'Expenses').map(a => ({id: a.id, name: a.name}));
		const expense_sub_nodes = accounts.filter(a => a.name_path[a.name_path.length - 2] === 'Expenses').map(a => ({id: a.id, name: a.name}));
		const asset_sub_nodes = accounts.filter(a => a.name_path[a.name_path.length - 2] === 'Assets').map(a => ({id: a.id, name: a.name})).filter(a => a.name !== 'Fixed');
		const asset_sub_sub_nodes = accounts.filter(a => a.name_path[a.name_path.length - 3] === 'Assets').map(a => ({parent_id: a.id_path[a.id_path.length - 2], id: a.id, name: a.name})).filter(a => a.name != 'Cars');
		const investment_nodes = accounts.filter(a => a.name_path[a.name_path.length - 1] === 'Investment Gains/Losses').map(a => ({id: a.id, name: a.name}));

		const income_sub_income_conns = income_sub_nodes.map(function(a) {
			const account_bals = period_bals.filter(b => b.id === a.id);
			const start = account_bals.length === 0 ? 0 : account_bals[0].bal;
			const end = account_bals.length === 0 ? 0 : account_bals.slice(-1)[0].bal;
			if (end - start > 0) {
				return [a.id, income_nodes[0].id, Math.round(end - start)];
			} else {
				return [income_nodes[0].id, a.id, Math.round(start - end)];
			}
		});

		const income_expense_conns = expense_nodes.map(function(a) {
			const account_bals = period_bals.filter(b => b.id === a.id);
			const start = account_bals.length === 0 ? 0 : account_bals[0].bal;
			const end = account_bals.length === 0 ? 0 : account_bals.slice(-1)[0].bal;
			return [income_nodes[0].id, a.id, Math.round(end - start)];
		});

		const expense_expense_sub_conns = expense_sub_nodes.map(function(a) {
			const account_bals = period_bals.filter(b => b.id === a.id);
			const start = account_bals.length === 0 ? 0 : account_bals[0].bal;
			const end = account_bals.length === 0 ? 0 : account_bals.slice(-1)[0].bal;
			if (end - start > 0) {
				return [expense_nodes[0].id, a.id, Math.round(end - start)];
			} else {
				return [a.id, income_nodes[0].id, Math.round(start - end)];
			}
		});

		// const income_asset_sub_sub_nodes_conns = asset_sub_sub_nodes.map(function(a) {
		// 	const account_bals = period_bals.filter(b => b.id === a.id);
		// 	const start = account_bals[0].bal;
		// 	const end = account_bals.slice(-1)[0].bal;
		// 	return [income_nodes[0].id, a.id, Math.round(end - start)];
		// });

		const income_asset_sub_conns = asset_sub_nodes.map(function(a) {
			const account_bals = period_bals.filter(b => b.id === a.id);
			const start = account_bals.length === 0 ? 0 : account_bals[0].bal;
			const end = account_bals.length === 0 ? 0 : account_bals.slice(-1)[0].bal;
			return [income_nodes[0].id, a.id, Math.round(end - start)];
		}).filter(a => a[2] > 0);

		const asset_sub_asset_sub_sub_conns = asset_sub_sub_nodes.map(function(a) {
			const account_bals = period_bals.filter(b => b.id === a.id);
			const start = account_bals.length === 0 ? 0 : account_bals[0].bal;
			const end = account_bals.length === 0 ? 0 : account_bals.slice(-1)[0].bal;
			return [a.parent_id, a.id, Math.round(end - start)];
		});

		const investment_conns = investment_nodes.map(function(a) {
			const account_bals = period_bals.filter(b => b.id === a.id);
			const start = account_bals.length === 0 ? 0 : account_bals[0].bal;
			const end = account_bals.length === 0 ? 0 : account_bals.slice(-1)[0].bal;
			if (end - start > 0) {
				return [a.id, income_nodes[0].id, Math.round(end - start)];
			} else {
				return [income_nodes[0].id, a.id, Math.round(start - end)];
			}
		});


		return {
			keys: ['from', 'to', 'weight'],
			nodes: income_sub_nodes.concat(income_nodes).concat(expense_nodes).concat(expense_sub_nodes).concat(asset_sub_nodes).concat(asset_sub_sub_nodes).concat(investment_nodes),
			data: income_sub_income_conns.concat(income_expense_conns).concat(expense_expense_sub_conns).concat(income_asset_sub_conns).concat(asset_sub_asset_sub_sub_conns).concat(investment_conns),
			type: 'sankey',
			name: year,
			showInLegend: true,
			color: 'green',
			visible: year === '2023' ? true : false
		}
	})

	const o = {
		chart: {
			height: 950
		},
		title: {
			text: 'Balance Flow by Year'
		},
		legend: {
			enabled: true
		},
		plotOptions: {
			sankey: {
				dataLabels: {
					enabled: true,
					formatter: function() {
						return '$' + Highcharts.numberFormat(this.point.options.weight, 0);
					},
					nodeFormatter: function() {
						return this.point.name;
					},
				},
				events: {
					show: function () {

						const series = this;
						const chart = this.chart;
						chart.showLoading('Loading data ...');
					
						chart.series.forEach(s => {
							if (s.name !== series.name && s.visible == true) s.hide()
						});
						chart.hideLoading();
					}
				}
			}
		},
		series: series
	}

	const chart = Highcharts.chart('sankey-chart-container', o);
}

function drawChart(accounts, dailyBals, dates, loadInstance) {

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
		
		const accountTransactions = dailyBals.filter(x => x.id === account.id)[0].bals.map(x => [x.dt, x.bc]);	
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
	const expense_transactions = dailyBals.filter(x => x.id === expense_account_id)[0].bals;
	const income_account_id = accounts.filter(x => x.name === 'Income')[0].id;
	const income_transactions = dailyBals.filter(x => x.id === income_account_id)[0].bals;

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

function drawSavingsChart(accounts, dailyBals, dates, loadInstance) {

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
	const expense_transactions = dailyBalsFlat.filter(x => x.id === expense_account_id)[0];
	const income_account_id = accounts.filter(x => x.name === 'Income')[0].id;
	const income_transactions = dailyBalsFlat.filter(x => x.id === income_account_id)[0];

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

