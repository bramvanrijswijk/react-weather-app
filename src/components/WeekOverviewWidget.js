import ForecastIcon from './ForecastIcon';
import RotatableArrow from './RotatableArrow';
import {getIconNameById} from '../utils/weather-icons';
import {calculateWindSpeedInBeaufort} from '../utils/wind-in-beaufort';
import WeatherChart from './Chart';
import {useEffect, useState} from 'react';
import {
  getDayNumber,
  getShortDayInHumanLanguage,
  getShortMonthInHumanLanguage,
} from '../utils/date-formatter';

const WeekOverviewWidget = props => {
  const [hasErrorLoadingChart, setHasErrorLoadingChart] = useState(false);

  const chartData = [];

  const transformDailyDataToGraphData = () => {
    if (Object.keys(props.forecastData.daily).length > 0) {
      chartData.push(
          ['Dag', 'Temperatuur', {role: 'annotation', type: 'string'}]);

      props.forecastData.daily.forEach((day, index) => {
        chartData.push([
          index + 1, // index for the chart
          Math.round(day.temp.day), // value for the y axis
          Math.round(day.temp.day).toString() + '°', // label next to the points
        ]);
      });

      return;
    }

    setHasErrorLoadingChart(true);
  };

  useEffect(() => {
    transformDailyDataToGraphData();
  }, []);

  return (
      <div className="bg-white border mt-5">
        <div className="grid grid-cols-7 bg-white p-5 divide-x relative">
          {Object.values(props.forecastData.daily)
              .map((forecastDailyData, index) =>
                  (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                          <span>{getShortDayInHumanLanguage(
                              forecastDailyData.dt)}</span>
                          <span className="flex space-x-1 font-semibold">
                            <span>{getDayNumber(forecastDailyData.dt)}</span>
                            <span>{getShortMonthInHumanLanguage(
                                forecastDailyData.dt)}</span>
                        </span>
                        </div>
                        <div>
                          <ForecastIcon icon={getIconNameById(
                              forecastDailyData.weather[0].icon.substring(0,
                                  2))} color={'#000'}/>
                        </div>

                        {/* Chart container */}
                        {!hasErrorLoadingChart && (
                            <div style={{height: '400px'}}></div>
                        )}
                        {/* Chart container */}

                        <div
                            className="flex flex-col items-center space-y-2 pt-5">
                          <RotatableArrow color="#000"
                                          degrees={forecastDailyData.wind_deg}/>
                          <span>{calculateWindSpeedInBeaufort(
                              forecastDailyData.wind_speed)} Bft</span>
                        </div>
                      </div>
                  ),
              )}

          <WeatherChart chartData={chartData}/>
        </div>

        {hasErrorLoadingChart && (
            <p className="p-5 text-center text-gray-500">
              Wegens een opgetreden fout kan de temperatuursgrafiek niet worden
              geladen. Excuses voor het ongemak.
            </p>
        )}
      </div>
  );
};

export default WeekOverviewWidget;
