function loadAddEventForm() {
  const addEventCancel = document.querySelector("#addEventCancel");
  const addEventSubmitButton = document.querySelector("#addEventSubmitButton");
  const form = document.querySelector("#addEventForm");

  let dateInput = document.querySelector("#id_date");
  let timeInput = document.querySelector("#timeInput");
  let titleInput = document.querySelector("#titleInput");
  let descriptionInput = document.querySelector("#descriptionInput");

  let validedOnce = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  addEventCancel.addEventListener("click", (e) => {
    loadPage("calendar");
  });

  document.querySelector("#blackout").addEventListener("click", (e) => {
    if (e.target === document.querySelector("#blackout")) {
      loadPage("calendar");
    }
  });

  addEventSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let form = document.querySelector("#addEventForm");
    let date = DateTime.fromISO(dateInput.value);

    if (validateForm(form)) {
      events.push(
        new Event(
          idCounter,
          date,
          timeInput.value,
          titleInput.value,
          descriptionInput.value
        )
      );
      loadPage("calendar");
      idCounter++;
    } else {
      if (!validedOnce) {
        let div = document.createElement("div");
        div.setAttribute("id", "invalidFormDiv");
        div.innerText = "Please fill out all fields";
        addEventSubmitButton.after(div);
        validedOnce = true;
      }
    }
  });
}
