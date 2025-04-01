import { createAction, props } from '@ngrx/store';
import { Users } from '../../../pages/users.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: Users }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const signup = createAction('[Auth] Signup', props<{ user: Users }>());

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: Users }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: any }>()
);

export const loadPosts = createAction('[Posts] Load Posts');

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: any[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: any }>()
);

export const loadUserInfo = createAction('[User] Load User Info');

export const loadUserInfoSuccess = createAction(
  '[User] Load User Info Success',
  props<{ user: Users }>()
);

export const loadUserInfoFailure = createAction(
  '[User] Load User Info Failure',
  props<{ error: any }>()
);
