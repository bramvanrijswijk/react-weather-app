import TodayWidgetHeaderRow from './TodayWidgetHeaderRow';
import TodayWidgetRow from './TodayWidgetRow';
import TodayWidgetHeader from './TodayWidgetHeader';
import {HourlyWeatherDetails, WeatherData} from "../interfaces/weather-data.interface";

const TodayWidget = (props: { forecastData: WeatherData; placeName: string }) => {
  return (
    <div className="border">
      <TodayWidgetHeader
        forecastData={props.forecastData}
        placeName={props.placeName}
      />
      <TodayWidgetHeaderRow forecastData={props.forecastData}/>
      <ul>
        {Object.values(props.forecastData.hourly)
          .map((forecastHourlyData: HourlyWeatherDetails, index: number) =>
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
