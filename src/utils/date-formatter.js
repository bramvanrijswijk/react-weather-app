export const getDateInHumanLanguage = (timestamp) => {
  return new Date(timestamp * 1000)
      .toLocaleDateString('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
};

export const getShortDayInHumanLanguage = (timestamp) => {
  return new Date(timestamp * 1000)
      .toLocaleDateString('nl-NL', {weekday: 'short'});
};

export const getShortMonthInHumanLanguage = (timestamp) => {
  return new Date(timestamp * 1000)
      .toLocaleDateString('nl-NL', {month: 'short'});
};

export const getDayNumber = (timestamp) => {
  return new Date(timestamp * 1000)
      .getDate();
};
