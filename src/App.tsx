import {useEffect, useState} from 'react';
import Header from './components/Header';
import TodayWidget from './components/TodayWidget';
import WeekOverviewWidget from './components/WeekOverviewWidget';
import WeatherService from './services/weather-service';
import {Coordinates} from "./interfaces/coordinates.interface";
import {CurrentWeatherDetails, WeatherData} from "./interfaces/weather-data.interface";

const App = () => {
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [apiError, setApiError] = useState('');
  const [hasCoordinatesError, setHasCoordinatesError] = useState(true);
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(true);

  const [weatherData, setWeatherData] = useState<WeatherData>({
    daily: [],
    current: {} as CurrentWeatherDetails,
    hourly: [],
  });
  const [placeName, setPlaceName] = useState('');
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lng: null,
  });

  const loadSandboxEnvironment = () => {
    setCoordinates({
      lat: 52.1092717,
      lng: 5.1809676,
    });

    setPlaceName('De Bilt');

    fetchMockData((mockData: WeatherData) => {
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

  const fetchMockData = (callback: Function) => {
    const mockedForecastData = require('./mock_data.json');
    return callback(mockedForecastData);
  };

  const fetchWeatherData: () => Promise<any> = async () => {
    const weatherService = new WeatherService();

    weatherService.fetchCurrentCoordinates()
      .then((coordinates: Coordinates) => {
        setCoordinates(coordinates);
        setHasCoordinatesError(false);
      })
      .catch(error => {
        setHasCoordinatesError(true);
        setApiError(error.message);
        setIsLoadingWeather(false);
      })
      .finally(() => setIsLoadingCoordinates(false));

    if (hasCoordinatesError) {
      return;
    }

    try {
      const placeName = await weatherService.getPlaceNameByCoordinates(
        coordinates);

      setPlaceName(placeName);
    } catch (e: unknown) {
      setPlaceName('Onbekend');
    }

    try {
      return await weatherService.getWeatherData(coordinates);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      }

      console.error('Unexpected error', error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      fetchWeatherData().then((weatherData: WeatherData | undefined) => {
        if (typeof weatherData !== 'undefined') {
          setWeatherData(weatherData);
        }
      });

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
              <a className="underline pl-1"
                 href="https://cors-anywhere.herokuapp.com"
                 target="_blank">https://cors-anywhere.herokuapp.com</a>?</small>
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
