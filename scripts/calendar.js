var DateTime = luxon.DateTime;
currentDate = DateTime.local();
globalMonth = currentDate.month;
globalYear = currentDate.year;
var globaltest;
idCounter = 5;

class Event {
  constructor(id, date, time, title, description) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.title = title;
    this.description = description;
  }
}

const events = [];

events.push(
  new Event(
    1,
    currentDate.set({ day: 2 }),
    "11:30",
    "Meeting with John",
    "Meeting up with John to discuss the new client."
  )
);
events.push(
  new Event(
    2,
    currentDate.set({ day: 6 }),
    "09:00",
    "Work event",
    "Major event on new website that is being launched. Break-out rooms with different customers."
  )
);
events.push(
  new Event(
    3,
    currentDate.set({ day: 12 }),
    "10:45",
    "Zoom-call with Stef",
    "Zoom-call with Joe to discuss new projects that we can work on together."
  )
);
events.push(
  new Event(
    4,
    currentDate.set({ day: 17 }),
    "14:30",
    "Coffee with Iris",
    "We agreed to meet up at that new place around the corner."
  )
);

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
  events.forEach(function (event) {
    if (
      event.date.month === parseInt(globalMonth) &&
      event.date.year === parseInt(globalYear)
    ) {
      let day = event.date.day;
      const element = document.createElement("div");
      element.setAttribute("class", "calendar_event");
      element.innerHTML += event["title"];
      element.addEventListener("click", () => {
        view_event(event.id);
        console.log("Event id:", event.id);
      });
      document.querySelector(`#day${day}`).append(element);
    }
  });
}

// Function for viewing a calendar event
async function view_event(event_id) {
  await loadPage("viewevent");
  const event = events.find((element) => element.id === event_id);
  document.querySelector("#dateField").innerText = event.date.toLocaleString(
    DateTime.DATE_MED
  );
  document.querySelector("#timeField").innerText = event.time;
  document.querySelector("#titleField").innerText = event.title;
  document.querySelector("#descriptionField").innerText = event.description;
}

// Deze functie wil ik nog gaan gebruiken om de datum mee te sturen
// zodat deze gerendered kan worden in de add-event pagina.
async function add_event(date) {
  await loadPage("addevent");
  document.querySelector("#id_date").value = date;
}

// Function for rendering the calendar
function renderCalendar() {
  // Create the month select dropdown
  var options = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  var select = document.querySelector("#monthselector");
  for (option in options) {
    if (parseInt(option) === globalMonth) {
      select.options[select.options.length] = new Option(
        options[option],
        option,
        true,
        true
      );
    } else {
      select.options[select.options.length] = new Option(
        options[option],
        option
      );
    }
  }
  // Create the year select dropdown
  var options = {};
  var startyear = 1990;
  var numberofyears = 40;
  for (var i = 0; i <= numberofyears; i++) {
    options[startyear] = startyear;
    startyear += 1;
  }
  var select = document.querySelector("#yearselector");
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
  select.options[i].setAttribute("selected", "true");
  // Define variables
  firstdateofmonth = DateTime.fromObject({
    day: 1,
    month: globalMonth,
    year: globalYear,
  });
  firstdayofmonth = firstdateofmonth.toFormat("E");
  daysinmonth = DateTime.fromObject({ month: globalMonth, year: globalYear })
    .daysInMonth;
  intday = parseInt(firstdayofmonth);

  const calendar = document.querySelector("#days");
  // Empty the div to render new calendar
  calendar.innerHTML = "";
  // Create the left over days from previous months
  var y = 0;
  while (y < intday - 1) {
    const newday = document.createElement("div");
    newday.setAttribute("class", "othermonth");
    newday.innerHTML = "";
    calendar.append(newday);
    y += 1;
  }
  // Create the days of current month
  var i;
  date = firstdateofmonth;
  for (i = 0; i < daysinmonth; i++) {
    const newday = document.createElement("div");
    const dateelement = document.createElement("div");
    dateelement.innerHTML = `<span>${date.day}</span>`;
    dateelement.setAttribute("class", "datenumberdiv");
    newday.append(dateelement);
    newday.setAttribute("id", `day${date.day}`);
    newday.setAttribute("class", "currentmonth");
    newday.setAttribute("data-date", `${date.toFormat("yyyy-LL-dd")}`);
    newday.addEventListener("click", function (e) {
      var senderelement = e.target;
      if (
        senderelement === newday ||
        senderelement === dateelement ||
        senderelement === dateelement.firstChild
      ) {
        add_event(newday.dataset.date);
      }
    });
    if (
      date.day == currentDate.day &&
      date.month == currentDate.month &&
      date.year == currentDate.year
    ) {
      dateelement.setAttribute("class", "datenumberdiv today");
    }
    calendar.append(newday);
    date = date.plus({ days: 1 });
  }
  // Create the leftover days from this month
  leftover = (7 - ((y + i) % 7)) % 7;
  if (leftover != 0) {
    var x = 0;
    for (x = 0; x < leftover; x++) {
      const newday = document.createElement("div");
      newday.setAttribute("class", "othermonth");
      newday.innerHTML = "";
      calendar.append(newday);
    }
  }
}
