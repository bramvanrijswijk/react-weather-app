class WeatherService {
  apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall';

  getWeatherData(coordinates) {
    const url = `${this.apiUrl}?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=minutely&units=metric&lang=nl&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`;

    return fetch(url)
        .then(response => {
          if (!response.ok) {
            console.error(response);
            throw new Error(
                'Door een storing is het niet mogelijk om de weersvoorspelling te bekijken. Probeer het straks nogmaals.');
          }
          return response;
        })
        .then(response => response.json())
        .then(response => {
          // The API includes today and the current hour, which is irrelevant for our case.
          response.daily.shift();
          response.hourly.shift();

          return {
            daily: response.daily,
            current: response.current,
            hourly: response.hourly,
          };
        });
  };

  fetchCurrentCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error(error.message));
          });
    });
  }

  getPlaceNameByCoordinates(coordinates) {
    return fetch(
        `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`)
        .then(response => response.json())
        .then(response => response.address.city ?? response.address.town);
  };
}

export default WeatherService;
