import ForecastIcon from './ForecastIcon';

const RotatableArrow = (props: {
  color: string;
  degrees: string | number;
}) => {
  return (
    <ForecastIcon color={props.color} icon="Arrow" style={{
      transform: `rotate(${props.degrees}deg)`,
      width: '15px',
    }}/>
  );
};

export default RotatableArrow;
