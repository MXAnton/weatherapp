![Screenshot of the website.](/public/images/showcase.png)

# 🧩 Weather app
Weather application. Input city (& countrycode if needed) to get the current weather data integrated in Google Maps.

## ► Try it now!
The site is live on [https://lehrbas-weather-cf3aa3efc027.herokuapp.com/](https://lehrbas-weather-cf3aa3efc027.herokuapp.com/).

## 📦 Technologies:
 - `HTML`
 - `CSS`
 - `JavaScript`
 - `Express`
 - `EJS`

## 👩🏽‍🍳 Features:
 - **Search desired city** and get its current weather pinned at it on Google Maps.
 - **See city info**: city name, country, country flag, latitude and longitude.
 - **Look around the integrated Google Maps**

## 🔍 How to search:
Search by **city name**. Sometimes you will need to add **, country code (ex SE or UK)** because there are other cities named the same.

## ✨ Improvement/Todo:
- [ ] Catch error when not find city.
- [ ] Get weather at location by pressing it on map.

## 🔒 Enviroment vars
- OPEN_WEATHERMAP_API_KEY=""
- GOOGLE_MAPS_API_KEY=""
- PORT=8080 # Default is 8080, change if needed
- NODE_ENV=development # If on development

## 🚦 Running the Project:
To run the project follow steps below, or go to [https://lehrbas-weather-cf3aa3efc027.herokuapp.com/](https://lehrbas-weather-cf3aa3efc027.herokuapp.com/).
 - **Clone repository**.
 - **Install dependencies** (node and npm required):
```sh
npm install
```
 - **Create .env file** with required env vars.
 - **Run as dev** uses nodemon to auto restart on file changes:
```sh
npm run dev
```
 - **Run as production** to start like production:
```sh
npm run start
```

## ► Play on the live website!
The site is live on [https://lehrbas-weather-cf3aa3efc027.herokuapp.com/](https://lehrbas-weather-cf3aa3efc027.herokuapp.com/).
