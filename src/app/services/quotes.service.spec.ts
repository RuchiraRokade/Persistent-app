import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Quote } from '../models/quote';
import { QuotesService } from './quotes.service';

const dummyPosts: Quote[] = [
  {
    id: 3,
    quote: 'If you judge people, you have no time to love them',
    description:
      'If you judge people, you have no time to love them - description',
    author: 'Dalai Lama',
    category: 'Love',
  },
  {
    quote: 'Be kind whenever possible. It is always possible',
    description:
      'Be kind whenever possible. It is always possible- description',
    author: 'Dalai Lama',
    category: 'Love',
    id: 5,
  },
  {
    quote: 'foo -updated',
    description: 'foo - update',
    author: 'foo - updated',
    category: 'foo - updated',
    id: 6,
  },
];
describe('QuotesService', () => {
  let service: QuotesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuotesService],
    });
    this.service = TestBed.inject(QuotesService);
  });

  beforeEach(inject(
    [QuotesService, HttpTestingController],
    (serviceInstance, httpMockInstance) => {
      service = serviceInstance;
      httpMock = httpMockInstance;
    }
  ));

  it('should be created', () => {
    const service1 = TestBed.inject(QuotesService);
    expect(service1).toBeTruthy();
  });

  it('getById: should return a product by given id', () => {
    this.service.getByQuoteId(3).subscribe((quote) => {
      expect(quote.author).toBe('Dalai Lama');
    });
    const req = httpMock.expectOne('http://localhost:3000/quotes/3');
    req.flush(dummyPosts);
    httpMock.verify();
  });
  it('getAllQuotes: should return a list', () => {
    this.service.getAllQuotes().subscribe((quotes) => {
      expect(quotes).toBeDefined();
      expect(quotes.length).toBe(3);
      const req = httpMock.expectOne('http://localhost:3000/quotes');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });
  it('delete: should return an empty object', () => {
    this.service.deleteQuote().subscribe((quotes) => {
      expect(quotes).toBeDefined();
      const req = httpMock.expectOne('http://localhost:3000/quotes');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });
  it('create: should create a quote and return the created quote', () => {
    const quoteTobeCreated = {
      quote: 'foo -updated',
      description: 'foo - update',
      author: 'foo - updated',
      category: 'foo - updated',
    };
    this.service.createQuote(quoteTobeCreated).subscribe((quotes) => {
      expect(quotes).toBeDefined();
      expect(quotes.length).toBe(1);
      const req = httpMock.expectOne('http://localhost:3000/quotes');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });
  it('update: should update a quote and return the updated quote', () => {
    const quoteTobeCreated = {
      quote: 'foo -updated',
      description: 'foo - update',
      author: 'foo - updated',
      category: 'foo - updated',
    };
    this.service.updateQuote(quoteTobeCreated).subscribe((quotes) => {
      expect(quotes).toBeDefined();
      expect(quotes.length).toBe(1);
      const req = httpMock.expectOne('http://localhost:3000/quotes');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });
});
