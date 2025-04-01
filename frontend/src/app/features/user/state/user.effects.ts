import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
} from './user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions) {}
  //  fake data for testing
  private mockUsers = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
  ];

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() => {
        return of(this.mockUsers).pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        );
      })
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap((action) =>
        of(action.user).pipe(
          map((user) => createUserSuccess({ user })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        of(action.userId).pipe(
          map(() => deleteUserSuccess({ userId: action.userId })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );
}
