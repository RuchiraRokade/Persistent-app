import { User } from '../../../core/models/User';
import { State, reducer } from './auth.reducers';
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  Logout,
} from '../actions/user.actions';

const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};
const mockUser: User = {
  email: 'user1@test.com',
  name: 'user',
  password: 'test',
};
const validatedUser: User = {
  email: 'user1@test.com',
  password: 'test',
};
const invalidUser: User = {
  email: 'aa@zz.com',
  password: 'test1233',
};
describe('When no action is passed', () => {
  it('should return the passed state when no action is passed', () => {
    const passedState: State = {
      isAuthenticated: true,
      user: null,
      errorMessage: null,
    };
    expect(reducer(passedState, Object.assign({}))).toEqual(passedState);
  });
});

describe('LogIn', () => {
  it('should return the user object after verifying the user credentials', () => {
    const loginAction = new LogIn(mockUser);
    const passedState: State = {
      isAuthenticated: true,
      user: mockUser,
      errorMessage: null,
    };
    expect(reducer(passedState, loginAction)).toEqual(passedState);
  });
});

describe('LogInSuccess', () => {
  it('should return the details of validated user after login successful', () => {
    const loginAction = new LogInSuccess(mockUser);
    const passedState: State = {
      isAuthenticated: true,
      user: validatedUser,
      errorMessage: null,
    };
    expect(reducer(passedState, loginAction)).toEqual(passedState);
  });
});

describe('LogInFailure', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const loginAction = new LogInFailure(mockUser);
    const passedState: State = {
      isAuthenticated: null,
      user: invalidUser,
      errorMessage: 'Incorrect email and/or password.',
    };
    expect(reducer(passedState, loginAction)).toEqual(passedState);
  });
});

describe('SignUpSuccess', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const signUpSuccessAction = new SignUpSuccess(mockUser);
    const passedState: State = {
      isAuthenticated: true,
      user: mockUser,
      errorMessage: null,
    };
    expect(reducer(passedState, signUpSuccessAction)).toEqual(passedState);
  });
});

describe('SignUpFailure', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const signUpSuccessAction = new SignUpFailure();
    const passedState: State = {
      isAuthenticated: true,
      user: mockUser,
      errorMessage: 'That email is already in use.',
    };
    expect(reducer(passedState, signUpSuccessAction)).toEqual(passedState);
  });
});

describe('Logout', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const logoutAction = new Logout();
    const passedState: State = {
      isAuthenticated: false,
      user: mockUser,
      errorMessage: 'That email is already in use.',
    };
    expect(reducer(initialState, logoutAction)).toEqual(initialState);
  });
});
