interface BeaufortMapper {
  [beaufortIndex: string]: number;
}

export const calculateWindSpeedInBeaufort = (windSpeedInMetersPerSecond: number) => {
  const windSpeedInKilometersPerHour = Math.round(
    windSpeedInMetersPerSecond * 3.6);

  // 0 bft -> starts from a wind speed of 0 km/h
  // 1 bft -> starts from a wind speed of 2 km/h
  // 2 bft -> starts from a wind speed of 6 km/h
  // etc.
  const beaufortMapper: BeaufortMapper = {
    '0': 0,
    '1': 2,
    '2': 6,
    '3': 12,
    '4': 20,
    '5': 29,
    '6': 39,
    '7': 50,
    '8': 62,
    '9': 75,
    '10': 89,
    '11': 103,
    '12': 118,
  };

  if (windSpeedInKilometersPerHour >= 118) {
    return 12;
  }

  let beaufort = 0;
  Object.values(beaufortMapper).some((minimumWindSpeed, index) => {
    if (windSpeedInKilometersPerHour >= minimumWindSpeed &&
      windSpeedInKilometersPerHour < beaufortMapper[index + 1]) {
      beaufort = index;
      return true;
    }
  });

  return beaufort;
};
