import {Action} from './actions';
import {Either, error, success} from '../../core';
import {Race} from './types';
import {Driver} from '../drivers/types';

export type State = {[key: Driver['driverId']]: Either<Race[], unknown>};

const load = (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'FULFILLED_RACES':
      return {
        ...state,
        [action.id]: success(action.data),
      };
    case 'ERROR_RACES':
      return {
        ...state,
        [action.id]: error(action.error),
      };
    default:
      return state;
  }
};

export default load;
