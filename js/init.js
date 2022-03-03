$(document).ready(function() {

	(function(){
		/*
			document.querySelector('nav.navbar').classList.add('justify-content-center');
			document.querySelector('header').style.position = 'relative';
			document.querySelector('nav.navbar > div').classList.add('col-auto');
			document.querySelector('nav.navbar').style.backgroundColor = '#90A4A4';
			document.querySelector('nav.navbar a.navbar-brand').remove();
			document.querySelectorAll('nav.navbar a.nav-link').forEach(x => x.style.fontSize = '1.1rem');

			const newDiv = document.createElement('div');
			newDiv.style.backgroundColor = 'cyan';
			const newA = document.createElement('a');
			newA.setAttribute('href', '/');
			const newImg = document.createElement('img');
			newImg.setAttribute('src', '/static/slug3.png');
			newImg.setAttribute('height', '60');
			newImg.setAttribute('alt', 'Savings SLUG');
			newImg.classList.add('mx-auto');
			newImg.classList.add('d-block');
			newImg.style.imageRendering = '-webkit-optimize-contrast';

			newDiv.appendChild(newA).appendChild(newImg);
			
			document.querySelector('header').insertBefore(newDiv, document.querySelector('nav.navbar'));
		*/
		// Enables tooltips
		$('[data-toggle="tooltip"]').tooltip();
	})();
	
	
	Highcharts.setOptions({
		time: {
			timezone: 'America/New_York'
		}
	});
	
	Highcharts.theme = {
		chart: {
		backgroundColor: "#FFF1E0",
			style: {
				fontFamily: '"Assistant", Arial, "sans-serif"',
				color: '#000000'
			}
		},
		title: {
			align: 'center',
			style: {
				fontFamily: '"Assistant", Arial, "sans-serif"',
				color: '#000000'
			}
		},
		subtitle: {
			align: 'center',
			style: {
				fontFamily: '"Assistant", Arial, "sans-serif"',
				color: '#000000'
			}
		},
		xAxis: {
			lineColor: "#000000",
			lineWidth: 2,
			tickColor: "#000000",
			tickWidth: 2,
			labels: {
				style: {
					color: "black"
				}
			},
			title: {
				style: {
					color: "black"
				}
			}
		},
		yAxis: {
			gridLineDashStyle: 'Dot',
			gridLineWidth: 2,
			gridLineColor: "#CEC6B9",
			lineColor: "#CEC6B9",
			minorGridLineColor: "#CEC6B9",
			labels: {
				style: {
					color: "black"
				}
			},
			tickLength: 0,
			tickColor: "#CEC6B9",
			tickWidth: 1,
			title: {
				style: {
					color: "black"
				}
			}
		},
		tooltip: {
			backgroundColor: "#FFFFFF",
			borderColor: "#76c0c1",
			style: {
				color: "#000000"
			}
		},
		legend: {
			layout: "horizontal",
			align: "left",
			verticalAlign: "top",
			itemStyle: {
				color: "#3C3C3C"
			}
		},
		credits: {
			style: {
				color: "#666"
			}
		},
		labels: {
			style: {
				color: "#D7D7D8"
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: "#DDDDDD",
				theme: {
					fill: "#505053"
				}
			}
		},
	legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
	background2: "#505053",
	dataLabelsColor: "#B0B0B3",
	textColor: "#C0C0C0",
	contrastTextColor: "#F0F0F3",
	maskColor: "rgba(255,255,255,0.3)"
	};
	// Apply the theme
	Highcharts.setOptions(Highcharts.theme);
	

});


