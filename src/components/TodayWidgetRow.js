import ForecastIcon from './ForecastIcon';
import {getIconNameById} from '../utils/weatherIcons';

const TodayWidgetRow = props => {
  return (
      <div
          className="grid grid-cols-4 gap-8 bg-white px-8 py-1 items-center border-b">
        <p style={{minWidth: '100px', maxWidth: '100px'}}>
          <time
              className="flex items-center justify-center bg-gray-100 font-semibold px-3 py-1">
            {
              new Date(props.hourlyData.dt * 1000)
                  .toLocaleTimeString('nl-NL',
                      {hour: '2-digit', minute: '2-digit'})
            }
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
              {/*{// todo: arrow and windspeed }*/}
            </span>
        </p>
      </div>
  );
};

export default TodayWidgetRow;
