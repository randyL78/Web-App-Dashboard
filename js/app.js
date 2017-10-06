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
		} else if (size < 1200) {
			return "medium";
		} else if (size < 1500) {
			return "large";
		} else {
			return "x-large";
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

	// navigation functions for extra large screens
	function navViewXLarge() { 
		navViewLarge();
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
		} else if (size === "large") {
			navViewLarge();
		} else {
			navViewXLarge();			
		}
	});


	// ************************************************************
	//				Charts
	// ************************************************************

	// ************* variables
	const ctx = document.getElementById("line__traffic--Weekly").getContext('2d');
	const ctx2 = document.getElementById("bar__traffic").getContext('2d');
	const ctx3 = document.getElementById("pie__mobile").getContext('2d');
	const trafficUL = document.getElementById("btns--traffic");
	const hourlyLabels = [];
	const oneWeekLabels = [];
	const weeklyLabels = ['', '16-22', '23-29', '30-5', '6-12', '13-19', '20-26','27-3','4-10','11-17','18-24','25-31'];
	const monthlyLabels = ["November",
						  "December",
						  "January",
						  "Febraury",
						  "March",
						  "April",
						  "May",
						  "June",
						  "July",
						  "August",
						  "September",
						  "October"];
	// generate 1 days worth of hourly data
	const hourData = randomArray(24, 0, 18);
	// generate 364 days worth of random data, will add random oneWeekData for last 7 days
	const yearData = randomArray(358, 0, 375);

	// ************* global settings
	Chart.defaults.global.defaultFontColor = "#a4a4a4";
	
	
	
	// ************* Chart specific functions
	
	// create a single random integer in between maxRange and minRange
	function randomNum(minRange, maxRange) {
		const random =   Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
		return random;
	}
	
	// create an array of random integers
	function randomArray(iterations, minRange, maxRange) {
		const random = [];
		for (let i = 0; i < iterations; i++) {
			random.push(randomNum(minRange, maxRange));
		}
		return random;
	}
	
	// populate labels variables
	function fillLabels() {
		for (let i = 1; i < 12; i++) {
			hourlyLabels.push(i + ":00pm");
		}
		for (let i = 25; i <= 31; i++) {
			oneWeekLabels.push(i);
		}
	}
	
	
	// find the sum of an array of integers
	function addArray(numbers) {
		let sum = 0;
		for (let number of numbers) {
			sum += number;
		}
		return sum;
	}
	
	// make a subset of iterations number of items 
	function arraySubset(array, iterations, numberFromEnd = 0) {
		const end = array.length - numberFromEnd;
		const start = end - iterations;
		const sub = array.slice(start, end);
		return sub;
	}
	
	// get weekly data out of yearly by grabbing 7 days at a time and adding them
	function getWeekly(numberOfWeeks) {
		const weekly = [];
		
		for (let i = 0; i < numberOfWeeks; i++) {
			const days = arraySubset(yearData, 7, (i * 7));
			weekly.unshift(addArray(days));
		}
		return weekly;
	}
	
	function getMonthly(numberOfMonths) {
		const month = [];
		
		for (let i = 0; i < numberOfMonths; i++) {
			const days = arraySubset(yearData, 30, (i * 30));
			month.unshift(addArray(days));
		}
		return month;
	}
	
	// change data in traffic chart depending on which button is pressed
	function changeTraffic(period) {
		if (period.toLowerCase() === 'hourly') {
			updateTraffic(hourlyLabels, hourData, 35);
		} else if (period.toLowerCase() === 'daily') {
			updateTraffic(oneWeekLabels, oneWeekData, 250);
		} else if (period.toLowerCase() === 'weekly') {
			updateTraffic(weeklyLabels, weeklyData, 2500);
		} else if (period.toLowerCase() === 'monthly') {
			updateTraffic(monthlyLabels, monthlyData, 8000);
		}
	}
	
	function updateTraffic(labels, data, max) {
		trafficLine.data.labels = labels;
		trafficLine.data.datasets[0].data = data;
//		trafficLine.options.scales.yAxes[0].ticks.max = max;
		trafficLine.update();
	}
	
	

	
	// generate 1 week of data (including hour data)
	const oneWeekData = randomArray(6,50,250);
	oneWeekData.push(addArray(hourData));
	
	
		// add data from oneWeekData to end of yearData
	for (let day of oneWeekData) {
		yearData.push(day);
	}
	
	const weeklyData = getWeekly(12);
	const monthlyData = getMonthly(12);
	
	const mobileData = [
					randomNum(2000, 6000),
					randomNum(2000, 6000),
					randomNum(4000, 25000) // ensure desktop number remains larger
	];
	fillLabels();
	
	
	
	
	const trafficLine = new Chart(ctx, {
		type: "line",
		data: {
			datasets: [{
				data: weeklyData,

				backgroundColor: ['rgba(115, 119, 191, .2)'],
				borderColor: ['#7477BF'],
				borderWidth: 1,
				pointRadius: 6,
				pointBorderWidth: 2,
				pointBackgroundColor: '#fff'
			}],
				labels: weeklyLabels,
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
//						max: 2500
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
				data: oneWeekData,
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
				data: mobileData,
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
	

	// ************* Chart event listeners

	trafficUL.addEventListener('click', function (e) {
		const selected = trafficUL.querySelector(".selected");
		const pressed = e.target;
		if (pressed !== selected) {
			selected.classList.remove("selected");
			e.target.classList.add("selected");
			changeTraffic(e.target.textContent);
		}

	 });

// ************************************************************
//				Members
// ************************************************************

	// =========== variables
	const members = [];
	const membersUL = document.getElementById("members");
	const recentUL = document.getElementById("recent");
	const imgURL = "./images/";
	
	
	// =========== constructors
	function Member(name, pic, email, date, activity, time) {
		/*jshint validthis: true */
		this.fullName = name;
		this.avatar = pic;
		this.email = email;
		this.joinDate = date;
		this.recentActivity = activity;
		this.lastOn = time;
	}
	
	// ============ functions
	
	function createMemberArray (name, pic, email, date, activity, time) {
		const member = new Member(name, pic, email, date, activity, time);
		members.push(member);
	}
	
	function createMemberArea () {
		for (let member of members) {
			const infoUL = createElement("ul", "social__stats");
//			const 
			infoUL.appendChild(createLI("", member.fullName));
			
			membersUL.appendChild(createProfileLI(member.avatar));	
			membersUL.appendChild(infoUL);
			
		}
	}
	
	function createProfileLI(img) {
		const profileLI = createLI("");
		const profileImg = createElement("img", "img--profile");
		profileImg.setAttribute("src", imgURL + img + ".jpg");
		profileLI.appendChild(profileImg);
		return profileLI;
	}
	
	function createLI (className, text = "") {
		const li = createElement("li", className, text);

		return li;
	}
	
	function createElement (type, className, text = "") {
		const el = document.createElement(type);
		if (className !== "") {
			el.classList.add(className);
		}
		if (text) {
			el.textContent = text;
		}
		return el;
	}
	
	// ============ main
	
	createMemberArray("Victoria Chambers", "65", "victoria.chambers80@example.com", "10/15/2017", "commented on YourApp's SEO Tips", "4 hours");
	createMemberArray("Dale Byrd", "78", "dale.byrd52@example.com", "10/14/2017", "liked the Facebook's Changes for 2017", "5 hours");
	
	createMemberArea();
});









