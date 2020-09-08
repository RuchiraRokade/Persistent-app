import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Quote } from '../../core/models/quote';
import {
  DeleteQuotes,
  GetQuotes,
} from '../../quote/quote-store/actions/quote.actions';
import { AppState, quoteState } from '../../sign-up/store/app.state';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[];

  createQuote: boolean;

  @Input() userAuthenticated: boolean;

  displayMessage: string;

  quoteToUpdate: Quote;

  getState: Observable<any>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.getState = this.store.select(quoteState);
  }

  ngOnInit(): void {
    this.loadAllQuotes();
    this.createQuote = false;
    this.store.subscribe((data) => {
      this.quotes = data.quote.quote;
    });
  }

  private loadAllQuotes(): void {
    this.store.dispatch(new GetQuotes());
  }

  public deleteQuote(id: number): void {
    const deleteResult = window.confirm(
      'Are you sure you want to delete this quote?'
    );
    if (deleteResult) {
      this.store.dispatch(new DeleteQuotes(id));
      this.store.dispatch(new GetQuotes());
    }
  }

  public quoteCreated(event: any): void {
    this.displayMessage = event;
    this.loadAllQuotes();
  }

  public quoteNotCreated(event: any): void {
    this.displayMessage = event;
  }

  public createQuoteForm(): void {
    this.router.navigateByUrl('create');
  }

  public updateQuote(quoteToUpdate: Quote): void {
    this.router.navigateByUrl('update/' + quoteToUpdate.id);
  }

  public closeNotification(): void {
    this.displayMessage = undefined;
  }
}
