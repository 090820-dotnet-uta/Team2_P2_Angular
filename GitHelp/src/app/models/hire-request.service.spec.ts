import { TestBed } from '@angular/core/testing';

import { HireRequestService } from './hire-request.service';

describe('HireRequestService', () => {
  let service: HireRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
