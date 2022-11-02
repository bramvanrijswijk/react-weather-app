import {Chart} from 'react-google-charts';

const WeatherChart = props => {
  const options = {
    legend: {position: 'none'},
    chartArea: {
      top: 10,
      right: '8%',
      bottom: 10,
      left: '8%',
      width: '100%',
      height: '100%',
    },
    backgroundColor: {fill: 'transparent'},
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
      <Chart chartType={'LineChart'} options={options} data={props.chartData}
             className={'absolute w-full'} style={{top: '200px', left: '5px'}}/>
  );
};

export default WeatherChart;
