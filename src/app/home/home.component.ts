import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Quote } from '../core/models/quote';
import { Logout } from '../sign-up/store/actions/user.actions';
import { AppState, selectAuthState } from '../sign-up/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getState: Observable<any>;

  isAuthenticated: false;

  quotes: Quote[];

  user = null;

  errorMessage = null;

  isDarkTheme = false;

  constructor(private store: Store<AppState>, private router: Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public gotoLogin(): void {
    this.router.navigateByUrl('login');
  }

  public gotoSignUp(): void {
    this.router.navigateByUrl('sign-up');
  }
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
