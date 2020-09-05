import { Injectable } from '@angular/core';
import { QuotesService } from '../../services/quotes.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, switchMap, tap, mergeMap, take, pluck } from 'rxjs/operators';
import {
    QuoteActions, ADD_QUOTE, GET_QUOTES,
    DELETE_QUOTES, UPDATE_QUOTES, GetQuotes,
    LoadDataSuccess, AddQuoteSuccess, AddQuote,
    DeleteQuotes, UpdateQuote, UpdateQuoteSuccess, DeleteQuoteSuccess
} from '../actions/quote.actions';
import { Quote } from '../../models/quote';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class QuoteEffects {
 constructor(private quoteService: QuotesService, private actions: Actions) {
    }
    @Effect({dispatch: true})
    GetQuotes: Observable<any> =  this.actions.pipe(
                ofType(GET_QUOTES),
                map((action: GetQuotes) => action),
                mergeMap(payload => {
                    return this.quoteService.getAllQuotes().pipe(
                        map((data) => {
                            return new LoadDataSuccess(data);
                        }));
                }));
//     @Effect({ dispatch: false })
//     LogInSuccess: Observable<any> = this.actions.pipe(
//       ofType(GET_QUOTES),
//       tap((user) => {
//         localStorage.setItem('user', JSON.stringify(user.payload));
//         this.router.navigateByUrl('/');
//       })
// );
@Effect({dispatch: true})
    CreateQuotes: Observable<any> =  this.actions.pipe(
            ofType(ADD_QUOTE),
            map((action: AddQuote) => action.payload),
            mergeMap(payload => {
                return this.quoteService.createQuote(payload).pipe(
                    map((data) => {
                        if (data) {
                            return new AddQuoteSuccess(data);
                        }
                    }));
            }));
            @Effect({dispatch: true})
            DeleteQuote: Observable<any> =  this.actions.pipe(
                        ofType(DELETE_QUOTES),
                        map((action: DeleteQuotes) => action.payload),
                        mergeMap(payload => {
                            return this.quoteService.deleteQuote(payload).pipe(
                                map((data) => {
                                    return new DeleteQuoteSuccess();
                                }));
                        }));
            @Effect({dispatch: true})
            UpdateQuotes: Observable<any> =  this.actions.pipe(
                    ofType(UPDATE_QUOTES),
                    map((action: UpdateQuote) => action.payload),
                    mergeMap(payload => {
                        return this.quoteService.updateQuote(payload).pipe(
                            map((data) => {
                                if (data) {
                                    return new UpdateQuoteSuccess(data);
                                }
                            }));
                    }));
}
