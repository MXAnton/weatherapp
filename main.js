const OPEN_WEATHERMAP_API_KEY = "";

const search = document.getElementById("weather-data-search");
const searchGlass = document.getElementById("weather-data-search__glass");

const placeElement = document.getElementById("place");
const placeNameElement = placeElement.querySelector(".place__name");
const placeCountryElement = placeElement.querySelector(".place__country");
const placeCountryFlagElement = placeElement.querySelector(
  ".place__country-flag"
);
const placeLatElement = placeElement.querySelector(".place__lat");
const placeLonElement = placeElement.querySelector(".place__lon");

// Search place and weather on enter press in searchinput
search.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    searchPlace();
  }
});

let marker;
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });
  infoWindow = new google.maps.InfoWindow();

  // Init red map marker
  marker = new google.maps.Marker({
    position: { lat: 0, lng: 0 },
    map: map,
    zIndex: Math.round(0 * -100000) << 5,
  });
}
window.initMap = initMap;

function setMapPos(_lat, _lon) {
  const pos = {
    lat: parseFloat(_lat),
    lng: parseFloat(_lon),
  };

  map.setZoom(10);
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    '<div class="weather-card"><h2 class="weather-card__weather"></h2><p>Temperature: <strong class="weather-card__temp"></strong></p><p>Feels like: <strong class="weather-card__feels-like"></strong></p><p>Humidity: <strong class="weather-card__humidity"></strong></p><p>Rain: <strong class="weather-card__rain"></strong></p><p>Wind: <strong class="weather-card__wind"></strong></p></div>'
  );
  infoWindow.open(map);
  map.setCenter(pos);
  marker.setPosition(pos);
}

async function searchPlace() {
  const _city = search.value.trim();
  if (_city == null || _city == "") {
    alert("Input city...");
    search.value = "";
    search.focus();
    return;
  }

  // Animate search input magnifying glass
  searchGlass.animate(
    [
      {
        transform: "rotate(0)",
      },
      {
        transform: "rotate(359deg)",
      },
      {
        transform: "rotate(720deg)",
      },
    ],
    {
      duration: 300,
      iterations: 1,
    }
  );

  // SET LAT & LON BASED ON CITYinput VIA GEOAPI
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${_city}&limit=1&appid=${OPEN_WEATHERMAP_API_KEY}`
  )
    .then((_res) => {
      return _res.json();
    })
    .catch((error) => {
      console.warn("Could not find data. Error: " + error);
      alert("Could not find data for: " + _city);
      return "ERROR";
    });
  if (response === "ERROR" || response.cod || response.message) {
    return;
  }

  const place = response[0];

  const lat = place.lat;
  const lon = place.lon;

  // Show position on maps
  setMapPos(lat, lon);

  placeNameElement.textContent = place.name;
  placeCountryElement.textContent = place.country;
  placeCountryFlagElement.src = ""; // Raise old first, new can take time to load
  placeCountryFlagElement.src = `https://flagsapi.com/${place.country}/flat/32.png`;
  placeLatElement.textContent = lat;
  placeLonElement.textContent = lon;

  animatePlaceTexts();

  searchWeather(lat, lon);

  search.value = "";
  search.focus();
}

async function searchWeather(_lat, _lon) {
  // GET WEATHER
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${_lat}&lon=${_lon}&appid=${OPEN_WEATHERMAP_API_KEY}&units=metric`
  )
    .then((_res) => {
      return _res.json();
    })
    .catch((error) => {
      console.warn("Could not find data. Error: " + error);
      alert("Could not find data for: " + _city);
      return "ERROR";
    });
  if (response === "ERROR" || (response.cod && response.message)) {
    return;
  }

  const weatherCardElement = document.querySelector(".weather-card");
  const weatherElement = weatherCardElement.querySelector(
    ".weather-card__weather"
  );
  const tempElement = weatherCardElement.querySelector(".weather-card__temp");
  const feelsLikeElement = weatherCardElement.querySelector(
    ".weather-card__feels-like"
  );
  const humidityElement = weatherCardElement.querySelector(
    ".weather-card__humidity"
  );
  const rainElement = weatherCardElement.querySelector(".weather-card__rain");
  const windElement = weatherCardElement.querySelector(".weather-card__wind");

  weatherElement.textContent = `${response.weather[0].main}, ${response.weather[0].description}`;
  tempElement.textContent = `${parseInt(response.main.temp)} °C`;
  feelsLikeElement.textContent = `${parseInt(response.main.feels_like)} °C`;
  humidityElement.textContent = `${parseInt(response.main.humidity)} %`;
  console.log(response);
  try {
    rainElement.parentElement.style.display = "block";
    rainElement.textContent = `${parseInt(response.rain["1h"])} mm last hour`;
  } catch {
    rainElement.parentElement.style.display = "none";
    console.warn("No rain data available.");
  }
  windElement.textContent = `${parseInt(response.wind.speed)} m/s`;
}

function animatePlaceTexts() {
  const placeTextsScaleUp = [
    { transform: "scale(0)" },
    { transform: "scale(1)" },
  ];
  const placeTextsTiming = {
    duration: 300,
    iterations: 1,
  };

  placeElement
    .querySelector(".place__name")
    .animate(placeTextsScaleUp, placeTextsTiming);
  placeElement
    .querySelector(".place__country")
    .animate(placeTextsScaleUp, placeTextsTiming);
  placeElement
    .querySelector(".place__country-flag")
    .animate(placeTextsScaleUp, placeTextsTiming);
  placeElement
    .querySelector(".place__lat")
    .animate(placeTextsScaleUp, placeTextsTiming);
  placeElement
    .querySelector(".place__lon")
    .animate(placeTextsScaleUp, placeTextsTiming);
}
