import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinct } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from '../models/Project';
import { ProjectService } from '../services/project.service';
import { Contractor } from '../models/Contractor';
import { User } from '../models/User';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnChanges {

  //Represents the selected project that is passed from the HTML
  @Input() project: Project;
  projectEditForm: FormGroup;
  projectName: string;
  Description: string;
  startDate: number;
  endDate: number;
  //What is returned from the edit project form 
  @Output() editedProject = new EventEmitter<Project>();
  proj : Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) {}

  //OnInit we get the info on the selected project
  ngOnInit(): void {
    this.getProject();
  }

  ngOnChanges(): void{
    if (this.project) {
      this.projectEditForm = new FormGroup(
        {
          userId: new FormControl(this.project.userId),
          projectName: new FormControl(this.project.projectName),
          description: new FormControl(this.project.description),
          startDate: new FormControl(this.project.startDate),
          endDate: new FormControl(this.project.endDate),
          paymentOffered: new FormControl(this.project.paymentOffered),
        }
      );
    }
  }
  
  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.requestProject("id")
      .subscribe(p => this.project = p);
  }

  //Run the update method from service to save project changes
  updateProject(): void {
    this.projectService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
