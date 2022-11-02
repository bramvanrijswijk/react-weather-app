import ForecastIcon from './ForecastIcon';

const RotatableArrow = props => {
  return (
      <ForecastIcon color={props.color} icon="Arrow" style={{
        transform: `rotate(${props.degrees}deg)`,
        width: '15px',
      }}/>
  );
};

export default RotatableArrow;
