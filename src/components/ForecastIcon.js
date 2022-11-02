import Cloud from './icons/Cloud';
import Sun from './icons/Sun';
import CloudDrizzle from './icons/CloudDrizzle';
import CloudFog from './icons/CloudFog';
import CloudSnowAlt from './icons/CloudSnowAlt';

const ForecastIcon = props => {
  const iconMapper = {
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudSnowAlt,
    Sun,
  };

  const Icon = iconMapper[props.icon];

  return <Icon
      color={props.color ?? '#FFF'}
      style={{maxWidth: '50px', minWidth: '50px', textAlign: 'left'}}/>;
};

export default ForecastIcon;
