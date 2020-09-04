import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../models/quote';
import { Observable } from 'rxjs';
import { QuotesService } from '../services/quotes.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[];
  createQuote: boolean;
  @Input() userAuthenticated: boolean;

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    this.loadAllQuotes();
    this.createQuote = false;
  }

  private loadAllQuotes(): void {
    this.quotesService.getAllQuotes().subscribe(data => {
      this.quotes = data;
      console.log('Quotes:', this.quotes);
    });
  }
  public deleteQuote(id: number): void {
    this.quotesService.deleteQuote(id)
      .subscribe(data => {
        console.log('Data after deleting...');
        this.loadAllQuotes();
      },
      error => {
        console.log('There is an error while deleting the quote');
        console.log(error);
      });
  }

  public quoteCreated(event): void {
    console.log('quoteCreated..', event);
    this.loadAllQuotes();
  }
  public errorInQuoteCreation(event): void {
  console.log('errorInQuoteCreation...', event);

  }
  public createQuoteForm(): void {
    this.createQuote = !this.createQuote;
  }

}
