export const getDateInHumanLanguage = (timestamp: number) => {
  return new Date(timestamp * 1000)
    .toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
};

export const getShortDayInHumanLanguage = (timestamp: number) => {
  return new Date(timestamp * 1000)
    .toLocaleDateString('nl-NL', {weekday: 'short'});
};

export const getShortMonthInHumanLanguage = (timestamp: number) => {
  return new Date(timestamp * 1000)
    .toLocaleDateString('nl-NL', {month: 'short'});
};

export const getDayNumber = (timestamp: number) => {
  return new Date(timestamp * 1000)
    .getDate();
};
