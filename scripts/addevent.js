const addEventCancel = document.querySelector("#addEventCancel");
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
