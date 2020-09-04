import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../models/quote';

@Component({
  selector: 'app-quote-item',
  templateUrl: './quote-item.component.html',
  styleUrls: ['./quote-item.component.scss']
})
export class QuoteItemComponent implements OnInit {
  @Input() quote: Quote;
  @Input() userAuthenticated: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
