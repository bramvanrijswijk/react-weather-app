import Cloud from './icons/Cloud';
import Sun from './icons/Sun';
import CloudDrizzle from './icons/CloudDrizzle';
import CloudFog from './icons/CloudFog';
import CloudSnowAlt from './icons/CloudSnowAlt';
import Arrow from './icons/Arrow';

const ForecastIcon = props => {
  const iconMapper = {
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudSnowAlt,
    Sun,
    Arrow,
  };

  const Icon = iconMapper[props.icon];
  
  return <Icon
      color={props.color ?? '#FFF'}
      style={{
        maxWidth: '50px',
        minWidth: '50px',
        textAlign: 'left',
        ...props?.style ?? {},
      }}/>;
};

export default ForecastIcon;
