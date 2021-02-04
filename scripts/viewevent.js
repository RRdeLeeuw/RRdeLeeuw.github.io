const viewEventClose = document.querySelector("#viewEventClose");

viewEventClose.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  setActiveDisplay("calendar");
});

document.querySelector("#blackoutviewEvent").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#blackoutviewEvent")) {
    setActiveDisplay("calendar");
  }
});
