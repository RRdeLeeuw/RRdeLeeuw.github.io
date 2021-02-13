// Menu link items
const menuLink1 = document.querySelector('#menuLink1');
const menuLink2 = document.querySelector('#menuLink2');
const menuLink3 = document.querySelector('#menuLink3');
const menuLink4 = document.querySelector('#menuLink4');

// For the dropdown menu links
const menuDropdown = document.querySelector('#menuDropdown');
menuDropdown.classList.add('menuDropdown');

const dropdownLink1 = document.querySelector('#menuDropdown li:nth-of-type(1)');
const dropdownLink2 = document.querySelector('#menuDropdown li:nth-of-type(2)');
const dropdownLink3 = document.querySelector('#menuDropdown li:nth-of-type(3)');
const dropdownLink4 = document.querySelector('#menuDropdown li:nth-of-type(4)');
const dropdownLink5 = document.querySelector('#menuDropdown li:nth-of-type(5)');

// The footer links:
const footerLink1 = document.querySelector('#footerLink1');

async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}

// this is your `load_home() function`
async function loadPage(pageName = 'construction') {
	const main = document.getElementById('main');
	const content = await fetchHtmlAsText(`${pageName}.html`);
	if (pageName === 'viewevent' || pageName === 'addevent') {
		main.innerHTML += content;
	} else {
		main.innerHTML = content;
	}
	switch (pageName) {
		case 'calendar':
			renderCalendar();
			fetchevents();
			break;
		case 'todolist':
			loadTodoList();
			break;
		case 'formvalidation':
			activateForm();
			break;
		case 'viewevent':
			loadViewEventPage();
			break;
		case 'addevent':
			loadAddEventForm();
			break;
	}
	return true;
}

// Adding click event handlers for the menu links
menuLink1.addEventListener('click', () => {
	loadPage('home');
});

menuLink2.addEventListener('click', () => {
	loadPage();
});

menuLink3.addEventListener('click', () => {
	loadPage();
});

menuLink4.addEventListener('click', () => {
	loadPage();
});

// Create mouseover event for the dropdown menu:
menuLink3.addEventListener('mouseover', () => {
	menuDropdown.classList.add('show');
});
menuLink3.addEventListener('mouseout', () => {
	menuDropdown.classList.remove('show');
});

// Set links for the dropdown menu:
dropdownLink1.addEventListener('click', async (e) => {
	e.stopPropagation();
	await loadPage('calendar');
});

dropdownLink2.addEventListener('click', async (e) => {
	e.stopPropagation();
	await loadPage('todolist');
});

dropdownLink4.addEventListener('click', async (e) => {
	e.stopPropagation();
	await loadPage('designs');
});

dropdownLink5.addEventListener('click', async (e) => {
	e.stopPropagation();
	await loadPage('formvalidation');
});

// Footer links
footerLink1.addEventListener('click', () => {
	loadPage('credits');
});
