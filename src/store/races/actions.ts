import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {State} from './reducers';
import {DriverId} from '../drivers/types';
import {Race} from './types';
import axios, {FullyResponse} from '../../core/axios';

export type FulfilledRaces = {
  type: 'FULFILLED_RACES';
  data: Race[];
  id: DriverId;
};

export type ErrorRaces = {
  type: 'ERROR_RACES';
  error: unknown;
  id: DriverId;
};

export type Action = FulfilledRaces | ErrorRaces;

export const load = (
  id: DriverId,
): ThunkAction<Promise<void>, State, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState,
  ): Promise<void> => {
    const state = getState();
    if (state[id] !== undefined) {
      // ignore, already loaded
    }
    axios<FullyResponse<'RaceTable', {Races: Race[]}>>(
      `f1/drivers/${id}/results.json`,
    )
      .then(res =>
        dispatch({
          type: 'FULFILLED_RACES',
          id: id,
          data: res.data.MRData.RaceTable.Races,
        }),
      )
      .catch(raw => dispatch({type: 'ERROR_RACES', error: raw}));
  };
};