/*** Loads initial data ***/
/*
	This function returns/modifies the sessionStorage userData.
	@_addDefaultState (function) that takes returned newData0 and returns an object of state values to set on initial page load, these will be appended to userData
	@_forceReload (boolean) that forces a reload of models, scenarios, params
*/
function init (_addDefaultState = (newData0) => ({}), _forceReload = false) {
	
	// Create new promise for full function
	const initDfd = $.Deferred();
	// First get user data
	const userData = getAllData();
	
	// Now create secondary deferred object for getting data
	const getNewData = $.Deferred(function(getNewDataDfd) {
		// Skip if: _forceReload = TRUE, userData has never been set, or data has already been updated within last 5 minutes
		if (_forceReload === false && !$.isEmptyObject(userData) && new Date() - new Date(userData.lastUpdated) <= 5 * 60 * 1000) {
			console.log('Recycling userData');
			const newData = userData;
			getNewDataDfd.resolve(userData);
		}
		else {
			const getAccounts = $.Deferred(function(dfd) {
				getAJAX('getAccounts', toScript = ['accounts']).done(function(ajaxRes) {
					// Recursive CTE already returns the correct order [descendants immediately following their parents]
					const accounts0 =
						JSON.parse(ajaxRes).accounts
						.map(function(x, i) {
							x.id_path = x.id_path.split(' > ').map(x => parseInt(x));
							x.name_path = x.name_path.split(' > ');
							x.full_order = i;
						 return x;
						});

					// Get family relations	
					const accounts =
						accounts0.map(function(x) {
							x.children = accounts0.filter(y => y.id !== x.id && y.id_path[y.id_path.length - 2] === x.id).map(y => y.id);
							x.siblings = accounts0.filter(y => y.id_path.length >= 2 && y.id !== x.id && y.id_path[y.id_path.length - 2] === x.id_path[x.id_path.length - 2]).map(y => y.id); // Get siblings
							x.parent = x.id_path[x.id_path.length - 2];
							x.descendants = accounts0.filter(y => y.id !== x.id && y.id_path.includes(x.id)).map(y => y.id);
							return(x);
						});
					dfd.resolve({accounts: accounts});
				});
				return dfd.promise();
			});
			
			const getTransactions = $.Deferred(function(dfd) {
				getAJAX('getTransactions', toScript = ['transactions']).done(function(ajaxRes) {
					const transactions = JSON.parse(ajaxRes).transactions.map(function(x) {
						x.date = (x.date);
						x.value = parseFloat(x.value);
						return x;
					});
					dfd.resolve({transactions: transactions});
				});
				return dfd.promise();
			});
			
			
			// Get all sim runs & active sim run
			const calculateBalances = $.Deferred(function(dfd) {
				$.when(getAccounts, getTransactions).done(function(r1, r2) {
					const accounts = r1.accounts;
					const transactions = r2.transactions;
					
					// Get dates by iterating through start date and end date
					// https://stackoverflow.com/questions/29466944/how-to-list-all-month-between-2-dates-with-moment-js
					// Use below line instead to only include dates with transactions
					const dates = [...new Set(transactions.map(x => x.date))];
					/*const startDate = transactions.reduce((x, accum) => moment(accum.date) < moment(x.date) ? accum : x).date;
					const dates =
						Array.from({length: moment().diff(moment(startDate), 'day') + 1 }).map((_, index) =>
							moment(moment(startDate)).add(index, 'day').format('YYYY-MM-DD'),
						);
					console.log('dates', dates);
					*/
					// Get daily credit & debit changes at all dates (does not sum up to top-level elements)
					const dailyBalChangeNested = dates.map(function(date) {
						const dailyTransactions = transactions.filter(x => x.date === date);
						const res =
							accounts.map(function(account) {
							return {
								id: account.id,
								descendants: account.descendants,
								debit: dailyTransactions.filter(x => x.debit === account.id).map(x => x.value).reduce((a, b) => a + b, 0),
								credit: dailyTransactions.filter(x => x.credit === account.id).map(x => x.value).reduce((a, b) => a + b, 0)
								}
							});
						return (res);
					});
					
					// Sum up to top-level elements
					const dailyBalChange0 = dailyBalChangeNested.map(function(accountsByDate) {
						return accountsByDate.map(function(account) {
							return {
								id: account.id,
								descendants: account.descendants,
								// Sum up over debit/credit values of descendants
								debit: account.debit + accountsByDate.filter(x => account.descendants.includes(x.id)).map(x => x.debit).reduce((a, b) => a + b, 0),
								credit: account.credit + accountsByDate.filter(x => account.descendants.includes(x.id)).map(x => x.credit).reduce((a, b) => a + b, 0)
							}
						});
					});
					
					
					// Get daily balances instead of debit/credit daily change -> accounts and dates indices must be same in dailyBalChange as in date and accounts constants
					let dailyBals = dailyBalChange0;
					for (d = 0; d < dates.length; d++) {
						for (a = 0; a < accounts.length; a++) {
							dailyBals[d][a].debit = Math.round(((d > 0 ? dailyBals[d - 1][a].debit : 0) + dailyBalChange0[d][a].debit) * 100)/100
							dailyBals[d][a].credit = Math.round(((d > 0 ? dailyBals[d - 1][a].credit : 0) + dailyBalChange0[d][a].credit) * 100)/100
							dailyBals[d][a].bal = Math.round((dailyBals[d][a].debit * accounts[a].debit_effect + dailyBals[d][a].credit * accounts[a].debit_effect * -1) * 100)/100;
							dailyBals[d][a].balChange = Math.round((dailyBals[d][a].bal - (d > 0 ? dailyBals[d - 1][a].bal : 0)) * 100)/100;
							dailyBals[d][a].date = dates[d];
						}
					}
					dailyBals = dailyBals.flat(1);
					dfd.resolve({dailyBalsChange: dailyBalChange0.flat(), dailyBals: dailyBals, dates: dates});
				});
				return dfd.promise();
			});


			// Finally update user data and UI
			$.when(getAccounts, getTransactions, calculateBalances).done(function(r1, r2, r3) {
				const newData = $.extend(true, r1, r2, r3, {lastUpdated: new Date()});
				getNewDataDfd.resolve(newData);
			});

		}
		return getNewDataDfd.promise();
	});
	
	
	// Once new data has been pulled, merge it with the default state variables, store the result in sessionStorage and set the UI
	$.when(getNewData).done(function(newData) {
		const finalData = $.extend(true, newData, _addDefaultState(newData));
		
		setAllData(finalData);
		const accountsSidebarHtml =
			finalData.accounts.filter(account => account.is_open === true).map(account => 
				'<a class="text-truncate" href="/transactions?account=' + account.id + '">' +
					'<span style="font-size:.8rem;margin-right:1rem;margin-left: ' + (1 + Math.round((account.nest_level - 1) * 1)) + 'rem">' +  account.name + '</span>' +
				'</a>'
			).join('\n');
		
		$('#transactions-links').html(accountsSidebarHtml);
		// $(accountsSidebarHtml).appendTo('#transactions-links')

		const accountsNavbarHtml =
			finalData.accounts.map(account => 
				'<a class="dropdown-item" href="/transactions?account=' + account.id + '">' +
					'<span style="margin-left: ' + Math.round((account.nest_level - 1) * 1) + 'rem">' +  account.name + '</span>' +
				'</a>'
			).join('\n');
		$('#navbar-detailed-accounts').html(accountsNavbarHtml);



		// Set navbar activepage - this has been moved down from the initial init so that now if on transactions? page, if can detect that detailed accoutns should be highlighted in the navbar
		const pathname = window.location.pathname + window.location.search;
		const navbar = document.querySelector('nav.navbar');

		if (navbar) {
			navbar.querySelectorAll('a').forEach(function(x) {
				if (x.getAttribute('href') == pathname) {
					x.classList.add('activepage');
					if (x.closest('.dropdown-menu')) {
						x.closest('.dropdown-menu').parentNode.querySelector('a.nav-link').classList.add('activepage');
					}
					};
				return;
			});

		}
		const sidebar = document.querySelector('nav.sidebar');
		if (sidebar) {
			sidebar.querySelectorAll('a').forEach(function(x) {
				if (x.getAttribute('href') == pathname) x.classList.add('activepage');
				return;
			})
		}


		// Also, make "add transactions" open on sidebar if on transactions page
		console.log('finalData', finalData);

		initDfd.resolve(finalData);
	});
	
		
	return initDfd.promise();
}







