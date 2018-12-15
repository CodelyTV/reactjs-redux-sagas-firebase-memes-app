import * as types from './types';
import initialState from '../../initialState';

const defaultState = initialState.sparks;

export default function (state = defaultState, action) {
  switch (action.type) {
    case types.POST_SPARK_START:
    case types.THUMBS_UP_START: {
      return {
        ...state,
        fetching: true,
        error: null,
      };
    }

    case types.LOAD_SPARKS_START: {
      return {
        ...state,
        fetching: true,
        error: null,
        data: action.payload.clear ? [] : [...state.data],
      };
    }

    case types.POST_SPARK_SUCCESS: {
      return {
        ...state,
        fetching: false,
        error: null,
      };
    }

    case types.LOAD_SPARKS_SUCCESS: {
      return {
        ...state,
        data: [...state.data].concat(action.payload.sparks),
        fetching: false,
        error: null,
      };
    }

    case types.POST_SPARK_FAILED:
    case types.LOAD_SPARKS_FAILED:
    case types.THUMBS_UP_FAILED: {
      return {
        ...state,
        fetching: false,
        error: action.payload.error,
      };
    }

    case types.THUMBS_UP_SUCCESS: {
      const { spark } = action.payload;
      const newData = state.data.map(item => (item.key === spark.key ? spark : item));

      return {
        ...state,
        data: newData,
        fetching: false,
        error: null,
      };
    }

    default:
      return state;
  }
}
