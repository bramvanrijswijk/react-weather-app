import TodayWidgetHeaderRow from './TodayWidgetHeaderRow';
import TodayWidgetRow from './TodayWidgetRow';
import TodayWidgetHeader from './TodayWidgetHeader';

const TodayWidget = props => {
  return (
      <div className="border">
        <TodayWidgetHeader
            forecastData={props.forecastData}
            placeName={props.placeName}
        />
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
