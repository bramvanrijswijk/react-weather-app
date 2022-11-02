import ForecastIcon from './ForecastIcon';
import {getIconNameById} from '../utils/weather-icons';
import RotatableArrow from './RotatableArrow';
import {calculateWindSpeedInBeaufort} from '../utils/wind-in-beaufort';

const TodayWidgetHeaderRow = props => {
  return (
      <div
          className="grid grid-cols-4 gap-8 bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-1 items-center">
        <div data-column-name="time" className="text-white"
             style={{minWidth: '100px', maxWidth: '100px'}}>
            <span
                className="flex items-center justify-center bg-slate-800 font-semibold px-3 py-1">
                nu
            </span>
        </div>

        <div data-column-name="temperature" className="text-white">
          <span className="flex items-center space-x-1">
            <ForecastIcon icon={getIconNameById(
                props.forecastData.current.weather[0].icon.substring(0,
                    2))}/>
            <span className="-ml-4">{Math.round(
                props.forecastData.current.temp)}°</span>
          </span>
        </div>

        <div data-column-name="description"
             className="flex-grow text-left text-white">
          {props.forecastData.current.weather[0].description}
        </div>

        <div data-column-name="wind" className="text-white">
            <span className="flex items-center space-x-2">
              <RotatableArrow color={'#FFF'}
                              degrees={props.forecastData.current.wind_deg}/>
              <span>{calculateWindSpeedInBeaufort(
                  props.forecastData.current.wind_speed)} Bft</span>
            </span>
        </div>
      </div>
  );
};

export default TodayWidgetHeaderRow;
