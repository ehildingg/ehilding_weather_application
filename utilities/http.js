import axios from 'axios';

const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=0d7f44e18d903ed5036fcfd573be45b7&units=metric&lang=sv&`;

const FIREBASE_URL =
  'https://weatherforecastapp-cba41-default-rtdb.firebaseio.com/favouriteWeatherCity.json';

export async function getWeather(lat, lon) {
  //   let data = '';
  //   const response = await fetch(WEATHER_URL + city);

  //   if (response.status >= 200 && response.status < 300) {
  //     data = await response.json();
  //     return data;
  //   }
  const url = `${WEATHER_URL}lat=${lat}&lon=${lon}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}

export async function getWeatherBycity(city) {
  const url = `${WEATHER_URL}q=${city}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Error: ' + error);
  }
}

export async function addAsFavourite(weatherInfo) {
  //   const response = await fetch(FIREBASE_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(weatherInfo),
  //   });
  const response = await axios.post(FIREBASE_URL, JSON.stringify(weatherInfo));
}

export async function updateFavorite(weatherInfo) {
  const response = await fetch(FIREBASE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(weatherInfo),
  });
}

export async function deleteFavorite(weatherInfo) {
  const response = await fetch(FIREBASE_URL, 'det som skall tas bort(id)', {
    method: 'DELETE',
  });
}
