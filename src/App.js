import {useEffect, useState} from 'react';
import Header from './components/Header';
import TodayWidget from './components/TodayWidget';
import WeekOverviewWidget from './components/WeekOverviewWidget';

const App = () => {
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [apiError, setApiError] = useState('');
  const [hasNoCoordinatesError, setHasNoCoordinatesError] = useState(false);
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(true);

  const [weatherData, setWeatherData] = useState({
    daily: [],
    current: [],
    hourly: [],
  });
  const [placeName, setPlaceName] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const loadSandboxEnvironment = () => {
    setCoordinates({
      lat: '52.1092717',
      lng: '5.1809676',
    });

    setPlaceName('De Bilt');

    fetchMockData((mockData) => {
      // The API also included today in the daily results, which is irrelevant for our case
      mockData.daily.shift();
      mockData.hourly.shift();

      setWeatherData({
        daily: mockData.daily,
        current: mockData.current,
        hourly: mockData.hourly,
      });

      setIsLoadingWeather(false);
    });
  };

  const fetchMockData = (callback) => {
    const mockedForecastData = require('./mock_data.json');
    return callback(mockedForecastData);
  };

  const fetchCurrentCoordinates = () => {
    if (!navigator.geolocation) {
      setHasNoCoordinatesError(true);
      setIsLoadingCoordinates(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          setIsLoadingCoordinates(false);
        },
        (error) => {
          console.error(error);
          setIsLoadingCoordinates(false);
        });
  };

  const setPlaceNameByCoordinates = () => {
    fetch(
        `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`)
        .then(response => response.json())
        .then(response => {
          setPlaceName(response.address.city ?? response.address.town);
        })
        .catch(errorMessage => {
          setPlaceName('Onbekend');

          console.info(`Location was set to default: 'Onbekend'.`,
              errorMessage);
        });
  };

  const fetchWeatherData = () => {
    fetchCurrentCoordinates();

    if (isLoadingCoordinates) {
      return;
    }

    setPlaceNameByCoordinates();

    if (hasNoCoordinatesError) {
      console.error('Has no coordinates.');
      return;
    }

    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=minutely&units=metric&lang=nl&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`;

    fetch(url)
        .then(response => {
          if (!response.ok) {
            setApiError(
                'Door een storing is het niet mogelijk om de weersvoorspelling te bekijken. Probeer het straks nogmaals. Excuses voor het ongemak.');

            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(response => {
          // The API includes today and the current hour, which is irrelevant for our case.
          response.daily.shift();
          response.hourly.shift();

          setWeatherData({
            daily: response.daily,
            current: response.current,
            hourly: response.hourly,
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoadingWeather(false);
        });
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      fetchWeatherData();
      return;
    }

    loadSandboxEnvironment();
  }, [isLoadingCoordinates]);

  return (
      <div
          className="bg-gray-50 min-h-screen text-base flex justify-center w-full">
        <Header/>
        <main className="w-full py-10 px-8 mt-16">
          {isLoadingWeather && (
              <div className="text-center">
                <p>Laden...</p>
              </div>
          )}
          {apiError.length > 0 && (
              <div className="text-center">
                <p>{apiError}</p>
                <small>PS: Heb je wel een sessie gestart via
                  https://cors-anywhere.herokuapp.com?</small>
              </div>
          )}
          {!isLoadingWeather && apiError.length === 0 && (
              <div
                  className="flex flex-col xl:flex-row justify-center w-full xl:space-x-12 space-y-12 xl:space-y-0">
                <section
                    className="flex flex-col w-full xl:w-5/12 overflow-hidden">
                  <TodayWidget forecastData={weatherData}
                               placeName={placeName}/>
                </section>
                <section className="flex flex-col w-full xl:w-7/12">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Verwachting komende dagen in {placeName}
                    </h2>
                  </div>
                  <WeekOverviewWidget forecastData={weatherData}/>
                </section>
              </div>
          )}
        </main>
      </div>
  );
};

export default App;
