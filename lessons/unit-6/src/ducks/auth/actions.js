export const newUserRequest = ({ username, email, password }) => ({
  type: 'NEW_USER_REQUEST',
  payload: {
    username,
    email,
    password,
  },
});

export const newUserStart = () => ({
  type: 'NEW_USER_START',
});

export const newUserSuccess = user => ({
  type: 'NEW_USER_SUCCESS',
  payload: {
    user,
  },
});

export const newUserFailure = error => ({
  type: 'NEW_USER_FAILURE',
  payload: {
    error,
  },
});
