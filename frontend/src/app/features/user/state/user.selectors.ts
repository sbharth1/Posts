import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(selectUserState, (state: UserState) => state.users);
export const selectUserById = (id: string) =>
  createSelector(selectUserState, (state: UserState) => state.users.find(user => user.id === id));
export const selectLoading = createSelector(selectUserState, (state: UserState) => state.loading);
