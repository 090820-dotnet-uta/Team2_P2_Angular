import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import  { HttpClientTestingModule } from '@angular/common/http/testing';


import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
