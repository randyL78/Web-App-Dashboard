/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
	"use strict";
	// ************************************************************
	//				Non Specific Function
	// ************************************************************	
	
	// create an li element
	function createLI (className, text = "") {
		const li = createElement("li", className, text);

		return li;
	}
	
	// create any type of html element
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
	
	// Get top, botom, left or right position of an element
	function getPosition(element, position) {
		return (element.getBoundingClientRect()[position]);
	}
	
	// Get height or width of an element as a number
	function getDimension(element, dimension) {
		let elemHeight = window.getComputedStyle(element).getPropertyValue(dimension);
		elemHeight = elemHeight.replace("px", "");
		return(elemHeight);
	}
	
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
	//				Alerts
	// ************************************************************

	// ************* variables
	const alertUL = document.querySelector(".alert");
	const alertIcon = document.querySelector("#alert");
	// ************* functions
	function createAlerts(alert) {
		const alertLI = createLI("alert__item", "");
		const alertH = createElement("p", "alert--flex2", "");
		alertH.innerHTML = "<strong>Alert</strong> " + alert;
		alertLI.appendChild(alertH);
		alertLI.appendChild(createElement("div", "btn--alert", "x" ));
		alertUL.appendChild(alertLI);
	}
		
	// ************* main
	createAlerts("You have 16 unread emails");
	createAlerts("The CEO wants to see you ASAP");
	createAlerts("You have 4 bills to pay");

	
	// ************* event listeners
	alertUL.addEventListener('click', function (e) {
		const close = e.target;
		if (close.classList.contains("btn--alert")) {
			close.parentElement.style.display = "none";
		} 
	});	
	
	alertIcon.addEventListener('click', function () {
		const alerts = document.querySelectorAll(".alert__item");
		try {			// IE and Edge don't support for...of loops
			for (let alert of alerts) {
				if (alert) {
					alert.style.display = "flex";
				}
			}
		}
		catch(err) {	// falback for IE and Edge
			for (let i = 0; i < alerts.length; i++) {
				const alert = alerts[i];
				if (alert) {
					alert.style.display = "flex";
				}	
			}
		}
		
	});
	
	// ************************************************************
	//				Modal
	// ************************************************************
	const overlay = document.querySelector(".overlay");
	const modalClose = document.querySelector(".btn--modal");
	const modalHeadline = overlay.querySelector("h2");
	const modalText = overlay.querySelector("p");
	modalClose.addEventListener('click', function() {
		overlay.style.display = "none";
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
	

	// ========== Chart event listeners

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
			if (member.joinDate) {
				const memberUL = createElement("ul", "members__item");
				const infoLI = createLI("member__item--flex2", "");
				const infoUL = createElement("ul", "members__stats");
				const emailLi = createLI("", "");
				const emailA = createElement("a", "link", member.email);
				emailA.setAttribute('href', "mailto:" + member.email);
				infoUL.appendChild(createLI("", member.fullName));
				emailLi.appendChild(emailA);
				infoUL.appendChild(emailLi);
				infoLI.appendChild(infoUL);

				memberUL.appendChild(createProfileLI(member.avatar));	
				memberUL.appendChild(infoLI);
				memberUL.appendChild(createLI("", member.joinDate));	
				membersUL.appendChild(memberUL);	
			}
		}
	}
	
	function createRecentArea () {
		for (let member of members) {
			if (member.recentActivity) {
				const memberUL = createElement("ul", "members__item");
				const infoLI = createLI("member__item--flex2", "");
				const infoUL = createElement("ul", "members__stats");
				const commentLI = createLI("","");
				commentLI.appendChild(createElement("p", "", member.fullName + " " + member.recentActivity));
				infoUL.appendChild(commentLI);
				infoUL.appendChild(createLI("", member.lastOn + " ago"));
				infoLI.appendChild(infoUL);

				memberUL.appendChild(createProfileLI(member.avatar));	
				memberUL.appendChild(infoLI);

				recentUL.appendChild(memberUL);	
			}
		}
	}
	
	function createProfileLI(img) {
		const profileLI = createLI("");
		const profileImg = createElement("img", "img--profile");
		profileImg.setAttribute("src", imgURL + img + ".jpg");
		profileLI.appendChild(profileImg);
		return profileLI;
	}
	

	
	// ============ main
	
	createMemberArray("Alexandra Breckinridge", "", "lexi.breckinridge91@example.com", "", "", "");
	createMemberArray("Dale Byrd", "78", "dale.byrd52@example.com", "10/14/2017", "liked the Facebook's Changes for 2017", "5 hours");
	createMemberArray("Dan Oliver", "43", "dan.oliver82@example.com", "10/13/2017", "posted YourApp's SEO Tips", "1 day");
	createMemberArray("Dawn Wood", "63", "dawn.wood16@example.com", "10/14/2017", "commented on Facebook's Changes for 2017", "5 hours");
	createMemberArray("Dennis Patrizio", "", "dennis.patrizio67@example.com", "", "", "");
	createMemberArray("Elizabeth Jackson", "", "liz.jackson1986@example.com", "", "", "");
	createMemberArray("Ishmael Natu", "", "ishmael.natu@example.com", "", "", "");
	createMemberArray("John Iris", "", "john.iris94@example.com", "", "", "");
	createMemberArray("Victoria Chambers", "65", "victoria.chambers@example.com", "10/15/2017", "commented on YourApp's SEO Tips", "4 hours");
	createMemberArray("Wolford Brock", "", "wolford.brock.53@example.com", "", "", "");
	createMemberArea();
	createRecentArea();
	

