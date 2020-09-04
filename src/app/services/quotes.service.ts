import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quote } from '../models/quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private BASE_URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  // Read
  public getAllQuotes(): Observable<Quote[]> {
    const getAllQuotesUrl = encodeURI('quotes');
    return this.http.get<Quote[]>(`${this.BASE_URL + getAllQuotesUrl}`);
  }

  // Create
  public createQuote(quote: Quote): Observable<Quote>{
    const createUrl = encodeURI('quotes');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Quote>(`${this.BASE_URL + createUrl}`, quote, httpOptions);
  }
  // Update
  public updateQuote(updatedQuote: Quote): Observable<Quote>{
    const updateQuoteUrl = encodeURI(`quotes/${updatedQuote.id}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.patch<Quote>(`${this.BASE_URL + updateQuoteUrl}`, updatedQuote, httpOptions);
  }
  // Delete
  public deleteQuote(id: number): Observable<any> {
    const deleteQuoteUrl = encodeURI(`quotes/${id}`);
    return this.http.delete<Quote>(`${this.BASE_URL + deleteQuoteUrl}`);
  }
}
