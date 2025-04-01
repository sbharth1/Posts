import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../service/api.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  login,
  loginSuccess,
  loginFailure,
  signup,
  signupSuccess,
  signupFailure,
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  loadUserInfo,
  loadUserInfoSuccess,
  loadUserInfoFailure
} from './user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) =>
        this.apiService.login(credentials).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            return loginSuccess({ token: response.token, user: response.user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(({ user }) =>
        this.apiService.signup(user).pipe(
          map((response) => signupSuccess({ user: response.user })),
          catchError((error) => of(signupFailure({ error })))
        )
      )
    )
  );

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.apiService.getPosts().pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError((error) => of(loadPostsFailure({ error })))
        )
      )
    )
  );

  loadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserInfo),
      mergeMap(() =>
        this.apiService.getUserInfo().pipe(
          map((user) => loadUserInfoSuccess({ user })),
          catchError((error) => of(loadUserInfoFailure({ error })))
        )
      )
    )
  );
}
