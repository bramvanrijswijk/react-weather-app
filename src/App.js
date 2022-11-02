import {useEffect, useState} from 'react';
import Header from './components/Header';
import TodayWidget from './components/TodayWidget';

const App = () => {
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherData, setWeatherData] = useState({
    daily: [],
    current: [],
    hourly: [],
  });
  const [placeName, setPlaceName] = useState('');

  const fetchMockData = (callback) => {
    const mockedForecastData = require('./mock_data.json');
    return callback(mockedForecastData);
  };

  const fetchWeatherData = () => {
    if (process.env.NODE_ENV === 'production') {
      // do api call
      setIsLoadingWeather(false);
      return [];
    }

    fetchMockData((mockData) => {
      // The API also included today in the daily results, which is irrelevant for our case
      mockData.daily.shift();
      mockData.hourly.shift();

      setPlaceName('De Bilt');

      setWeatherData({
        daily: mockData.daily,
        current: mockData.current,
        hourly: mockData.hourly,
      });

      setIsLoadingWeather(false);
    });
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
      <div className="flex justify-center w-full">
        <Header/>
        <main className="w-full 2xl:w-11/12 py-10 px-4 xl:px-8 2xl:px-16 mt-16">
          {!isLoadingWeather && (
              <div
                  className="flex flex-col xl:flex-row justify-center w-full xl:space-x-12 space-y-12 xl:space-y-0">
                <section
                    className="flex flex-col w-full xl:w-4/12 overflow-hidden">
                  <TodayWidget forecastData={weatherData}
                               placeName={placeName}/>
                </section>
              </div>
          )}
        </main>
      </div>
  );
};

export default App;
