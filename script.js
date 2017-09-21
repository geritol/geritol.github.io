'use strict'

function toggle(selector, event){
	// toggle the visibility of the element specified
	let element = document.querySelector(selector)
	let currenDisplay = window.getComputedStyle(element).visibility
	let isShown = !!element.style.maxHeight
	element.style.maxHeight = isShown ? null : element.scrollHeight + "px"
	// toggle event targets's innerHtml
	let btn = event.target.tagName === 'I' ? event.path[1] : event.target
	btn.innerHTML = isShown ? '<i class="fa fa-chevron-down" aria-hidden="true"></i> More!' : '<i class="fa fa-chevron-up" aria-hidden="true"></i> Less!'
}
