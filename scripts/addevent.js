const addEventCancel = document.querySelector("#addEventCancel");
const addEventSubmitButton = document.querySelector("#addEventSubmitButton");
const form = document.querySelector("#addEventForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

addEventCancel.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  setActiveDisplay("calendar");
});

document.querySelector("#blackout").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#blackout")) {
    setActiveDisplay("calendar");
  }
});

addEventSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let dateInput = document.querySelector("#id_date");
  let timeInput = document.querySelector("#timeInput");
  let titleInput = document.querySelector("#titleInput");
  let descriptionInput = document.querySelector("#descriptionInput");
  let date = DateTime.fromISO(dateInput.value);
  if (
    dateInput.value !== "" &&
    timeInput.value !== "" &&
    titleInput.value !== "" &&
    descriptionInput.value !== ""
  ) {
    events.push(
      new Event(
        idCounter,
        date,
        timeInput.value,
        titleInput.value,
        descriptionInput.value
      )
    );
    renderCalendar();
    fetchevents(globalMonth, globalYear);
    setActiveDisplay("calendar");
    dateInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";
    timeInput.value = "";
  }
});
