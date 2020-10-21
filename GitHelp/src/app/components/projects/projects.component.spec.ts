import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectsComponent } from './projects.component';
import  { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from '../navbar/navbar.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ProjectsComponent, NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update proj', () => {
    expect(component.updateProject()).toBeFalsy();
  });
  it('should get proj', () => {
    expect(component.getProject()).toBeDefined();
  });

});
