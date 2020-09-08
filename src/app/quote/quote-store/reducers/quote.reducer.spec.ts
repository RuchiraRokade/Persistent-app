import { reducer } from './quote.reducer';
import { QuoteActions, AddQuote } from '../actions/quote.actions';
import { Quote } from 'src/app/core/models/quote';
import { State } from './quote.reducer';

const quotePayload: Quote = {
  id: 3,
  quote: 'If you judge people, you have no time to love them',
  description:
    'If you judge people, you have no time to love them - description',
  author: 'Dalai Lama',
  category: 'Love',
};

function createMockState(
  payload: any,
  statusMessage: string,
  status: boolean,
  isPayloadArray: boolean
): State {
  return {
    quote: isPayloadArray ? [payload] : payload,
    success: status,
    message: statusMessage,
  };
}

describe('initialState', () => {
  it('is correct', () => {
    const action: QuoteActions = {
      type: '[QUOTE] ADD',
      payload: quotePayload,
    };
    const initialState = { quote: [], message: null, success: null };
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});
describe('Add Quote', () => {
  it('returns the new state after adding the quote', () => {
    const addQuoteAction: QuoteActions = {
      type: '[QUOTE] ADD',
      payload: quotePayload,
    };
    const expectedState = createMockState(
      quotePayload,
      'Quote added successfully!',
      true,
      false
    );
    expect(reducer(expectedState, addQuoteAction)).toEqual(expectedState);
  });
});
describe('Get Quote', () => {
  it('should return the new state after getting all the quotes', () => {
    const getQuoteAction: QuoteActions = {
      type: '[QUOTE] GET',
    };
    const expectedState = createMockState(
      quotePayload,
      'Quotes loaded successfully!',
      true,
      false
    );
    expect(reducer(expectedState, getQuoteAction)).toEqual(expectedState);
  });
});
describe('Delete Quote', () => {
  it('should return the new state after deleting the quote', () => {
    const deleteQuoteAction: QuoteActions = {
      type: '[QUOTE] DELETE',
      payload: 3,
    };
    const expectedState = createMockState(
      quotePayload,
      'Quote delete action triggered successfully!',
      true,
      false
    );
    expect(reducer(expectedState, deleteQuoteAction)).toEqual(expectedState);
  });
});
describe('Update Quote', () => {
  it('should return the new state after updating the quote', () => {
    const updateQuoteAction: QuoteActions = {
      type: '[QUOTE] UPDATE',
      payload: quotePayload,
    };
    const expectedState = createMockState(
      quotePayload,
      'Quote update action triggered successfully!',
      true,
      false
    );
    expect(reducer(expectedState, updateQuoteAction)).toEqual(expectedState);
  });
});
describe('When no action is passed', () => {
  it('should return the passed state when no action is passed', () => {
    const passedState: State = {
      quote: [quotePayload],
      message: null,
      success: null,
    };
    expect(reducer(passedState, Object.assign({}))).toEqual(passedState);
  });
});
