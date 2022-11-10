interface BasicWeather {
  dt: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface CurrentWeatherDetails extends BasicWeather {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: number;
  feels_like: number;
}

export interface HourlyWeatherDetails extends BasicWeather {
  temp: number;
  feels_like: number;
  pop: number;
  rain: {
    '1h': number;
  }
}

export interface DailyWeatherDetails extends BasicWeather {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }
  clouds: number;
  pop: number;
  rain: number;
}

export interface WeatherData {
  current: CurrentWeatherDetails;
  hourly: HourlyWeatherDetails[];
  daily: DailyWeatherDetails[];
}
