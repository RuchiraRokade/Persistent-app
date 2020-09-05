import * as auth from './reducers/auth.reducers';
import * as quote from '../quote-store/reducers/quote.reducer';
import { createFeatureSelector } from '@ngrx/store';
export interface AppState {
    authState: auth.State;
    quote: quote.State;
}

export const reducers = {
    auth: auth.reducer,
    quote: quote.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const quoteState = createFeatureSelector<AppState>('quote');
