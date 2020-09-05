import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../models/quote';
import { Observable } from 'rxjs';
import { QuotesService } from '../services/quotes.service';
import { Store } from '@ngrx/store';
import { AppState, quoteState } from '../store/app.state';
import { GetQuotes, DeleteQuotes } from '../quote-store/actions/quote.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
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
    this.store.subscribe(data => {
      this.quotes = data.quote.quote;
    });
  }

  private loadAllQuotes(): void {
    this.store.dispatch(new GetQuotes());
  }
  public deleteQuote(id: number): void {
    this.store.dispatch(new DeleteQuotes(id));
    this.store.dispatch(new GetQuotes());
  }

  public quoteCreated(event): void {
    this.displayMessage = event;
    this.loadAllQuotes();
  }
  public quoteNotCreated(event): void {
  this.displayMessage = event;

  }
  public createQuoteForm(): void {
    localStorage.removeItem('quote');
    this.router.navigateByUrl('create');
  }

  public updateQuote(quoteToUpdate: Quote): void {
    localStorage.removeItem('quote');
    localStorage.setItem('quote', JSON.stringify(quoteToUpdate));
    this.router.navigateByUrl('update');
  }

  public closeNotification(): void {
    this.displayMessage = undefined;
  }

}
