import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.state';
import { LogIn } from '../store/actions/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;
  public signUpForm: FormGroup;
  public errorMessage: string;
  getState: Observable<any>;
  constructor(private authService: AuthService, private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.initializeSignUpForm();
    this.setUserData();
    // this.errorMessage = this.authService.errorMessage;
    // console.log('errorMessage:', this.errorMessage);
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  private initializeSignUpForm(): void{
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  get email(): string {
    return this.signUpForm.get('email').value;
  }
  get password(): string {
    return this.signUpForm.get('password').value;
  }
  public setUserData(): void {
    this.user = new User(this.email, this.password);
    console.log('User', this.user);
  }
  public login(): void{
    this.setUserData();
    // this.store.dispatch(new LoginComponent(this.user));
    this.store.dispatch(new LogIn(this.user));
  }

}
