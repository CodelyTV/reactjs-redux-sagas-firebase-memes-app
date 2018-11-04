import initialState from '../../initialState';

const defaultState = initialState.auth;

// First time the reducers is executed the `state` is null, this way we return
// the initial value desired for our slice.
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_USER_START':
      return {
        fetching: true,
        user: null,
        error: null,
      };

    case 'NEW_USER_FAILURE':
      return {
        fetching: false,
        user: null,
        error: action.payload.error,
      };

    case 'NEW_USER_SUCCESS':
      return {
        fetching: false,
        user: action.payload.user,
        error: null,
      };

    default:
      return state;
  }
};
