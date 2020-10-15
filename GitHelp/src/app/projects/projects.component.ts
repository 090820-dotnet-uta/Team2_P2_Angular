import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from '../models/Project';
import { ProjectService } from '../models/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  //Represents the selected project that is passed from the HTML
  @Input() project : Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) {}

  //OnInit we get the info on the selected project
  ngOnInit(): void {
    this.getProject();
  }
  
  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(p => this.project = p);
  }

  //Run the update method from service to save project changes
  save(): void {
    this.projectService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

}
