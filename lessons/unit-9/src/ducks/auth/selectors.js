import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const userSelector = createSelector(
  authSelector,
  auth => auth.user,
);

export const fetchingSelector = createSelector(
  authSelector,
  auth => auth.fetching,
);

export const errorSelector = createSelector(
  authSelector,
  auth => auth.error,
);
