import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Quote } from '../../models/quote';
import { QuotesService } from '../../services/quotes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, quoteState } from '../../store/app.state';
import {
  AddQuote,
  GetQuotes,
  UpdateQuote,
} from '../../quote-store/actions/quote.actions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss'],
})
export class CreateQuoteComponent implements OnInit {
  existingQuote: Quote;

  displayUpdate: boolean;

  newQuote: Quote;

  submitted: false;

  createQuoteForm: FormGroup;

  getState: Observable<any>;

  quoteId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private quotesService: QuotesService
  ) {
    this.getState = this.store.select(quoteState);
  }

  ngOnInit(): void {
    if (this.route.snapshot.params && this.route.snapshot.params.id) {
      this.quoteId = this.route.snapshot.params.id;
      this.quotesService.getByQuoteId(this.quoteId).subscribe((data: Quote) => {
        this.existingQuote = data;
        this.initializeCreateQuoteForm(this.existingQuote);
      });
    }
    this.initializeCreateQuoteForm(this.existingQuote);

    this.store.subscribe((data) => {
      if (data) {
        if (data.quote.success) {
          this.createQuoteForm.reset();
        }
      }
      this.route.data.subscribe((params) => {
        if (params && params.isUpdate) {
          this.displayUpdate = params.isUpdate;
        } else {
          this.displayUpdate = false;
        }
      });
    });
  }

  private initializeCreateQuoteForm(existingQuote?: Quote): void {
    if (existingQuote) {
      this.createQuoteForm = new FormGroup({
        quote: new FormControl(existingQuote.quote, Validators.required),
        description: new FormControl(existingQuote.description),
        author: new FormControl(existingQuote.author, Validators.required),
        category: new FormControl(existingQuote.category, Validators.required),
      });
    } else {
      this.createQuoteForm = new FormGroup({
        quote: new FormControl('', Validators.required),
        description: new FormControl(''),
        author: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
      });
    }
  }

  get quote(): string {
    return this.createQuoteForm.get('quote').value;
  }

  get description(): string {
    return this.createQuoteForm.get('description').value;
  }

  get author(): string {
    return this.createQuoteForm.get('author').value;
  }

  get category(): string {
    return this.createQuoteForm.get('category').value;
  }

  public createOrUpdateQuote(): void {
    if (this.displayUpdate) {
      this.newQuote = {
        quote: this.quote,
        description: this.description,
        author: this.author,
        category: this.category,
        id: this.existingQuote.id,
      };
      this.store.dispatch(new UpdateQuote(this.newQuote));
      this.store.dispatch(new GetQuotes());
      this.router.navigate(['/']);
    } else {
      this.newQuote = {
        quote: this.quote,
        description: this.description,
        author: this.author,
        category: this.category,
      };
      this.store.dispatch(new AddQuote(this.newQuote));
      this.store.dispatch(new GetQuotes());
      this.router.navigate(['/']);
    }
  }
  public gotoHome(): void {
    this.router.navigate(['/']);
  }
}
