import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {Driver} from './types';
import axios, {PaginationResponse} from '../../core/axios';

export type RefreshAction = {
  type: 'REFRESH_DRIVERS';
  data: Driver[];
};
export type NextAction = {
  type: 'NEXT_DRIVERS';
  data: Driver[];
};

export type ErrorAction = {
  type: 'ERROR_DRIVERS';
  error: unknown;
};

export type Action = RefreshAction | NextAction | ErrorAction;

export const next = (
  offset: number = 0,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    axios<PaginationResponse<'DriverTable', {Drivers: Driver[]}>>(
      `f1/drivers.json?limit=30&offset=${offset}`,
    )
      .then(res => {
        dispatch({
          type: 'NEXT_DRIVERS',
          data: res.data.MRData.DriverTable.Drivers,
        });
      })
      .catch(raw => dispatch({type: 'ERROR', error: raw}));
  };
};

export const refresh = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    axios<PaginationResponse<'DriverTable', {Drivers: Driver[]}>>(
      'f1/drivers.json?limit=30&offset=0',
    )
      .then(res =>
        dispatch({
          type: 'REFRESH_DRIVERS',
          data: res.data.MRData.DriverTable.Drivers,
        }),
      )
      .catch(raw => dispatch({type: 'ERROR_DRIVERS', error: raw}));
  };
};
