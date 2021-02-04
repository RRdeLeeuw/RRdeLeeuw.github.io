// Menu link items
const menuLink1 = document.querySelector("#menuLink1");
const menuLink2 = document.querySelector("#menuLink2");
const menuLink3 = document.querySelector("#menuLink3");
const menuLink4 = document.querySelector("#menuLink4");

// For the dropdown menu links
const menuDropdown = document.querySelector("#menuDropdown");
menuDropdown.classList.add("menuDropdown");

const dropdownLink1 = document.querySelector("#menuDropdown li:nth-of-type(1)");
const dropdownLink2 = document.querySelector("#menuDropdown li:nth-of-type(2)");
const dropdownLink3 = document.querySelector("#menuDropdown li:nth-of-type(3)");
const dropdownLink4 = document.querySelector("#menuDropdown li:nth-of-type(4)");
const dropdownLink5 = document.querySelector("#menuDropdown li:nth-of-type(5)");

// The footer links:
const footerLink1 = document.querySelector("#footerLink1");

// All pages object:
const pages = [
  {
    name: "index",
    location: document.querySelector("#index"),
  },
  {
    name: "calendar",
    location: document.querySelector("#calendar"),
  },
  {
    name: "todolist",
    location: document.querySelector("#todolistContainer"),
  },
  {
    name: "construction",
    location: document.querySelector("#construction"),
  },
  {
    name: "credits",
    location: document.querySelector("#credits"),
  },
  {
    name: "addevent",
    location: document.querySelector("#addevent"),
  },
  {
    name: "viewevent",
    location: document.querySelector("#viewevent"),
  },
];

// Load just the index page:
setActiveDisplay("index");

// Adding click event handlers for the menu links
menuLink1.addEventListener("click", () => {
  setActiveDisplay("index");
});

menuLink2.addEventListener("click", () => {
  setActiveDisplay("about");
});

menuLink3.addEventListener("click", () => {
  setActiveDisplay("projects");
});

menuLink4.addEventListener("click", () => {
  setActiveDisplay("contact");
});

// Create mouseover event for the dropdown menu:
menuLink3.addEventListener("mouseover", () => {
  menuDropdown.classList.add("show");
});
menuLink3.addEventListener("mouseout", () => {
  menuDropdown.classList.remove("show");
});

// Set links for the dropdown menu:
dropdownLink1.addEventListener("click", (e) => {
  e.stopPropagation();
  setActiveDisplay("calendar");
});
dropdownLink2.addEventListener("click", (e) => {
  e.stopPropagation();
  setActiveDisplay("todolist");
});

// Footer links
footerLink1.addEventListener("click", () => {
  setActiveDisplay("credits");
  console.log("footer clicked");
});

// Function to render the requested page
function setActiveDisplay(pageName, hideOthersBool = true) {
  if (hideOthersBool) {
    for (let page of pages) {
      page.location.style.display = "none";
    }
  }
  try {
    pages.filter((page) => page.name === pageName)[0].location.style.display =
      "block";
  } catch {
    for (let page of pages) {
      page.location.style.display = "none";
    }
    pages.filter(
      (page) => page.name === "construction"
    )[0].location.style.display = "block";
  }
}
