import TodayWidgetHeaderRow from './TodayWidgetHeaderRow';
import TodayWidgetRow from './TodayWidgetRow';
import ForecastIcon from './ForecastIcon';
import {getIconNameById} from '../utils/weather-icons';

const TodayWidget = props => {
  return (
      <div className="border">
        <header
            className="flex items-center justify-between bg-gradient-to-r from-slate-600 to-slate-700 px-8 border-b border-slate-600">
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl text-white font-bold tracking-wide">
              {props.placeName}
            </h2>
            <p className="text-gray-300">
              {
                new Date(props.forecastData.current.dt * 1000)
                    .toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
              }
            </p>
          </div>
          <div className="flex items-center">
            <ForecastIcon svgHeight={'120'} svgWidth={'120'}
                          icon={getIconNameById(
                              props.forecastData.current.weather[0].icon.substring(
                                  0, 2))}
                          color="#FFF"/>
            <p className="text-5xl font-bold text-white">
              {Math.round(props.forecastData.current.temp)}°
            </p>
          </div>
        </header>
        <TodayWidgetHeaderRow forecastData={props.forecastData}/>
        <ul>
          {Object.values(props.forecastData.hourly)
              .map((forecastHourlyData, index) =>
                  (
                      <li key={index}>
                        <TodayWidgetRow hourlyData={forecastHourlyData}/>
                      </li>
                  ),
              )}
        </ul>
      </div>
  );
};

export default TodayWidget;
