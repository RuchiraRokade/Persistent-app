import { Quote } from '../../models/quote';
import {
  QuoteActions, ADD_QUOTE, GET_QUOTES,
  DELETE_QUOTES, UPDATE_QUOTES, DATA_LOAD, ADD_QUOTE_SUCCESS,
  UPDATE_QUOTE_SUCCESS, DELETE_QUOTE_SUCCESS
} from '../actions/quote.actions';

export interface State {
  quote: Quote[];
  success: boolean | null;
  message: string | null;
}

export const initialState: State = {
  quote: [],
  message: null,
  success: null
};
export function reducer(state: State = initialState, action: QuoteActions): State {
    switch (action.type) {
        case ADD_QUOTE: {
        return {
          ...state
        };
        }
        case GET_QUOTES: {
            return {
              ...state,
            };
      }
        case DELETE_QUOTES: {
            return {
                    ...state
            };
        }
      case UPDATE_QUOTES: {
        return {
          ...state,
        };
      }
      case DATA_LOAD: {
        return {
          quote: action.payload,
          message: null,
          success: null
        };
      }
      case ADD_QUOTE_SUCCESS: {
        return {
          quote: [...state.quote, action.payload],
          message: 'The quote is added successfully!',
          success: true
        };
      }
        case UPDATE_QUOTE_SUCCESS: {
          return {
            ...state,
            message: 'The quote is updated successfully!',
            success: true
          };
      }
      case DELETE_QUOTE_SUCCESS: {
        return {
          ...state
        };
        }
      default: {
        return state;
      }
    }
  }
