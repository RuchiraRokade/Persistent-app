import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const dummyUsers = [
  {
    id: '1',
    email: 'user@zz.com',
    password: 'password',
  },
];

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    this.service = TestBed.inject(AuthService);
  });

  beforeEach(inject(
    [AuthService, HttpTestingController],
    (serviceInstance, httpMock) => {
      service = serviceInstance;
      httpTestingController = httpMock;
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login: should return an array containing the valid user', () => {
    const mockCheckLoginUser = {
      id: '1',
      email: 'user@zz.com',
      password: 'password',
    };
    this.service
      .login({
        email: 'user@zz.com',
        password: 'password',
      })
      .subscribe((user) => {
        expect(user).toBeDefined();
        expect(user.length).toBe(1);
        expect(user.id).toBe(1);
      });
    const req = httpTestingController.expectOne(
      'http://localhost:3000/users?email=' +
        mockCheckLoginUser.email +
        '&password=' +
        mockCheckLoginUser.password
    );
    req.flush(dummyUsers);
    httpTestingController.verify();
  });

  it('signup: should return an array containing the valid user', () => {
    const mockCheckLoginUser = {
      name: 'new',
      email: 'new@zz.com',
      password: 'new',
    };
    this.service.signUp(mockCheckLoginUser).subscribe((user) => {
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(mockCheckLoginUser.name);
      expect(user.email).toBe(mockCheckLoginUser.email);
      expect(user.password).toBe(mockCheckLoginUser.password);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/users');
    req.flush(dummyUsers);
    httpTestingController.verify();
  });
});
