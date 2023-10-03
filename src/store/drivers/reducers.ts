import {Action} from './actions';
import {Either, error, success} from '../../core';
import {Driver} from './types';

export type State = Either<Driver[], unknown> | null;

const load = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'NEXT_DRIVERS':
      if (state?.success) {
        return success([...state.right, ...action.data]);
      }
      return success(action.data);
    case 'REFRESH_DRIVERS':
      return success(action.data);
    case 'ERROR_DRIVERS':
      return error(action.error);
    default:
      return state;
  }
};

export default load;
