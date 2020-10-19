import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable, of} from 'rxjs';
import { Project } from '../models/Project';
import { ProjectService } from '../models/project.service';
import{ PositionService } from '../models/position.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService],
})
export class ProjectListComponent implements OnInit {

  //Will hold either all projects, all of a client's projects or all of a contractor's projects
  projects : Project[];
  allPositions: Position[];

  selectedProject: Project;
  EditedProject: Project = new Project();

  //This dictates the type of list to be displayed 
  listType: number;
  userId: string;
  loginType: string;

  //DUMMY DATA REMOVE LATER, REPLACED WITH LOGGEDINUSER FROM LOCAL STORAGE
  //let userId = localStorage.getItem('currentId');
  //let userType = localStorage.getItem('userType');

  
  constructor(
    private projectService: ProjectService,
    private positionService: PositionService
    ) {

    
   }

  //OnInit
  ngOnInit(): void {
    this.getAllPositions();

    //DUMMY DATA, CHANGE LATER
        this.listType = 1;
        this.userId = "1";

        // this.userId = localStorage.getItem('currentUserId');
        this.loginType = localStorage.getItem('loginType');
        
        // console.log("List type: " + this.listType);
        // console.log("User id: " + this.userId);
        // //TEST
        // this.getCliProjects(this.userId);


        //Determine what kind of list to output 
        // if(this.listType === 1)
        // {
        //   this.getCliProjects(this.userId);
        // }
        // else if(this.listType === 2)
        // {
        //   this.getConProjects(this.userId);
        // }
        // else
        // {
        //   this.getAllProjects();
        // }

    // console.log("Logging projects inside ngOnInit (before getAllProjects component):")
    // console.log(this.projects)
    // //this.getAllProjects();
    // console.log("Logging projects inside ngOnInit (after getAllProjects component):")
    // console.log(this.projects)

    if(this.loginType == "client"){
      this.getClientProjects(this.userId);
    }else if(this.loginType == "contractor"){
      this.getAllProjects();
    }

    
  }

  getAllPositions(): void {
    this.positionService.getAllPositions().subscribe(allPositions => {
      // this.allPositions = allPositions
      // console.log("Logging positions after leaving getAllPositions:")
      // console.log(this.allPositions)
      // this.positionAddForm.patchValue({
      //   allPositions: this.allPositions
      //   // formControlName2: myValue2 (can be omitted)
      // });
    })
  }

  getClientProjects(id: string){
    console.log("Entering getCliProjects with userId: #" + id);

    this.projectService.getCliProjects(id).subscribe(projects => {this.projects = projects
      console.log("Logging projects after leaving getClientProjects:")
      console.log(this.projects)}
    );
  }

  getAllProjects(){
    //console.log("Inside getAllProjects (component)")
    //console.log(this.projects)
    this.projectService.getAllProjects().subscribe(projects => {this.projects = projects
      console.log("Logging projects after leaving getAllProjects:")
      console.log(this.projects)}
    );
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
          proj.userId = emittedProject.userId;
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
