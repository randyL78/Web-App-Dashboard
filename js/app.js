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
		navDropdown.classList.add(hideClass);
		navOpen = false;
		navBar.style.width = "25px";
	}
	
	function openNav() {
		navOpen = true;
		navDropdown.classList.remove(hideClass);	
		navBar.style.width = "100px";
	}
	
		// navigation functions for large screens
	function navViewLarge() {
		navClose.style.display = "none";	
		navBar.style.width = "100px";
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
	
	navClose.addEventListener('click', function (e) {
		e.preventDefault();
		navArrow();
	});

	// if nav dropdown is open in smal screen, collapse it before resizing
	window.addEventListener('resize', function () {
		const size = viewSize();
		if (size === "small") {
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


	const ctx = document.getElementById("myChart").getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
});