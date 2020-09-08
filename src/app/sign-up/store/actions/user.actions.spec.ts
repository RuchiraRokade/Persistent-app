import {
  Logout,
  SignUpSuccess,
  SignUpFailure,
  LogInSuccess,
  LogInFailure,
} from './user.actions';
import { AuthActionTypes, LogIn, SignUp } from './user.actions';

describe('LogIn', () => {
  it('should create an action of type [AUTH] LogIn', () => {
    const mockUser = {
      email: 'user1@test.com',
      name: 'user',
      password: 'test',
      id: 3,
    };
    const action = new LogIn(mockUser);
    expect(action.type).toEqual(AuthActionTypes.LOGIN);
  });
});

describe('SignUp', () => {
  it('should create an action of type AuthActionTypes.SIGNUP', () => {
    const mockUser = {
      email: 'user1@test.com',
      name: 'user',
      password: 'test',
      id: 3,
    };
    const action = new SignUp(mockUser);
    expect(action.type).toEqual(AuthActionTypes.SIGNUP);
  });
});

describe('Logout', () => {
  it('should create an action of type [AUTH] LogOut', () => {
    const action = new Logout();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT);
  });
});
describe('SignUpSuccess', () => {
  it('should create an action of type [Auth] SignUp Success', () => {
    const mockUser = {
      email: 'user1@test.com',
      name: 'user',
      password: 'test',
      id: 3,
    };
    const action = new SignUpSuccess(mockUser);
    expect(action.type).toEqual(AuthActionTypes.SIGNUP_SUCCESS);
  });
});
describe('LogInSuccess', () => {
  it('should create an action of type [Auth] Login Success', () => {
    const mockUser = {
      email: 'user1@test.com',
      name: 'user',
      password: 'test',
      id: 3,
    };
    const action = new LogInSuccess(mockUser);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_SUCCESS);
  });
});
describe('SignUpFailure', () => {
  it('should create an action of type [Auth] SignUp Failure', () => {
    const action = new SignUpFailure();
    expect(action.type).toEqual(AuthActionTypes.SIGNUP_FAILURE);
  });
});
describe('LogInFailure', () => {
  it('should create an action of type [Auth] Login Failure', () => {
    const mockUser = {
      email: 'user1@test.com',
      name: 'user',
      password: 'test',
      id: 3,
    };
    const action = new LogInFailure(mockUser);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_FAILURE);
  });
});
