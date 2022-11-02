export const getIconNameById = (iconId) => {
  const forecastIconMapper = {
    '01': 'Sun', // clear sky
    '02': 'Cloud', // few clouds
    '03': 'Cloud', // scattered clouds
    '04': 'Cloud', // broken clouds
    '09': 'CloudDrizzle', // shower rain
    '10': 'CloudDrizzle', // rain
    '11': 'CloudDrizzle', // thunderstorm
    '13': 'CloudSnowAlt', // snow
    '50': 'CloudFog', // mist
  };

  return forecastIconMapper[iconId] ?? 'Cloud';
};
