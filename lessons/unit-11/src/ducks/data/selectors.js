import { createSelector } from 'reselect';

const sparksSelector = state => state.sparks;

export const dataSelector = createSelector(
  sparksSelector,
  sparks => sparks.data,
);

export const fetchingSelector = createSelector(
  sparksSelector,
  sparks => sparks.fetching,
);

export const errorSelector = createSelector(
  sparksSelector,
  sparks => sparks.error,
);
