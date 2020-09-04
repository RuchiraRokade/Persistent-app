import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:3000/';
  private _errorMessage: string;
  get errorMessage(): string {
    return this._errorMessage;
  }
  set errorMessage(message: string) {
    this._errorMessage = message;
  }

  constructor(private http: HttpClient) {
    this.errorMessage = '';
   }

  login(user: User): Observable<User[]>{
    console.log('inside login..');
    const loginUrl = encodeURI('users?email=' + user.email + '&password=' + user.password);
    return this.http.get<User[]>(this.BASE_URL + loginUrl);
  }
  signUp(user: User): Observable<User> {
    console.log('inside auth service signup...', user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const signUpUrl = encodeURI('users');
    return this.http.post<User>(this.BASE_URL + signUpUrl, user, httpOptions);
  }
}
