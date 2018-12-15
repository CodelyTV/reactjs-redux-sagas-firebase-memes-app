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

export const loadSparksRequest = ({ uid, lastKey }) => ({
  type: types.LOAD_SPARKS_REQUEST,
  payload: {
    uid,
    lastKey,
  },
});
export const loadSparksStart = clear => ({
  type: types.LOAD_SPARKS_START,
  payload: {
    clear,
  },
});
export const loadSparksSuccess = sparks => ({
  type: types.LOAD_SPARKS_SUCCESS,
  payload: {
    sparks,
  },
});
export const loadSparksFailed = error => ({
  type: types.LOAD_SPARKS_FAILED,
  payload: {
    error,
  },
});


export const thumbsUpRequest = key => ({
  type: types.THUMBS_UP_REQUEST,
  payload: {
    key,
  },
});
export const thumbsUpStart = () => ({
  type: types.THUMBS_UP_START,
});
export const thumbsUpSuccess = spark => ({
  type: types.THUMBS_UP_SUCCESS,
  payload: {
    spark,
  },
});
export const thumbsUpFailed = error => ({
  type: types.THUMBS_UP_FAILED,
  payload: {
    error,
  },
});
