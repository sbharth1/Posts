import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, signupSuccess, signupFailure, loadPostsSuccess, loadPostsFailure, loadUserInfoSuccess, loadUserInfoFailure } from './user.action';
import { Users } from '../../../pages/users.model';

export interface UserState {
  user: Users | null;
  posts: any[];
  error: string | null;
  token: string | null;
}

export const initialState: UserState = {
  user: null,
  posts: [],
  error: null,
  token: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    user,
    token,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    error: null,
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadUserInfoSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(loadUserInfoFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
