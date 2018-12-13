import * as types from './types';
import initialState from '../../initialState';

const defaultState = initialState.sparks;

export default function (state = defaultState, action) {
  switch (action.type) {
    case types.POST_SPARK_START:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case types.POST_SPARK_SUCCESS: {
      return {
        ...state,
        fetching: false,
        error: null,
      };
    }

    case types.POST_SPARK_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
