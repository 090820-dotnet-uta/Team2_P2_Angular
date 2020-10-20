import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('messages should be cleared', () => {
    expect(service.clear()).toBeFalsy();
  });

  it('messages should ', () => {
    expect(service.add("ok")).toBeFalsy();
  });
});
