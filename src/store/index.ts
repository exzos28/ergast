import {createStore, combineReducers, applyMiddleware} from 'redux';
import drivers, {State as DriversState} from './drivers/reducers';
import races, {State as RacesState} from './races/reducers';
import thunk from 'redux-thunk';

export type RootState = {
  drivers: DriversState;
  races: RacesState;
};

export default createStore(
  combineReducers<RootState>({
    drivers,
    races,
  }),
  applyMiddleware(thunk),
);
