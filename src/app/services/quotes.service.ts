import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quote } from '../models/quote';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  readonly BASE_URL = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  public getAllQuotes(): Observable<Quote[]> {
    const getAllQuotesUrl = encodeURI('quotes');
    return this.http
      .get<Quote[]>(`${this.BASE_URL + getAllQuotesUrl}`)
      .pipe(retry(1), catchError(this.errorCatcher));
  }

  public createQuote(quote: Quote): Observable<Quote> {
    const createUrl = encodeURI('quotes');
    return this.http
      .post<Quote>(`${this.BASE_URL + createUrl}`, quote, this.httpOptions)
      .pipe(catchError(this.errorCatcher));
  }

  public updateQuote(updatedQuote: Quote): Observable<Quote> {
    const updateQuoteUrl = encodeURI(`quotes/${updatedQuote.id}`);
    return this.http
      .patch<Quote>(
        `${this.BASE_URL + updateQuoteUrl}`,
        updatedQuote,
        this.httpOptions
      )
      .pipe(catchError(this.errorCatcher));
  }

  public getByQuoteId(id: number): Observable<Quote> {
    console.log('id..', id);
    return this.http
      .get<Quote>(this.BASE_URL + 'quotes/' + id)
      .pipe(catchError(this.errorCatcher));
  }

  public deleteQuote(id: number): Observable<Quote> {
    const deleteQuoteUrl = encodeURI(`quotes/${id}`);
    return this.http
      .delete<Quote>(`${this.BASE_URL + deleteQuoteUrl}`)
      .pipe(catchError(this.errorCatcher));
  }

  errorCatcher(error): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
