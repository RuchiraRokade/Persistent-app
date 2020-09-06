import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuotesService } from './quotes.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';

describe('QuotesService', () => {
  let service: QuotesService;
  let httpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [QuotesService],
    });
  });
  it('should be created', () => {
    const service1 = TestBed.inject(QuotesService);
    expect(service1).toBeTruthy();
  });
});
