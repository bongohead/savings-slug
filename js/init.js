document.addEventListener("DOMContentLoaded", function(event) {

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
  })();
	
	
	
	const hc_theme = {
		chart: {
			style: {
				fontFamily: 'var(--bs-font-sans-serif)'
			}
		},
		
		title: {
			align: 'center',
			style: {
				fontFamily: '"Assistant", Arial, "sans-serif"',
				color: '#000000',
				fontSize: '1.2rem'
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
	
	Highcharts.setOptions({
		chart: {
			style: {
				fontFamily: '"Assistant", Arial, "sans-serif"'
			}
		},
		time: {
			timezone: 'America/New_York'
		},
		colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
	});
	// Apply the theme
	Highcharts.setOptions(hc_theme);
	

});


/*** Loads initial data ***/
/*
	This function returns/modifies the sessionStorage userData.
	@_addDefaultState (function) that takes returned newData0 and returns an object of state values to set on initial page load, these will be appended to userData
	@_forceReload (boolean) that forces a reload of models, scenarios, params
*/
function init(_addDefaultState = (newData0) => ({}), _forceReload = false) {
	
	// First get user data
	const userData = getAllData();
	
	// Now create secondary deferred object for getting data
	const getNewData = new Promise(function(resolve, reject) {
		// Skip if: _forceReload = TRUE, userData has never been set, or data has already been updated within last 5 minutes
		if (_forceReload === false && !$.isEmptyObject(userData) && new Date() - new Date(userData.lastUpdated) <= 5 * 60 * 1000) {
			console.log('Recycling userData');
			const newData = userData;
			resolve(userData);
		} else {
			
			const getAccounts = getFetch('getAccounts', toScript = ['accounts']).then(function(ajaxRes) {
				// Recursive CTE already returns the correct order [descendants immediately following their parents]
				const accounts0 =
					ajaxRes.accounts
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
				return {accounts: accounts};
			});
			
			const getTransactions = getFetch('getTransactions', toScript = ['transactions']).then(function(ajaxRes) {
				const transactions = ajaxRes.transactions.map(function(x) {
					x.dt = (x.dt);
					x.val = parseFloat(x.val);
					return x;
				});
				return {transactions: transactions};
			});
			
			
			// Get all sim runs & active sim run
			const calculateBalances = Promise.all([getAccounts, getTransactions]).then(function(r) {
				const accounts = r[0].accounts;
				const transactions = r[1].transactions;
				
				const dates = [...new Set(transactions.map(x => x.dt))];
				
				// Get daily credit & debit changes at all dates (does not sum up to top-level elements)
				const dailyBalChangeNested = dates.map(function(date) {
					const dailyTransactions = transactions.filter(x => x.dt === date);
					const res = accounts.map(account => ({
						id: account.id,
						descendants: account.descendants,
						db: dailyTransactions.filter(x => x.db === account.id).map(x => x.val).reduce((a, b) => a + b, 0),
						cr: dailyTransactions.filter(x => x.cr === account.id).map(x => x.val).reduce((a, b) => a + b, 0)
					}));
					return res;
				});
				
				// Sum up to top-level elements
				const dailyBalChange0 = dailyBalChangeNested.map(function(accountsByDate) {
					return accountsByDate.map(account => ({
						id: account.id,
						// descendants: account.descendants,
						// Sum up over debit/credit values of descendants
						db: account.db + accountsByDate.filter(x => account.descendants.includes(x.id)).map(x => x.db).reduce((a, b) => a + b, 0),
						cr: account.cr + accountsByDate.filter(x => account.descendants.includes(x.id)).map(x => x.cr).reduce((a, b) => a + b, 0)
					}));
				});
				
				// Get daily balances instead of debit/credit daily change -> accounts and dates indices must be same in dailyBalChange as in date and accounts constants
				// bc == balchange
				let dailyBals = dailyBalChange0;
				for (d = 0; d < dates.length; d++) {
					for (a = 0; a < accounts.length; a++) {
						dailyBals[d][a].db = Math.round(((d > 0 ? dailyBals[d - 1][a].db : 0) + dailyBalChange0[d][a].db) * 100)/100
						dailyBals[d][a].cr = Math.round(((d > 0 ? dailyBals[d - 1][a].cr : 0) + dailyBalChange0[d][a].cr) * 100)/100
						dailyBals[d][a].bal = Math.round((dailyBals[d][a].db * accounts[a].debit_effect + dailyBals[d][a].cr * accounts[a].debit_effect * -1) * 100)/100;
						dailyBals[d][a].bc = Math.round((dailyBals[d][a].bal - (d > 0 ? dailyBals[d - 1][a].bal : 0)) * 100)/100;
						dailyBals[d][a].dt = dates[d];
						// Clear space in storage
					}
				}
				dailyBals = dailyBals.flat(1);
				return {dailyBalsChange: dailyBalChange0.flat(), dailyBals: dailyBals, dates: dates};
			});


			// Finally update user data and UI
			Promise.all([getAccounts, getTransactions, calculateBalances]).then(function(r) {
				const newData = {...r[0], ...r[1], ...r[2], lastUpdated: new Date()};
				resolve(newData);
			});

		}
	});
	
	
	// Once new data has been pulled, merge it with the default state variables, store the result in sessionStorage and set the UI
	const cleanedData = getNewData.then(function(newData, e) {
		
		const finalData = $.extend(true, newData, _addDefaultState(newData));
		console.log('finalData', finalData);
		// {...newData, ..._addDefaultState(newData)};
		
		setAllData(finalData);
		
		const accountsSidebarHtml = finalData.accounts.filter(account => account.is_open === true).map(account => 
				'<a class="text-truncate py-0" href="/transactions?account=' + account.id + '">' +
					'<span style="font-size:.8rem;margin-right:1rem;margin-left: ' + (1 + Math.round((account.nest_level - 1) * 1)) + 'rem">' + 
						account.name +
					'</span>' +
				'</a>'
			).join('\n');
		
		$('#transactions-links').html(accountsSidebarHtml);
		
		const accountsNavbarHtml = finalData.accounts.filter(x => x.name_path.length === 1).map(x =>
			'<div>' +
				'<div class="dropdown-header py-0 mx-3 mb-1 border-bottom border-black" style="font-size:1.0rem">' + x.name + '</div>' +
				finalData.accounts.filter(y => y.name_path[0] === x.name & y.name !== x.name).map(y => 
					'<a class="dropdown-item py-0 mt-1" href="/transactions?account=' + y.id + '">' + 
						'<span style="margin-left: ' + Math.round((y.nest_level - 1) * 1) + 'rem">' +
							y.name +
						'</span>' +
					'</a>'
				).join('\n') +
			'</div>'
		);
		$('#navbar-detailed-accounts > div').html(accountsNavbarHtml);


		// Set navbar activepage - this has been moved down from the initial init so that now if on transactions? page, if can detect that detailed accounts should be highlighted in the navbar
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

		// console.log('finalData', finalData);
		return finalData;
	});
	
	return cleanedData;
}







