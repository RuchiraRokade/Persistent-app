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
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  private setUserData(): void {
    this.user = {
      email: this.email,
      password: this.password,
      name: this.name,
    };
  }
  private setLoginUserData(): void {
    this.loginUser = {
      email: this.loginEmail,
      password: this.loginPassword,
    };
  }
  public signUp(): void {
    this.setUserData();
    this.store.dispatch(new SignUp(this.user));
  }

  public login(): void {
    this.setLoginUserData();
    this.store.dispatch(new LogIn(this.loginUser));
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

  get loginPassword(): string {
    return this.loginForm.get('password').value;
  }
  get loginEmail(): string {
    return this.loginForm.get('email').value;
  }
}
