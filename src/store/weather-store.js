import {createStore} from 'redux';

const weatherReducer = (state = {weather: []}, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return state;

    case 'ADD_WEATHER':
      return {
        ...state,
        weather: action.payload,
      };

    default:
      return state;
  }
};
