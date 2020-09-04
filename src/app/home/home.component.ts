import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.state';
import { Logout } from '../store/actions/user.actions';
import { Observable } from 'rxjs';
import { QuotesService } from '../services/quotes.service';
import { Quote } from '../models/quote';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: false;
  quotes: Quote[];
  user = null;
  errorMessage = null;
  constructor(private store: Store<AppState>, private quotesService: QuotesService) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      console.log(state);
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
    // this.loadAllQuotes();
  }
  public logout(): void {
    this.store.dispatch(new Logout());
  }
  // private loadAllQuotes(): void {
  //   this.quotesService.getAllQuotes().subscribe(data => {
  //     this.quotes = data;
  //     console.log('Quotes:', this.quotes);
  //   });
  // }
}
