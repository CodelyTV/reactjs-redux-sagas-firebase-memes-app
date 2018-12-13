import * as types from './types';

export const postSparkRequest = data => ({
  type: types.POST_SPARK_REQUEST,
  payload: {
    data,
  },
});
export const postSparkStart = () => ({
  type: types.POST_SPARK_START,
});
export const postSparkSuccess = () => ({
  type: types.POST_SPARK_SUCCESS,
});
export const postSparkFailed = error => ({
  type: types.POST_SPARK_FAILED,
  payload: {
    error,
  },
});
