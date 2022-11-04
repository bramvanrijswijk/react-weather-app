export const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall';

export const getWeatherData = (coordinates) => {
  const url = `${apiUrl}?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=minutely&units=metric&lang=nl&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`;

  return fetch(url)
      .then(response => {
        if (!response.ok) {
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
