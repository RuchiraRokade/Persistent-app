import {
  ADD_QUOTE,
  AddQuote,
  AddQuoteSuccess,
  ADD_QUOTE_SUCCESS,
  GetQuotes,
  GET_QUOTES,
  LoadDataSuccess,
  DATA_LOAD,
  UpdateQuote,
  UPDATE_QUOTES,
  UPDATE_QUOTE_SUCCESS,
  DELETE_QUOTES,
  DeleteQuotes,
  UpdateQuoteSuccess,
} from './quote.actions';
import { Quote } from 'src/app/core/models/quote';
const mockQuote = {
  quote: 'If you judge people, you have no time to love them',
  description:
    'If you judge people, you have no time to love them - description',
  author: 'Dalai Lama',
  category: 'Love',
};

describe('GetAllQuotes', () => {
  it('should create an action of type ADD_QUOTE', () => {
    const action = new AddQuote(mockQuote);
    expect(action.type).toEqual(ADD_QUOTE);
  });
});

describe('AddQuoteSuccess', () => {
  it('should create an action of type ADD_QUOTE_SUCCESS', () => {
    const payload: Quote = {
      id: 3,
      quote: 'If you judge people, you have no time to love them',
      description:
        'If you judge people, you have no time to love them - description',
      author: 'Dalai Lama',
      category: 'Love',
    };
    const action = new AddQuoteSuccess(payload);
    expect({ ...action }).toEqual({
      type: ADD_QUOTE_SUCCESS,
      payload,
    });
  });
});

describe('LoadDataSuccess', () => {
  it('should create an action of type GET_QUOTES', () => {
    const payload: Quote[] = [
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
        category: 'Love new',
        id: 5,
      },
    ];
    const action = new LoadDataSuccess(payload);
    expect({ ...action }).toEqual({
      type: DATA_LOAD,
      payload,
    });
  });
});

describe('UpdateQuote', () => {
  it('should create an action of type UPDATE_QUOTES', () => {
    const payload: Quote = {
      id: 3,
      quote: 'If you judge people, you have no time to love them',
      description:
        'If you judge people, you have no time to love them - description',
      author: 'Dalai Lama',
      category: 'Love',
    };
    const action = new UpdateQuote(payload);
    expect({ ...action }).toEqual({
      type: UPDATE_QUOTES,
      payload,
    });
  });
});
describe('UpdateQuoteSuccess', () => {
  it('should create an action of type UPDATE_QUOTE_SUCCESS', () => {
    const payload: Quote = {
      id: 3,
      quote: 'If you judge people, you have no time to love them',
      description:
        'If you judge people, you have no time to love them - description',
      author: 'Dalai Lama',
      category: 'Love',
    };
    const action = new UpdateQuoteSuccess(payload);
    expect({ ...action }).toEqual({
      type: UPDATE_QUOTE_SUCCESS,
      payload,
    });
  });
});
