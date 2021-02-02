var DateTime = luxon.DateTime;
currentDate = DateTime.local();
globalMonth = currentDate.month;
globalYear = currentDate.year;
var globaltest;

document.addEventListener('DOMContentLoaded', function () {
    // Render the initial calendar
    renderCalendar(currentDate.month, currentDate.year);
    fetchevents(currentDate.month, currentDate.year);
});

// Functions to set values from selectboxes
function setMonth(month) {
    globalMonth = month;
    renderCalendar();
    fetchevents(globalMonth, globalYear);
}
function setYear(year) {
    globalYear = year;
    renderCalendar();
    fetchevents(globalMonth, globalYear);
}

// function that gets event from api
function fetchevents(month, year) {
    fetch('/eventsapi', {
        method: 'POST',
        body: JSON.stringify({
            month: month,
            year: year,
        })
    })
        .then(response => response.json())
        .then(events => {
            if (events.hasOwnProperty('message')) {
                console.log(events.message)
                return
            }
            events.forEach(function (event) {
                var day = Number(event.date.slice(8));
                const element = document.createElement('div');
                element.setAttribute('class', 'calendar_event');
                element.innerHTML += event['title'];
                element.addEventListener('click', () => { view_event(event.id) });
                hover(element, 'calendarevent_hover');
                document.querySelector(`#day${day}`).append(element);
            });
        });
};

function hover(element, classname) {
    element.addEventListener('mouseenter', e => element.classList.add(classname))
    element.addEventListener('mouseleave', e => element.classList.remove(classname))
}

// Function for viewing a calendar event
function view_event(event_id) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = '/viewevent';
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'eventid';
    input.value = event_id;
    form.appendChild(input);
    form.submit();
}

// Deze functie wil ik nog gaan gebruiken om de datum mee te sturen
// zodat deze gerendered kan worden in de add-event pagina.
function add_event(date) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'get';
    form.action = '/addevent.html';
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'date';
    input.value = date;
    form.appendChild(input);
    form.submit();
}

// Function for rendering the calendar
function renderCalendar() {
    // Create the month select dropdown
    var options = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    };
    var select = document.querySelector('#monthselector');
    for (option in options) {
        select.options[select.options.length] = new Option(options[option], option);
    }
    // Create the year select dropdown
    var options = {};
    var startyear = 1990;
    var numberofyears = 40;
    for (var i = 0; i <= numberofyears; i++) {
        options[startyear] = startyear;
        startyear += 1;
    }
    var select = document.querySelector('#yearselector');
    for (option in options) {
        select.options[select.options.length] = new Option(options[option], option);
    }
    // Select the current year and make that option the selected option.
    for (var i = 0, len = select.options.length; i < len; i++) {
        value = select.options[i].value;
        if (value == currentDate.year) {
            break;
        }
    }
    select.options[i].setAttribute("selected", "true")
    // Define variables
    firstdateofmonth = DateTime.fromObject({ day: 1, month: globalMonth, year: globalYear });
    firstdayofmonth = firstdateofmonth.toFormat('E');
    daysinmonth = DateTime.fromObject({ month: globalMonth, year: globalYear }).daysInMonth
    intday = parseInt(firstdayofmonth);

    const calendar = document.querySelector('#days');
    // Empty the div to render new calendar
    calendar.innerHTML = '';
    // Create the left over days from previous months
    var y = 0;
    while (y < intday - 1) {
        const newday = document.createElement('div');
        newday.setAttribute("class", "othermonth");
        newday.innerHTML = '';
        calendar.append(newday);
        y += 1;
    }
    // Create the days of current month
    var i;
    date = firstdateofmonth;
    for (i = 0; i < daysinmonth; i++) {
        const newday = document.createElement('div');
        const dateelement = document.createElement('div');
        dateelement.innerHTML = `<span>${date.day}</span>`;
        dateelement.setAttribute('class', 'datenumberdiv');
        newday.append(dateelement);
        newday.setAttribute("id", `day${date.day}`);
        newday.setAttribute("class", "currentmonth");
        newday.setAttribute("data-date", `${date.toFormat('yyyy-LL-dd')}`)
        newday.addEventListener('click', function (e) {
            var senderelement = e.target;
            if (senderelement === newday || senderelement === dateelement || senderelement === dateelement.firstChild) {
                add_event(newday.dataset.date);
            }
        })
        if (date.day == currentDate.day && date.month == currentDate.month && date.year == currentDate.year) {
            dateelement.setAttribute('class', 'datenumberdiv today');
        }
        calendar.append(newday);
        date = date.plus({ days: 1 });
    };
    // Create the leftover days from this month
    leftover = (7 - ((y + i) % 7)) % 7
    if (leftover != 0) {
        var x = 0;
        for (x = 0; x < leftover; x++) {
            const newday = document.createElement('div');
            newday.setAttribute("class", "othermonth");
            newday.innerHTML = '';
            calendar.append(newday);
        }
    }
};

function delete_event(eventid) {
    fetch('/delete_event', {
        method: 'POST',
        body: JSON.stringify({
            'eventid': eventid,
        })
    })
        .then(response => response.json())
        .then(message => {
            if (message.hasOwnProperty('succes')) {
                console.log(message['succes']);
                window.location.replace("/calendar");
                return
            }
            else if (message.hasOwnProperty('error')) {
                console.log(message['error'])
                return
            }
        });
};