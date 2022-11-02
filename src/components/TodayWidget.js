import TodayWidgetHeaderRow from './TodayWidgetHeaderRow';
import TodayWidgetRow from './TodayWidgetRow';

const TodayWidget = props => {
  return (
      <div className="border">
        <header
            className="flex items-center justify-between bg-gradient-to-r from-slate-600 to-slate-700 p-8 border-b border-slate-600">
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl text-white font-semibold tracking-wide">
              {props.placeName}
            </h2>
            <p className="text-gray-300">
              {
                new Date(props?.forecastData.current.dt * 1000)
                    .toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
              }
            </p>
          </div>
          <div className="flex items-center"></div>
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
