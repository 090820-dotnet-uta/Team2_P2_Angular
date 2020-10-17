import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable, of} from 'rxjs';
import { Project } from '../models/Project';
import { ProjectService } from '../models/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects : Project[];
  //testProj: string[] = ["blah", "test", "boo"];
  selectedProject: Project;
  EditedProject: Project = new Project();

  //DUMMY DATA REMOVE LATER, REPLACED WITH LOGGEDINUSER


  
  constructor(private projectService: ProjectService) {
    this.projectService.getAllProjects().subscribe(projects => {this.projects = projects
    console.log("Logging projects after constructor:")
    console.log(this.projects)});
   }

  //OnInit
  ngOnInit(): void {
    console.log("Logging projects inside ngOnInit (before getAllProjects component):")
    console.log(this.projects)
    this.getAllProjects();
    console.log("Logging projects inside ngOnInit (after getAllProjects component):")
    console.log(this.projects)

    // console.log("Projects inside NgonInit:")
    // console.log(this.projects)
  }

  getAllProjects(){
    console.log("Inside getAllProjects (component)")
    console.log(this.projects)
    return this.projects;
  }

  // get Projs(): Project[] {
  //   return this.projectService.getEveryProj();
  // }

  //Create a new project 
  // add(ProjectName: string): void{
  //   ProjectName = ProjectName.trim();
  //   if(!ProjectName){return;}
  //   this.projectService.addProject({ProjectName} as Project)
  //     .subscribe(project => {this.projects.push(project)})
  // }

  //Filters to get all projects that aren't selected projects and sets them to be local list of projects
  //Passes selected project to deletion method for removal
  delete(project: Project): void {
    this.projects = this.projects.filter(p => p !== project);
    this.projectService.deleteProject(project).subscribe();
  }

  EditProject(id: number): void {
    this.selectedProject = this.projectService.getProject(id);
  }

  HandleEditProject(emittedProject: Project): void {
    // Log the values of the emitted event here to check
    console.log(emittedProject);
    //Pull the project to be editted from DB and alter accordingly
    this.projectService.updateProject(emittedProject).subscribe(() => {
      this.projects.forEach(proj => {
        if (proj.projectId === emittedProject.projectId) {
          proj.clientId = emittedProject.clientId;
          proj.projectName = emittedProject.projectName;
          proj.Description = emittedProject.Description;
          proj.startDate = emittedProject.startDate;
          proj.endDate = emittedProject.endDate;
          proj.paymentOffered = emittedProject.paymentOffered;
        }
      });
    });
  }
}
