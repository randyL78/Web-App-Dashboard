/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
	"use strict";
	// ************************************************************
	//				Navigation
	// ************************************************************

	// ************ variables
	const navButton = document.querySelector("#nav__menu--primary");
	const navDropdown = document.querySelector("#nav__dropdown");
	const navClose = document.querySelector("#nav__arrow--primary");
	const navBar = navDropdown.parentElement;
	const main = document.querySelector("main");
	const hideClass = "hidden--small";
	
	let navOpen = false;
	// ************ functions

	// set the attributes of an element using an attributes object
	function setAttributes(element, attributes) {
		for (let attr in attributes) {
			if (attr !== "") {
				element.setAttribute(attr.toUpperCase(), attributes[attr].toLowerCase());
			}
		}
		return element;
	}
	
	// set the styles of an element using an styles object
	function setStyles(element, styles) {
		for (let style in styles) {
			if (style !== "") {
					element.style[style.toLowerCase()] = styles[style].toLowerCase();
			}
		}
		return element;
	}
	
	function viewSize() {
		const size = window.innerWidth;
		if (size < 768) {
			return "small";
		} else if (size < 1024) {
			return "medium";
		} else {
			return "large";
		}
	}
	
	// collapse navigation dropdown to original state
	function navArrow() {
		const size = viewSize();
		if (size === "small") {
			navCollapseSmall();
		} else if (size === "medium") {
			if (navOpen === true) {
				closeNav();
			} else {
				openNav();
				
			}
		}
	}
	
	// navigation functions for small screens
	function navCollapseSmall() {
		navDropdown.classList.add(hideClass);
		navClose.style.display = "none";
	}
	
	function navShow() {
		navDropdown.classList.remove(hideClass);
		navClose.style.display = "block";	
		
	}
	
	// navigation functions for medium screens
	function navViewMedium() {
		navClose.style.display = "block";	
		navBar.style.width = "25px";
		closeNav();
	}
	
	function closeNav() {
		let width = "25px";
		navDropdown.classList.add(hideClass);
		navOpen = false;
		navBar.style.width = width;
		main.style.marginLeft = width;
	}
	
	function openNav() {
		let width = "100px";
		navOpen = true;
		navDropdown.classList.remove(hideClass);	
		navBar.style.width = width;
		main.style.marginLeft = width;
	}
	
		// navigation functions for large screens
	function navViewLarge() {
		let width = "100px";
		navClose.style.display = "none";	
		navBar.style.width = width;
		main.style.marginLeft = width;
		navDropdown.classList.remove(hideClass);	
	}

	// ************ event listeners
	navButton.addEventListener('click', function () {
		if (navDropdown.classList.contains(hideClass)) {
			navShow();
		} else {
			navArrow();
		}

	});
	
	navClose.addEventListener('click', function () {
		navArrow();
	});

	// if nav dropdown is open in small or medium screen, collapse it before resizing
	window.addEventListener('resize', function () {
		const size = viewSize();
		if (size === "small") {
			main.style.marginLeft = "0";
			navBar.style.width = "100%";
			navCollapseSmall();
		} else if (size === "medium") {
			navViewMedium();
		} else {
			navViewLarge();
		}
	});
	// ************* main


	// ************************************************************
	//				Charts
	// ************************************************************


	const ctx = document.getElementById("line__traffic--Weekly").getContext('2d');
	const ctx2 = document.getElementById("bar__traffic").getContext('2d');
	const ctx3 = document.getElementById("pie__mobile").getContext('2d');
	
	Chart.defaults.global.defaultFontColor = "#a4a4a4";
	
	const weeklyTrafficLine = new Chart(ctx, {
		type: "line",
		data: {
			datasets: [{
				data: [500, 1000, 750, 1250, 1750, 1250, 1500, 1000, 1500, 2000, 1500, 2000],

				backgroundColor: ['rgba(115, 119, 191, .2)'],
				borderColor: ['#7477BF'],
				borderWidth: 1,
				pointRadius: 6,
				pointBorderWidth: 2,
				pointBackgroundColor: '#fff'
			}],
				labels: ['', '16-22', '23-29', '30-5', '6-12', '13-19', '20-26','27-3','4-10','11-17','18-24','25-31'],
    	},
		options: {
			responsive: true,
			legend: {
            	display: false
            },
			scales: {
				yAxes: [{
					ticks: {
						min: 0,
						max: 2500
					}
				}]
			},
			elements: {
				line: {
					tension: 0, // disables bezier curves
				}
			}
		}
	});

	

	
	
	const dailyTrafficBar = new Chart(ctx2, {
		type: 'bar',
		data: {
			labels: ["S", "M", "T", "W", "T", "F", "S"],
			datasets: [{
				label: '# of Hits',
				data: [50, 75, 150, 100, 200, 180, 65],
				backgroundColor: '#7477BF',
				borderWidth: 0,
			}]
		},
		options: {
			legend: {
            	display: false
            },		
			scales: {
				xAxes: [{
					barPercentage: 0.6			
				}],
				yAxes: [{
					ticks: {
						min: 0,
						max: 250
					}
				}]
			}
		}
	});
	
	
var mobileUsersPie = new Chart(ctx3, {
    type: 'doughnut',
    data: {
		datasets: [{
			data: [5120, 4029, 16501],
			backgroundColor: ['#81c98f', "#74b1bf", '#7477BF'],
			borderWidth: 0
		}],
		labels: ["Tablets", "Phones",  "Desktop"]
	},
	options: {
		cutoutPercentage: 55,
		legend: {
		position: 'right',
		labels: {
			boxWidth: 20,
			fontSize: 17
			}
		},
		layout: {
			padding: 20
		},

		rotation: (-0.65 * Math.PI)
	}
});
	
	
});












