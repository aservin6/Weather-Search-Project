// Store elements that will change when units switch is clicked into variables
let unitSwitchContainer = document.getElementById("unit-switch-container");
let unitSwitch = document.getElementById("unit-switch");
let celsiusElements = document.querySelectorAll(".celsius-value");
let windValue = document.querySelector(".wind-value");
let visValue = document.querySelector(".vis-value");
let tempSuffixElements = document.querySelectorAll(".temp-suffix");

// Store wind and visibility suffix elements into variables
let windSuffix = document.querySelector(".wind-suffix");
let visSuffix = document.querySelector(".vis-suffix");

// Unit switch animation and convert values into either Fahrenheit or Celsius
unitSwitchContainer.addEventListener("click", function () {
  if (this.innerText.substring(0, 1) == "C") {
    // Switch animation
    unitSwitch.style.transform = "translateX(22px)";
    unitSwitch.innerHTML = "F&#176;";
    // For each Celsius value convert to Fahrenheit
    celsiusElements.forEach((element) => {
      let number = element.innerText;
      number = Math.round((number * 9) / 5 + 32);
      element.innerText = `${number}`;
    });
    // Convert wind value to mph and change unit suffix
    let windNumber = windValue.innerText;
    windValue.innerText = Math.round(windNumber / 1.60934);
    windSuffix.innerText = "mph";
    // Convert visibility value to km and change unit suffix
    let visNumber = visValue.innerText;
    visValue.innerText = Math.round(visNumber / 1.60934);
    visSuffix.innerText = "mi";
  } else {
    // Animate switch to resting position
    unitSwitch.style.transform = "translateX(0px)";
    unitSwitch.innerHTML = "C&#176;";
    // For each value convert to Celsius
    celsiusElements.forEach((element) => {
      let number = element.innerText;
      number = Math.round(((number - 32) * 5) / 9);
      element.innerText = `${number}`;
    });
    // Convert wind value to kph and change unit suffix
    let windNumber = windValue.innerText;
    windValue.innerText = Math.round(windNumber * 1.60934);
    windSuffix.innerText = "kph";
    // Convert visibility value to mi and change unit suffix
    let visNumber = visValue.innerText;
    visValue.innerText = Math.round(visNumber * 1.60934);
    visSuffix.innerText = "km";
  }
});

// Store elements that will switch for Dark Mode
let body = document.getElementById("body");
let themeSwitch = document.querySelector(".theme-switch");
let weatherTitle = document.querySelector(".weather-title");
let cityInput = document.querySelector(".city-input");
let searchButton = document.querySelector(".search-button");
let currentWeatherSection = document.querySelector(".current-weather");
let currentConditionsSection = document.querySelector(".current-conditions");
let forecastDays = document.querySelectorAll(".day");
let themeSwitchButton = document.querySelector(".theme-switch");
let mainElement = document.querySelector(".main");

// Theme switch button on click toggles classes for Dark Mode
themeSwitchButton.addEventListener("click", function () {
  body.classList.toggle("bg-dark-gray");
  themeSwitch.classList.toggle("bg-dark-gray");
  themeSwitch.classList.toggle("text-white");
  weatherTitle.classList.toggle("text-white");
  unitSwitchContainer.classList.toggle("dark-mode");
  unitSwitch.classList.toggle("dark-mode-unit-switch");
  cityInput.classList.toggle("dark-mode");
  searchButton.classList.toggle("dark-mode");
  currentWeatherSection.classList.toggle("dark-mode");
  currentConditionsSection.classList.toggle("dark-mode");
  forecastDays.forEach((element) => {
    element.classList.toggle("dark-mode");
  });
});

// Pre POST Request, Main elements opacity is 0,
// once POST Request is made, "pre-post" is removed 
// and animation takes place with weather data
if (document.querySelector(".main").innerText) {
  mainElement.classList.remove("pre-post");
}
