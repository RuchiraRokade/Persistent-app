import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.state';
import { SignUp } from '../store/actions/user.actions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public user: User;
  public signUpForm: FormGroup;
  public errorMessage: string;
  getState: Observable<any>;
  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit(): void {
    this.initializeSignUpForm();
    this.setUserData();
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  private initializeSignUpForm(): void{
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  private setUserData(): void {
    this.user = new User(this.email, this.password, this.name);
    console.log('User', this.user);
  }
  public signUp(): void {
    this.setUserData();
    this.store.dispatch(new SignUp(this.user));
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
