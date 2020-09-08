import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { QuotesService } from '../../../core/services/quotes.service';
import {
  AddQuote,
  AddQuoteSuccess,
  ADD_QUOTE,
  DeleteQuotes,
  DeleteQuoteSuccess,
  DELETE_QUOTES,
  GetQuotes,
  GET_QUOTES,
  LoadDataSuccess,
  UpdateQuote,
  UpdateQuoteSuccess,
  UPDATE_QUOTES,
} from '../actions/quote.actions';

@Injectable()
export class QuoteEffects {
  constructor(private quoteService: QuotesService, private actions: Actions) {}
  @Effect({ dispatch: true })
  GetQuotes: Observable<any> = this.actions.pipe(
    ofType(GET_QUOTES),
    map((action: GetQuotes) => action),
    mergeMap((payload) => {
      return this.quoteService.getAllQuotes().pipe(
        map((data) => {
          return new LoadDataSuccess(data);
        })
      );
    })
  );
  //     @Effect({ dispatch: false })
  //     LogInSuccess: Observable<any> = this.actions.pipe(
  //       ofType(GET_QUOTES),
  //       tap((user) => {
  //         localStorage.setItem('user', JSON.stringify(user.payload));
  //         this.router.navigateByUrl('/');
  //       })
  // );
  @Effect({ dispatch: true })
  CreateQuotes: Observable<any> = this.actions.pipe(
    ofType(ADD_QUOTE),
    map((action: AddQuote) => action.payload),
    mergeMap((payload) => {
      return this.quoteService.createQuote(payload).pipe(
        map((data) => {
          if (data) {
            return new AddQuoteSuccess(data);
          }
        })
      );
    })
  );
  @Effect({ dispatch: true })
  DeleteQuote: Observable<any> = this.actions.pipe(
    ofType(DELETE_QUOTES),
    map((action: DeleteQuotes) => action.payload),
    mergeMap((payload) => {
      return this.quoteService.deleteQuote(payload).pipe(
        map((data) => {
          return new DeleteQuoteSuccess();
        })
      );
    })
  );
  @Effect({ dispatch: true })
  UpdateQuotes: Observable<any> = this.actions.pipe(
    ofType(UPDATE_QUOTES),
    map((action: UpdateQuote) => action.payload),
    mergeMap((payload) => {
      return this.quoteService.updateQuote(payload).pipe(
        map((data) => {
          if (data) {
            return new UpdateQuoteSuccess(data);
          }
        })
      );
    })
  );
}
