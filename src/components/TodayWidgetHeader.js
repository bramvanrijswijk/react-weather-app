import ForecastIcon from './ForecastIcon';
import {getIconNameById} from '../utils/weather-icons';
import {getDateInHumanLanguage} from '../utils/date-formatter';

const TodayWidgetHeader = props => {
  return (
      <header
          className="flex items-center justify-between bg-gradient-to-r from-slate-600 to-slate-700 px-8 border-b border-slate-600">
        <div className="flex flex-col space-y-1">
          <h2 className="text-2xl text-white font-bold tracking-wide">
            {props.placeName}
          </h2>
          <p className="text-gray-300">
            {getDateInHumanLanguage(props.forecastData.current.dt)}
          </p>
        </div>
        <div className="flex items-center">
          <ForecastIcon
              svgHeight={'120'}
              svgWidth={'120'}
              icon={
                getIconNameById(
                    props.forecastData.current.weather[0].icon.substring(0, 2),
                )}
              color="#FFF"/>
          <p className="text-5xl font-bold text-white">
            {Math.round(props.forecastData.current.temp)}°
          </p>
        </div>
      </header>
  );
};

export default TodayWidgetHeader;
