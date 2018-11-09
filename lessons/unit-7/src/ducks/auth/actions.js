import * as types from './types';

/**
 * Create user actions
 */
export const createUserRequest = ({ username, email, password }) => ({
  type: types.CREATE_USER_REQUEST,
  payload: {
    username,
    email,
    password,
  },
});
export const createUserStart = () => ({
  type: types.CREATE_USER_START,
});
export const createUserSuccess = user => ({
  type: types.CREATE_USER_SUCCESS,
  payload: {
    user,
  },
});
export const createUserFailed = error => ({
  type: types.CREATE_USER_FAILED,
  payload: {
    error,
  },
});

/**
 * Login user actions
 */
export const loginUserRequest = ({ email, password }) => ({
  type: types.LOGIN_USER_REQUEST,
  payload: {
    email,
    password,
  },
});
export const loginUserStart = () => ({
  type: types.LOGIN_USER_START,
});
export const loginUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  payload: {
    user,
  },
});
export const loginUserFailed = error => ({
  type: types.LOGIN_USER_FAILED,
  payload: {
    error,
  },
});

/**
 * Logiut user action
 */
export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});