// ************************************************************
//				Messages
// ************************************************************	
	// ============ Variables
	const messageSearch = document.getElementById("search--message");
	const messageSend = document.getElementById("btn--send-message");
	const dropdown = document.getElementById("search__dropdown");
	let focused = false;  // use to prevent dropdown from disappearing if focus switched from searchbox to dropdown
	
	// ============ Functions
	function populateDropdown() {
		let i = 0;
		for (let member of members) {
			if (member.email) {
				const msg = member.fullName + " " + member.email;
				const memberLI = createLI("dropdown__item", msg);
				memberLI.setAttribute("data--value", member.fullName);
				memberLI.setAttribute("tabindex", i);				
				dropdown.appendChild(memberLI);
				i++;
			}
		}
	}
	
	// compute where to put dropdown after list items are added
	function placeDropdown() {
		const baseY = getPosition(dropdown.parentElement.parentElement, "top");
		let offsetY = getPosition(messageSearch, "bottom");
		dropdown.style.top = offsetY - baseY + "px";			
	}
	
	// ============ Main
	populateDropdown();
	const searchItems = dropdown.querySelectorAll("li");
	
	// ============ Event Listeners
	messageSearch.addEventListener('keyup', function (e) {
		console.log(e.keyCode);
		focused = true;
		if (messageSearch.value.length > 0) {
			dropdown.style.display = "flex";
			const searchFilter = messageSearch.value.toLowerCase();
			for (let searchItem of searchItems) {
				const value = searchItem.textContent.toLowerCase();
				if (value.indexOf(searchFilter) > -1) {
					searchItem.style.display = "";
				} else {
					searchItem.style.display = "none";				
				}
			}
			placeDropdown();
			
		} else {
			dropdown.style.display = "none";			
		}
	});
	window.addEventListener('click', function (e) {
		if (e.target !== messageSearch) {
			dropdown.style.display = "none";	
			focused = false;
		}
	});
	

	
	dropdown.addEventListener('click', function(e) {
	const target = e.target;
		if (target.tagName === "LI") {
			messageSearch.value = target.getAttribute("data--value");
		}
	
	});
	
	messageSend.addEventListener('click', function(e) {
		e.preventDefault();
		const message = document.getElementById("area--message");
		modalHeadline.classList.remove("warning");
		modalHeadline.classList.remove("success");	
		if (messageSearch.value === "") {  
			modalHeadline.textContent = "Warning!";
			modalHeadline.classList.add("warning");
			modalText.textContent = "No name was selected.";
			overlay.style.display = "block";
		} else if (!message.value) { 
			modalHeadline.textContent = "Warning!";
			modalHeadline.classList.add("warning");
			modalText.textContent = "You must have a message.";
			overlay.style.display = "block";		
		} else {
			let valid = false;
			for (let member of members) {
				if (member.fullName === messageSearch.value) {
					valid = true;
					break;
				}
				
				}
				if (valid === false) {
					modalHeadline.textContent = "Warning!";
					modalHeadline.classList.add("warning");
					modalText.textContent = "No such member.";
					overlay.style.display = "block";
				} else {
					modalHeadline.textContent = "Success!";
					modalHeadline.classList.add("success");
					modalText.textContent = "Message successfully sent to " +
											messageSearch.value +
											".";
					overlay.style.display = "block";
			}
		}
	});


// ************************************************************
//				Settings
// ************************************************************
	const saveButton = document.getElementById("btn--save");
	const resetButton = document.getElementById("btn--reset");
	const toggleEmail = document.getElementById("toggleEmail");
	const toggleProfile = document.getElementById("toggleProfile");
	const timezone = document.getElementById("timezone");
	
	function canStore() {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch(e) {
			return false;	
		}
	}
	
	
	saveButton.addEventListener('click', function() {
		modalHeadline.classList.remove("warning");
		modalHeadline.classList.remove("success");	
		if (canStore) {
			localStorage.setItem(toggleEmail.getAttribute("id"), toggleEmail.checked);
			localStorage.setItem(toggleProfile.getAttribute("id"), toggleProfile.checked);
			localStorage.setItem(timezone.getAttribute("id"), timezone.value);
			modalHeadline.textContent = "Success!";
			modalHeadline.classList.add("succcess");
			modalText.textContent = "Your settings have been saved.";
			overlay.style.display = "block";	

		} else {
			modalHeadline.textContent = "Warning!";
			modalHeadline.classList.add("warning");
			modalText.textContent = "This browser does not support local storage.";
			overlay.style.display = "block";	
		}
		
	});
	resetButton.addEventListener('click', function() {
		modalHeadline.classList.remove("warning");
		modalHeadline.classList.remove("success");	
		toggleEmail.checked = false;
		toggleProfile.checked = false;
		timezone.value = "";
		if (canStore) {
			localStorage.clear();
		}
			modalHeadline.textContent = "Success!";
			modalHeadline.classList.add("success");
			modalText.textContent = "Your settings have been reset.";
			overlay.style.display = "block";	

	});
	
	if (canStore) {
		try {
		let emailSet = localStorage.getItem(toggleEmail.getAttribute("id"));
		if (emailSet === "true") {
			toggleEmail.checked = true;		
		} else {
			toggleEmail.checked = false;
		}
		let profileSet = localStorage.getItem(toggleProfile.getAttribute("id"));
		if (profileSet === "true") {
			toggleProfile.checked = true;		
		} else {
			toggleProfile.checked = false;
		}	
		timezone.value = localStorage.getItem(timezone.getAttribute("id"));	
		} catch(e) {
			console.log("no local storage set");
		}
	}

});		











