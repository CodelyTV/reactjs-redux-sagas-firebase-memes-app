import * as types from './types';
import initialState from '../../initialState';

const defaultState = initialState.auth;

export default function (state = defaultState, action) {
  switch (action.type) {
    case types.CREATE_USER_START:
      return {
        fetching: true,
        error: null,
        user: null,
      };

    case types.CREATE_USER_SUCCESS:
      return {
        fetching: false,
        error: null,
        user: action.payload.user,
      };

    case types.CREATE_USER_FAILED:
      return {
        fetching: false,
        error: action.payload.error,
        user: null,
      };

    default:
      return state;
  }
}
