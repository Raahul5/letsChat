import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MainService } from './main.service';

describe('MainService', () => {
  let service: MainService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[MainService]
    });
    service = TestBed.inject(MainService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify(); // Ensure there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
