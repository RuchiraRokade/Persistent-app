import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Quote } from '../models/quote';
import { QuotesService } from '../services/quotes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {
  newQuote: Quote;
  submitted: false;
  createQuoteForm: FormGroup;
  @Output() quoteCreatedSuccessfully = new EventEmitter<string>();
  @Output() errorInQuoteCreation = new EventEmitter<string>();
  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    this.initializeCreateQuoteForm();
  }

  private initializeCreateQuoteForm(): void {
    this.createQuoteForm = new FormGroup({
      quote: new FormControl('', Validators.required),
      description: new FormControl(''),
      author: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }
  get quote(): string{
    return this.createQuoteForm.get('quote').value;
  }
  get description(): string{
    return this.createQuoteForm.get('description').value;
  }
  get author(): string{
    return this.createQuoteForm.get('author').value;
  }
  get category(): string{
    return this.createQuoteForm.get('category').value;
  }

  public createNewQuote(): void {
    this.newQuote = new Quote(this.quote, this.description, this.author, this.category);
    this.quotesService.createQuote(this.newQuote).subscribe(data => {
      if (data && data.id) {
        this.quoteCreatedSuccessfully.emit('Quote created successfully!');
      } else {
        this.errorInQuoteCreation.emit('Oops, there was an error in creating the quote!');
      }
    }, error => {
        console.error('There was an error in creating the quote..', error);
        this.errorInQuoteCreation.emit('Oops, there was an error in creating the quote!');
      });
  }

}
