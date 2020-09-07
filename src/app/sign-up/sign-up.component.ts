import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.state';
import { SignUp, LogIn } from '../store/actions/user.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public user: User;
  public loginUser: User;

  public signUpForm: FormGroup;

  public loginForm: FormGroup;

  public errorMessage: string;

  getState: Observable<any>;

  displayLogin: boolean;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.initializeSignUpForm();
    this.setUserData();
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.errorMessage = undefined;
    this.route.data.subscribe((params) => {
      if (params && params.isLogin) {
        this.displayLogin = params.isLogin;
      } else {
        this.displayLogin = false;
      }
    });
  }

  private initializeSignUpForm(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public loginOrRegister(): void {
    this.setUserData();
    if (this.displayLogin) {
      this.store.dispatch(new LogIn(this.user));
    } else {
      this.store.dispatch(new SignUp(this.user));
    }
  }

  private setUserData(): void {
    this.user = {
      email: this.email,
      password: this.password,
      name: this.name,
    };
  }

  get name(): string {
    return this.signUpForm.get('name').value;
  }
  get email(): string {
    return this.signUpForm.get('email').value;
  }
  get password(): string {
    return this.signUpForm.get('password').value;
  }
}
