import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HireRequestService } from './hire-request.service';
import  { HttpClientTestingModule } from '@angular/common/http/testing';


describe('HireRequestService', () => {
  let service: HireRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(HireRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
