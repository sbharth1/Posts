import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = (state:any) => state.user;

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectAuthToken = createSelector(
  selectUserState,
  (state: UserState) => state.token
);

export const selectAuthError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserPosts = createSelector(
  selectUserState,
  (state: UserState) => state.posts
);
