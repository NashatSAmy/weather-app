(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["mainPage"],{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

const button = document.getElementById('getWeather');
const controls = [...document.getElementsByClassName('mC')];
let cMS = document.getElementsByClassName('active')[0].id; // Current Measurements System
const mS = {
  // Measurements Systems
  c: {
    current: 'temp_c',
    high: 'maxtemp_c',
    low: 'mintemp_c',
    wind: 'avgvis_km',
    rain: 'totalprecip_mm',
  },
  f: {
    current: 'temp_f',
    high: 'maxtemp_f',
    low: 'mintemp_f',
    wind: 'avgvis_miles',
    rain: 'totalprecip_in',
  },
};
// Gets the user's desired location.
const userLocation = () => {
  const userInput = document.querySelector('input').value;
  return userInput;
};

// Changes measurements system.
const changeMeasurementsSys = (e) => {
  if (!e.target.classList.contains('mC')) return;
  controls.forEach((control) => control.classList.remove('active'));
  e.target.classList.contains('mC') ? e.target.classList.add('active') : '';
  cMS = e.target.id;
};

// Gets weather forecast form the Weather API.
const getWeather = async (location) => {
  const apiKey = 'de8560be89504a5ab53162917230907';

  const [forecast, weatherLocation] = await Promise.all([
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' }
    ),
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`,
      { mode: 'cors' }
    ),
  ]);

  let weather = await forecast.json();
  let place = await weatherLocation.json();

  return [weather.forecast.forecastday, place];
};

// Updates the weather cards on the user's screen.
const updateCards = async () => {
  let forecast = await getWeather(userLocation());
  const days = [...document.getElementsByClassName('day')];
  let currentDay = 0;
  console.log(cMS);
  days.forEach((day) => {
    day.innerHTML = `
    <span class="location">${forecast[1].location.name}, ${
      forecast[1].location.country
    }</span>
    <span class="time">${new Date(
      forecast[0][currentDay].date
    ).toDateString()}</span>
    <div class="temp">
      ${
        currentDay == 0
          ? `<span class="current">${
              forecast[1].current[mS[cMS].current]
            }</span>`
          : ''
      }
      <span class="high">${forecast[0][currentDay].day[mS[cMS].high]}</span>
      <span class="low">${forecast[0][currentDay].day[mS[cMS].low]}</span>
    </div>
    <div class="condition">
      <span class="conditionText">${
        currentDay == 0
          ? forecast[1].current.condition.text
          : forecast[0][currentDay].day.condition.text
      }</span>
      <img src="https:${
        currentDay == 0
          ? forecast[1].current.condition.icon
          : forecast[0][currentDay].day.condition.icon
      }">
    </div>
    <div class="wind">
      <span class="windSpeed">${
        forecast[0][currentDay].day[mS[cMS].wind]
      }</span>
      <img src="https://i.ibb.co/ZBvYD8V/wind.png">
    </div>
    <div class="precip">
      <span class="precipText">${
        forecast[0][currentDay].day[mS[cMS].rain]
      } </span>
      <img src="https://i.ibb.co/PM288gs/precipitation.png">
    </div>
    <div class="humidity">
      <span class="humidityText">${
        forecast[0][currentDay].day.avghumidity
      }</span>
      <img src="https://i.ibb.co/JqY4VRB/humidity.png">
    </div>
    `;
    currentDay++;
  });
};

button.addEventListener('click', updateCards);
controls.forEach((control) =>
  control.addEventListener('click', changeMeasurementsSys)
);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/main.js"));
/******/ }
]);
//# sourceMappingURL=mainPage.bundle.js.map