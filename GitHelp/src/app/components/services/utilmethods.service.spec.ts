import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilmethodsService } from './utilmethods.service';

describe('UtilmethodsService', () => {
  let service: UtilmethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(UtilmethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should be false when login type is invalid', () => {
    expect(service.loginCheck("type")).toBeFalsy();
  });
});
