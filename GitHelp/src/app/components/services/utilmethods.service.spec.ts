import { TestBed } from '@angular/core/testing';

import { UtilmethodsService } from './utilmethods.service';

describe('UtilmethodsService', () => {
  let service: UtilmethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilmethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
