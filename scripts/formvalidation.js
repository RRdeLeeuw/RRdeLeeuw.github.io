function validateForm(form) {
  console.log("validate form function called.");
  console.dir(form[2].value);
  let dateField = form[0];
  let timeField = form[1];
  let titleField = form[2];
  let descriptionField = form[3];
  let bool = true;
  if (!dateField.value) {
    dateField.classList.add("invalid");
    bool = false;
  } else {
    dateField.classList.remove("invalid");
  }
  if (!timeField.value) {
    timeField.classList.add("invalid");
    bool = false;
  } else {
    timeField.classList.remove("invalid");
  }
  if (!titleField.value.trim()) {
    titleField.classList.add("invalid");
    bool = false;
  } else {
    titleField.classList.remove("invalid");
  }
  if (!descriptionField.value.trim()) {
    descriptionField.classList.add("invalid");
    bool = false;
  } else {
    descriptionField.classList.remove("invalid");
  }
  return bool;
}
