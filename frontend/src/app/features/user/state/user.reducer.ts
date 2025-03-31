import { createReducer, on } from '@ngrx/store';
import { Users } from '../../../pages/users.model';
import { createUserSuccess, deleteUserSuccess, loadUsersSuccess } from './user.action';

export interface UserState {
  users: Users[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(u => u.id !== userId),
  }))
);
