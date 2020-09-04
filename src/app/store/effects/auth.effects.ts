// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/switchMap';

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// import { AuthService } from '../../services/auth.service';
// import { AuthActionTypes, LogInFailure, LogInSuccess } from '../actions/user.actions';

// // import { Actions, ofType, Effect,  } from '@ngrx/effects';
// // import { Router } from '@angular/router';
// // import { Observable, of } from 'rxjs';
// // import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
         AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure,
    SignUp, SignUpSuccess, SignUpFailure,
    Logout
} from '../actions/user.actions';
@Injectable()
export class AuthEffects {
    /**
     *
     */
    constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router) { }
          @Effect({ dispatch: false })
          LogInSuccess: Observable<any> = this.actions.pipe(
            ofType(AuthActionTypes.LOGIN_SUCCESS),
            tap((user) => {
              localStorage.setItem('user', JSON.stringify(user.payload));
              this.router.navigateByUrl('/');
            })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap((err) => {
            console.log(err);
            this.authService.errorMessage = err.payload.error;
        })
    );


    // @Effect()
    // LogIn: Observable<any> = this.actions
    //   .ofType(AuthActionTypes.LOGIN)
    //   .map((action: LogIn) => action.payload)
    //   .switchMap(payload => {
    //       return this.authService.login({ email: payload.email, password: payload.password })
    //       .pipe(map((user) => {
    //         console.log(user);
    //         return new LogInSuccess({password: user.password, email: payload.email});
    //       }))
    //       .catch((error) => {
    //         console.log(error);
    //         return of(new LogInFailure({ error: error }));
    //       });
    //   });
    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload => {
            return this.authService.login(payload).pipe(
                map((user) => {
                    if ( user.length > 0) {
                    return new LogInSuccess({ email: payload.email });
                    } else {
                        return new LogInFailure({ error: 'Invalid credentials' });
                    }
                }));
                // .catchError ((error) => {
                //                             return Observable.of(new LogInFailure({ error: error }));
                //                         })
        }));

    @Effect({dispatch: false})
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((user) => {
        console.log(user);
        console.log('User signed up successfully!');
        localStorage.setItem('user', user.payload);
        this.router.navigateByUrl('/');
        })
    );
    /**
     * TODO: Combine signupFailure and login failure to create a single effect
     */
    @Effect({dispatch: false})
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE),
        tap((user) => {
       console.log('There was an issue while signing up for the user!');
        })
    );
    @Effect()
    SignUp: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: SignUp) => action.payload),
        switchMap(payload => {
            return this.authService.signUp(payload).pipe(
                map((data) => {
                    console.log('signup effects...', data);
                    return new SignUpSuccess(data);
//                     if (data.length > 0) {
//                     return new SignUpSuccess(data);
//                     }
                    // else {
                    //     return new LogInFailure({ error: 'Invalid credentials' });
                    // }
                }));
        }));
    
    @Effect({dispatch: false})
    Logout: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('user');
        })
    );

}
