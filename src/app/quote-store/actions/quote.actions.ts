import { Action } from '@ngrx/store';
import { Quote } from '../../models/quote';


export const ADD_QUOTE = '[QUOTE] ADD';
export const GET_QUOTES = '[QUOTE] GET';
export const DELETE_QUOTES = '[QUOTE] DELETE';
export const UPDATE_QUOTES = '[QUOTE] UPDATE';
export const DATA_LOAD = '[QUOTE] LOAD';
export const ADD_QUOTE_SUCCESS = '[QUOTE] ADD QUOTE SUCCESS';
export const UPDATE_QUOTE_SUCCESS = '[QUOTE] UPDATE QUOTE SUCCESS';
export const DELETE_QUOTE_SUCCESS = '[QUOTE] DELETE QUOTE SUCCESS';

export class AddQuote implements Action {
    readonly type = ADD_QUOTE;
    constructor(public payload: Quote) {
    }
}
export class GetQuotes implements Action {
    readonly type = GET_QUOTES;
    constructor() {}
}
export class DeleteQuotes implements Action {
    readonly type = DELETE_QUOTES;
    constructor(public payload: number) {}
}
export class UpdateQuote implements Action {
    readonly type = UPDATE_QUOTES;
    constructor(public payload: Quote) {}
}

export class LoadDataSuccess implements Action {
    readonly type = DATA_LOAD;
    constructor(public payload: Quote[]) {}
}
export class AddQuoteSuccess implements Action {
    readonly type = ADD_QUOTE_SUCCESS;
    constructor(public payload: Quote) {}
}
export class UpdateQuoteSuccess implements Action {
    readonly type = UPDATE_QUOTE_SUCCESS;
    constructor(public payload: Quote) {}
}
export class DeleteQuoteSuccess implements Action {
    readonly type = DELETE_QUOTE_SUCCESS;
  }
export type QuoteActions =
    AddQuote |
    GetQuotes | DeleteQuotes | UpdateQuote | LoadDataSuccess | AddQuoteSuccess | UpdateQuoteSuccess | DeleteQuoteSuccess;
