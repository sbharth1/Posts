import { createAction, props } from '@ngrx/store';
import { Users } from '../../../pages/users.model';

// Load Users
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: Users[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());

// Create User
export const createUser = createAction('[User] Create User', props<{ user: Users }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ user: Users }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ error: any }>());

// Delete User
export const deleteUser = createAction('[User] Delete User', props<{ userId: string }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ userId: string }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: any }>());
