import {Chart as ReactGoogleChart} from 'react-google-charts';
import {Chart} from "../interfaces/chart.interface";

const WeatherChart = (props: { chartData: Chart }) => {
  const options = {
    legend: 'none',
    chartArea: {
      top: 10,
      right: '8%',
      bottom: 10,
      left: '8%',
      width: '100%',
      height: '100%',
    },
    backgroundColor: 'transparent',
    vAxis: {
      gridlines: {
        color: 'transparent',
      },
      textPosition: 'none',
    },
    hAxis: {
      gridlines: {
        color: 'transparent',
      },
      textPosition: 'none',
    },
    vAxes: {
      0: {
        baselineColor: 'transparent',
      },
    },
    pointSize: 7,
    tooltip: {
      trigger: 'none',
    },
    annotations: {
      textStyle: {
        fontSize: 18,
      },
    },
  };

  return (
    <ReactGoogleChart
      chartType={'LineChart'}
      options={options}
      data={props.chartData}
      className={'absolute w-full'}
      style={{top: '200px', left: '5px'}}/>
  );
};

export default WeatherChart;
