import initialState from '../../initialState';

const defaultState = initialState.auth;

// First time the reducers is execuded the `state` is null, this way we return
// the initial value desired for our slice.
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_USER':
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
