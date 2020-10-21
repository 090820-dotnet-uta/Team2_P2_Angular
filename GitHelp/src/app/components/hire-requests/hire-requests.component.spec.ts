import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireRequestsComponent } from './hire-requests.component';
import { RouterTestingModule } from '@angular/router/testing';
import  { HttpClientTestingModule } from '@angular/common/http/testing';

import {ReactiveFormsModule} from '@angular/forms';

import { NavbarComponent } from '../navbar/navbar.component';



describe('HireRequestsComponent', () => {
  let component: HireRequestsComponent;
  let fixture: ComponentFixture<HireRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        RouterTestingModule, 
        HttpClientTestingModule, 
        ReactiveFormsModule
      ],
      declarations: [ HireRequestsComponent, NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
