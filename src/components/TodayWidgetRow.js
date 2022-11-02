import ForecastIcon from './ForecastIcon';
import RotatableArrow from './RotatableArrow';
import {getIconNameById} from '../utils/weather-icons';
import {calculateWindSpeedInBeaufort} from '../utils/wind-in-beaufort';
import {formatTime} from '../utils/time-formatter';

const TodayWidgetRow = props => {
  return (
      <div
          className="grid grid-cols-4 gap-8 bg-white px-8 py-1 items-center border-b">
        <p style={{minWidth: '100px', maxWidth: '100px'}}>
          <time
              className="flex items-center justify-center bg-gray-100 font-semibold px-3 py-1">
            {formatTime(props.hourlyData.dt)}
          </time>
        </p>
        <p>
            <span className="flex items-center space-x-1">
              <ForecastIcon color={'#000'} icon={getIconNameById(
                  props.hourlyData.weather[0].icon.substring(0,
                      2))}/>
              <span className="-ml-4">{Math.round(
                  props.hourlyData.temp)}°</span>
            </span>
        </p>
        <p className="flex-grow text-left">
          {props.hourlyData.weather[0].description ?? ''}
        </p>
        <p>
            <span className="flex items-center space-x-2">
              <RotatableArrow color={'#000'}
                              degrees={props.hourlyData.wind_deg}/>
              <span>{calculateWindSpeedInBeaufort(
                  props.hourlyData.wind_speed)} Bft</span>
            </span>
        </p>
      </div>
  );
};

export default TodayWidgetRow;
