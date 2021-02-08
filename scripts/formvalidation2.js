let usernameField;
let emailField;
let passwordField;
let confirmPasswordField;
let signupForm;

const activateForm = () => {
  usernameField = document.querySelector("#username");
  emailField = document.querySelector("#email");
  passwordField = document.querySelector("#password");
  confirmPasswordField = document.querySelector("#confirm-password");
  signupForm = document.querySelector("#signup");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPasswordValid = checkPassword(),
      isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;

    if (isFormValid) {
      console.log("Form is validaded, and is correct.");
    } else {
      addInstandFeedback();
    }
  });
};

// Helper functions
const isEmpty = (value) => (value === "" ? true : false);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isStrongPassword = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

// Functions that add the error or succes message and class
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("succes");
  formField.classList.add("error");
  const errorMessage = formField.querySelector("div");
  errorMessage.innerText = message;
};

const showSucces = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("succes");
  const succesMessage = formField.querySelector("div");
  succesMessage.innerText = "";
};

const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameField.value.trim();
  if (isEmpty(username)) {
    showError(usernameField, "Please enter a username.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameField,
      `Username should be betweem ${min} and ${max} characters.`
    );
  } else {
    showSucces(usernameField);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailField.value.trim();
  if (isEmpty(email)) {
    showError(emailField, "Please enter an emailaddress.");
  } else if (!isValidEmail(email)) {
    showError(emailField, "Please enter a valid e-mail.");
  } else {
    showSucces(emailField);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = passwordField.value.trim();
  if (isEmpty(passwordField)) {
    showError(passwordField, "Please enter a password.");
  } else if (!isStrongPassword(password)) {
    showError(
      passwordField,
      "Password does not match criteria: minimum 8 characters, 1 lower- and uppercase character, a number and a special character (!@#$%^&*)"
    );
  } else {
    showSucces(passwordField);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordField.value.trim();
  const password = passwordField.value.trim();
  if (isEmpty(confirmPassword)) {
    showError(confirmPasswordField, "Please enter the password again.");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordField, "Passwords do not match.");
  } else {
    showSucces(confirmPasswordField);
    valid = true;
  }
  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

const addInstandFeedback = () => {
  signupForm.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "username":
          checkUsername();
          break;
        case "email":
          checkEmail();
          break;
        case "password":
          checkPassword();
          break;
        case "confirm-password":
          checkConfirmPassword();
          break;
      }
    })
  );
};

// Below function is made redundant by new rendering method
const clearForm = () => {
  usernameField.parentElement.classList.remove("error", "succes");
  emailField.parentElement.classList.remove("error", "succes");
  passwordField.parentElement.classList.remove("error", "succes");
  confirmPasswordField.parentElement.classList.remove("error", "succes");

  usernameField.parentElement.querySelector("div").innerText = "";
  emailField.parentElement.querySelector("div").innerText = "";
  passwordField.parentElement.querySelector("div").innerText = "";
  confirmPasswordField.parentElement.querySelector("div").innerText = "";

  usernameField.value = "";
  emailField.value = "";
  passwordField.value = "";
  confirmPasswordField.value = "";
};
