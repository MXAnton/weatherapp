const OPENWEATHERMAPAPIKEY = '427f3d32f2c7374e9c98879b46875762';
const GOOGLEMAPSAPIKEY = 'AIzaSyAAzErg_L14luhh7CpWk5dUepd5TFhkvq0';


const search = document.getElementById("weather-data-search");
const place = document.getElementById("place");


// Search place and weather on enter press in searchinput
search.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    searchPlace();
  }
});



let marker;
let map, infoWindow;
window.initMap = initMap;

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
    zIndex: Math.round(0 * -100000) << 5
  });
}
function setMapPos(_lat, _lon) {
  const pos = {
    lat: parseFloat(_lat),
    lng: parseFloat(_lon)
  };

  map.setZoom(10);
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    '<div class="weather-card"><h2 class="weather-card__weather"></h2><p class="weather-card__temp"></p><p class="weather-card__feels-like"></p><p class="weather-card__humidity"></p><p class="weather-card__rain"></p><p class="weather-card__wind"></p></div>'
  );
  infoWindow.open(map);
  map.setCenter(pos);
  marker.setPosition(pos);
}


function searchPlace() {
  const _city = search.value;

  // SET LAT & LON BASED ON CITYinput VIA GEOAPI
  let _lat = 59.3294;
  let _lon = 18.063240;

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${_city}&limit=1&appid=${OPENWEATHERMAPAPIKEY}`)
    .then(res => res.json())
    .then(json => {
      _lat = json[0].lat;
      _lon = json[0].lon;

      // Show position on maps
      setMapPos(_lat, _lon);

      place.querySelector('.place__name').textContent = json[0].name;
      place.querySelector('.place__country').textContent = json[0].country;
      place.querySelector('.place__country-flag').src = `https://flagsapi.com/${json[0].country}/flat/32.png`;
      place.querySelector('.place__lat').textContent = _lat;
      place.querySelector('.place__lon').textContent = _lon;

      animatePlaceTexts();

      searchWeather(_lat, _lon);
    })
    .catch (error => {
      console.warn('Could not find data. Error: ' + error);
      alert('Could not find data for: ' + _city);
      search.value = '';
      search.focus();
    });
}
function searchWeather(_lat, _lon) {
  // GET WEATHER
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${_lat}&lon=${_lon}&appid=${OPENWEATHERMAPAPIKEY}&units=metric`
  ).then(res => res.json()).then(
    json => {
      const _weatherCard = document.querySelector(".weather-card");
      const _weather = _weatherCard.querySelector(".weather-card__weather");
      const _temp = _weatherCard.querySelector(".weather-card__temp");
      const _feelsLike = _weatherCard.querySelector(".weather-card__feels-like");
      const _humidity = _weatherCard.querySelector(".weather-card__humidity");
      const _rain = _weatherCard.querySelector(".weather-card__rain");
      const _wind = _weatherCard.querySelector(".weather-card__wind");

      _weather.textContent = `${json.weather[0].main}, ${json.weather[0].description}`;
      _temp.textContent = `Temperature: ${parseInt(json.main.temp)} °C`;
      _feelsLike.textContent = `Feels like: ${parseInt(json.main.feels_like)} °C`;
      _humidity.textContent = `Humidity: ${parseInt(json.main.humidity)} %`;
      try {
        _rain.textContent = `Rain: ${parseInt(json.rain['1h'])} mm last hour`;
      } catch {
        console.warn('No rain data available.');
      }
      _wind.textContent = `Wind: ${parseInt(json.wind.speed)} m/s`;
    }
  );
}


const placeTextsScaleUp = [
  { transform: 'scale(0)' },
  { transform: 'scale(1)' }
];
const placeTextsTiming = {
  duration: 300,
  iterations: 1,
}
function animatePlaceTexts() {
  place.querySelector('.place__name').animate(placeTextsScaleUp, placeTextsTiming);
  place.querySelector('.place__country').animate(placeTextsScaleUp, placeTextsTiming);
  place.querySelector('.place__country-flag').animate(placeTextsScaleUp, placeTextsTiming);
  place.querySelector('.place__lat').animate(placeTextsScaleUp, placeTextsTiming);
  place.querySelector('.place__lon').animate(placeTextsScaleUp, placeTextsTiming);
}