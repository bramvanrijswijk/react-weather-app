import Cloud from './icons/Cloud';
import Sun from './icons/Sun';
import CloudDrizzle from './icons/CloudDrizzle';
import CloudFog from './icons/CloudFog';
import CloudSnowAlt from './icons/CloudSnowAlt';
import Arrow from './icons/Arrow';

interface IconMapper {
  [iconName: string]: any;
}

const ForecastIcon = (props: {
  color?: string;
  svgWidth?: string;
  svgHeight?: string;
  icon: string;
  style?: {};
}) => {
  const iconMapper: IconMapper = {
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
    svgWidth={props.svgWidth ?? '50'}
    svgHeight={props.svgHeight ?? '50'}
    style={{
      maxWidth: '50px',
      minWidth: '50px',
      textAlign: 'left',
      ...props?.style ?? {},
    }}/>;
};

export default ForecastIcon;
