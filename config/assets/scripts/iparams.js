//Initial values
let accountLinked = false;
let installedDate = null;
var clientData = null;

//Views
const unlinkedView = document.getElementById("connect-account");
const linkedView = document.getElementById("linked-account");

//State Messages
const linkedState = document.getElementById("link-state");
const errorMessage = document.getElementById("error-message");
const installedDateContainer = document.getElementById("installed-date");

//Account linking states
const initialState = document.getElementById("initial-container");
const loadingState = document.getElementById("loading-container");
const errorState = document.getElementById("error-container");

//Inputs
let apiKeyInput = document.getElementById("api-key");
let storeKeyInput = document.getElementById("store_key");

//Actions
const linkAccountButton = document.getElementById("link-account");
const retryButton = document.getElementById("retry-button");
const unlinkButton = document.getElementById("unlink-account");

function validate() {
  if (accountLinked) {
    return true;
  } else {
    validateInputs();
    return false;
  }
}

function postConfigs() {
  return {
    __meta: {
      secure: ["api_key", "store_key"],
    },
    api_key: apiKeyInput.value,
    store_key: storeKeyInput.value,
    account_authenticated: accountLinked,
    installed_date: installedDate,
  };
}

function getConfigs(configs) {
  let { api_key, store_key, installed_date } = configs;
  apiKeyInput.value = api_key;
  storeKeyInput.value = store_key;
  accountLinked = account_authenticated;
  installedDate = installed_date;
  return;
}
function resetDefaults() {
  apiKeyInput.value = "";
  storeKeyInput.value = "";
  accountLinked = false;
  installedDate = null;
}

function showLoading() {
  hideElement(initialState);
  showElement(loadingState);
}

function showError(message) {
  hideElement(loadingState);
  showElement(errorState);
  errorMessage.innerHTML = message;
}

function hideElement(element) {
  element.classList.add("hide");
}

function showElement(element) {
  element.classList.remove("hide");
}

function homeScreen(isAccountLinked = false, installedDate = null) {
  let title = "";
  if (isAccountLinked) {
    title = "Connected account";
    installedDateContainer.innerHTML = installedDate;
    showElement(linkedView);
    hideElement(unlinkedView);
    // remove event listeners
    apiKeyInput.removeEventListener("fwInput", apiKeyInputValidation);
    storeKeyInput.removeEventListener("fwInput", storeKeyInputValidation);
    retryButton.removeEventListener("fwClick", retryButtonClick);

    // Add event listeners
    unlinkButton.addEventListener("fwClick", unlinkButtonClick);
  } else {
    title = "Connect your featureOS account";
    showElement(unlinkedView);
    showElement(initialState);
    hideElement(errorState);
    hideElement(loadingState);

    hideElement(linkedView);
    // Add event listeners
    apiKeyInput.addEventListener("fwInput", apiKeyInputValidation);
    storeKeyInput.addEventListener("fwInput", storeKeyInputValidation);
    retryButton.addEventListener("fwClick", retryButtonClick);

    //remove event listeners
    unlinkButton.removeEventListener("fwClick", unlinkButtonClick);
  }

  linkedState.innerHTML = title;
}

function validateInput(field) {
  let fieldHasValue = field ? field.value.length > 0 : false;
  if (!fieldHasValue) {
    field.setAttribute("state", "error");
    field.setAttribute("error-text", "This field is empty");
    return false;
  } else {
    field.removeAttribute("state");
    field.removeAttribute("error-text");
    return true;
  }
}

function validateKey(field) {
  let fieldHasValue = field ? field.value.length > 0 : false;
  if (!fieldHasValue) {
    field.setAttribute("state", "error");
    field.setAttribute("error-text", "This field is empty");
    return false;
  } else {
    // Check if the field value is a valid SSO
    const ssoKeyPattern = /^[A-Za-z0-9]{2,24}$/;
    const isValidKey = ssoKeyPattern.test(field.value);

    if (!isValidKey) {
      field.setAttribute("state", "error");
      field.setAttribute("error-text", "Please enter a valid SSO key");
      return false;
    } else {
      field.removeAttribute("state");
      field.removeAttribute("error-text");
      return true;
    }
  }
}

function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const year = date.getFullYear();

  return `${dateNum} ${month}  ${year}`;
}

function showToast(type, content) {
  // Create an fw-toast element
  const toastElement = document.createElement("fw-toast");
  toastElement.setAttribute("position", "top-center");
  toastElement.setAttribute("type", type);
  toastElement.setAttribute("content", content);

  // Attach the fw-toast element to the body
  document.body.appendChild(toastElement);

  // Trigger the toast
  toastElement.trigger();

  // Remove the fw-toast element after a certain time (e.g., 3 seconds)
  setTimeout(() => {
    document.body.removeChild(toastElement);
  }, 3000);
}

async function getReturns() {
  const requestOptions = {
    method: "GET",
    headers: {
      api_key: apiKeyInput.value,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      "https://api.featureos.app/api/v3/customers",
      requestOptions
    );
    if (response.status >= 200 && response.status < 300) {
      showToast("success", "Authentication Successful");
      accountLinked = true;
      installedDate = formatDate(new Date());
      console.log(response);
      homeScreen(accountLinked, installedDate);
    } else {
      showToast("error", "Invalid Credentials. Please try again.");
      showError("Invalid Credentials");
    }
  } catch (e) {
    showToast("error", "Invalid Credentials. Please try again.");
    showError("Invalid Credentials");
  }
}

async function validateKeys() {
  showLoading();
  getReturns();
}

function validateInputs() {
  return (
    validateInput(apiKeyInput) &&
    validateInput(storeKeyInput) &&
    validateKey(storeKeyInput)
  );
}

linkAccountButton.addEventListener("fwClick", function validateUser() {
  let hasValidInputs = validateInputs();
  if (hasValidInputs) {
    validateKeys();
  }
});

function apiKeyInputValidation(e) {
  validateInput(e.target);
}

function storeKeyInputValidation(e) {
  validateInput(e.target) && validateKey(e.target);
}

function retryButtonClick() {
  hideElement(errorState);
  showElement(initialState);
  homeScreen();
}

function unlinkButtonClick() {
  resetDefaults();
  homeScreen();
}

document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();
  async function renderApp() {
    try {
      let client = await app.initialized();
      window.client = client;
      clientData = client;
      clientData.iparams.get().then(function (data) {
        accountLinked = data.account_authenticated;
        installedDate = data.installed_date;
        homeScreen(accountLinked, installedDate);
        console.log(client);
      });
      //what to add an error message if render app fails
    } catch (error) {
      showToast(
        "error",
        "An error occurred while rendering the app. Please try again later"
      );
    }
  }
};
