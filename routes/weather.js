// Set variable "router" to Express method ".Router()"
const router = require("express").Router();
// Import Fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// DotEnv loaded in
require("dotenv").config();

// GET Request with null values and render index.ejs
router.get("/", (req, res) => {
  res.render("index", {
    city: null,
    description: null,
    icon: null,
    temp: null,
    country: null,
    humidity: null,
    wind: null,
    feelsLike: null,
    visibility: null,
    day1: null,
    day1Icon: null,
    day1LowTemp: null,
    day1MaxTemp: null,
    day2: null,
    day2Icon: null,
    day2LowTemp: null,
    day2MaxTemp: null,
    day3: null,
    day3Icon: null,
    day3LowTemp: null,
    day3MaxTemp: null,
    day4: null,
    day4Icon: null,
    day4LowTemp: null,
    day4MaxTemp: null,
  });
});

// POST request to WeatherAPI and render values into index.ejs
router.post("/", async (req, res) => {
  // Store inputted form value (city) from index.ejs to "city" variable
  const city = req.body.city;
  // WeatherAPI url formatted with API Key and form value (city)
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=5`;

  // Days of week stored in array to later be queried based on API value
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Function used to Format API "data" value into corresponding day in "days" array
  function formatDay(date) {
    date = new Date(date).getDay();
    let dayFormatted = days[date];
    return dayFormatted;
  }

  // Fetch request with formatted url
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // If city cannot be found, display page with "error" value from API
        if (data.error) {
          res.render("index", {
            city: data.error.message,
            description: null,
            icon: null,
            temp: null,
            country: null,
            humidity: null,
            wind: null,
            feelsLike: null,
            visibility: null,
            day1: null,
            day1Icon: null,
            day1LowTemp: null,
            day1MaxTemp: null,
            day2: null,
            day2Icon: null,
            day2LowTemp: null,
            day2MaxTemp: null,
            day3: null,
            day3Icon: null,
            day3LowTemp: null,
            day3MaxTemp: null,
            day4: null,
            day4Icon: null,
            day4LowTemp: null,
            day4MaxTemp: null,
          });

          // With successful POST request render index.ejs with API data
        } else {
          // Store data from POST request into variables
          // some data values will be formatted or rounded
          const city = data.location.name;
          const description = data.current.condition.text;
          const icon = data.current.condition.icon;
          const temp = Math.round(data.current.temp_c);
          const country = data.location.country;
          const humidity = data.current.humidity;
          const wind = Math.round(data.current.wind_kph);
          const feelsLike = Math.round(data.current.feelslike_c);
          const visibility = data.current.vis_km;
          const day1 = formatDay(data.forecast.forecastday[1].date);
          const day2 = formatDay(data.forecast.forecastday[2].date);
          const day3 = formatDay(data.forecast.forecastday[3].date);
          const day4 = formatDay(data.forecast.forecastday[4].date);
          const day1Icon = data.forecast.forecastday[1].day.condition.icon;
          const day2Icon = data.forecast.forecastday[2].day.condition.icon;
          const day3Icon = data.forecast.forecastday[3].day.condition.icon;
          const day4Icon = data.forecast.forecastday[4].day.condition.icon;
          const day1LowTemp = Math.round(
            data.forecast.forecastday[1].day.mintemp_c
          );
          const day1MaxTemp = Math.round(
            data.forecast.forecastday[1].day.maxtemp_c
          );
          const day2LowTemp = Math.round(
            data.forecast.forecastday[2].day.mintemp_c
          );
          const day2MaxTemp = Math.round(
            data.forecast.forecastday[2].day.maxtemp_c
          );
          const day3LowTemp = Math.round(
            data.forecast.forecastday[3].day.mintemp_c
          );
          const day3MaxTemp = Math.round(
            data.forecast.forecastday[3].day.maxtemp_c
          );
          const day4LowTemp = Math.round(
            data.forecast.forecastday[4].day.mintemp_c
          );
          const day4MaxTemp = Math.round(
            data.forecast.forecastday[4].day.maxtemp_c
          );
          // Index.ejs is rendered with each value formatted or rounded
          res.render("index", {
            city,
            description,
            icon,
            temp,
            country,
            humidity,
            wind,
            feelsLike,
            visibility,
            day1,
            day1Icon,
            day1LowTemp,
            day1MaxTemp,
            day2,
            day2Icon,
            day2LowTemp,
            day2MaxTemp,
            day3,
            day3Icon,
            day3LowTemp,
            day3MaxTemp,
            day4,
            day4Icon,
            day4LowTemp,
            day4MaxTemp,
          });
        }
      });
      // When connection error is caught, page is rendered with null values and error message
  } catch (err) {
    res.render("index", {
      city: "Something went wrong!",
      description: null,
      icon: null,
      temp: null,
      country: null,
      humidity: null,
      wind: null,
      feelsLike: null,
      visibility: null,
      day1: null,
      day1Icon: null,
      day1LowTemp: null,
      day1MaxTemp: null,
      day2: null,
      day2Icon: null,
      day2LowTemp: null,
      day2MaxTemp: null,
      day3: null,
      day3Icon: null,
      day3LowTemp: null,
      day3MaxTemp: null,
      day4: null,
      day4Icon: null,
      day4LowTemp: null,
      day4MaxTemp: null,
    });
  }
});

module.exports = router;
