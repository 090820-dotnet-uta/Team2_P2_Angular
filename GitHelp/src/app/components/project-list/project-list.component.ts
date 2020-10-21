import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable, of} from 'rxjs';
import { Project } from '../models/Project';
import { ProjectVM } from '../models/ProjectVM';
import { ProjectService } from '../services/project.service';
import { Position } from '../models/Position';
import{ PositionService } from '../services/position.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService],
})
export class ProjectListComponent implements OnInit {

  //Will hold either all projects, all of a client's projects or all of a contractor's projects
  projectVMs : ProjectVM[];
  positionDict: Object;

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
    
    this.makePositionDict();

    if(this.loginType == "client"){
      this.getClientProjects(this.userId);
    }else if(this.loginType == "contractor"){
      this.getAllProjects();
    }

    
  }

  makePositionDict(): void {
    this.positionService.getAllPositions().subscribe(allPositions => {
      this.positionDict = new Object();
      for(let pInc = 0; pInc < allPositions.length; pInc ++){
        let thisPosId = allPositions[pInc].positionId;
        this.positionDict[thisPosId] = allPositions[pInc].positionTitle;
      }
      console.log("Made dictionary of positions")
      console.log(this.positionDict)
    })
  }

  getClientProjects(id: string){
    console.log("Entering getCliProjects with userId: #" + id);

    this.projectService.getCliProjects(id).subscribe(projects => {
      this.assembleProjectVMsList(projects);
    });
  }

  getAllProjects(){
    //console.log("Inside getAllProjects (component)")
    //console.log(this.projects)
    this.projectService.getAllProjects().subscribe(projects => {
      this.assembleProjectVMsList(projects);
    });
  }

  assembleProjectVMsList(projects: Project[]){
      this.projectVMs= [];
      for(let pInc = 0; pInc < projects.length; pInc ++){
        this.projectVMs.push( new ProjectVM(
          projects[pInc].projectId,
          projects[pInc].userId,
          projects[pInc].startDate,
          projects[pInc].endDate,
          projects[pInc].paymentOffered,
          projects[pInc].Description
        ));
      }
      console.log("Gotten Projects:");
      console.log(this.projectVMs);
      this.getProjectPositions();
  }

  getProjectPositions(){
    console.log("Getting project positions")
    for(let pInc = 0; pInc < this.projectVMs.length; pInc ++){
      this.positionService.getProjectPositionsByProject(this.projectVMs[pInc].projectId).subscribe(theseProjectPositions => {
        console.log("AAA")
        console.log(theseProjectPositions)
        if(theseProjectPositions.length == 0){
          console.log("No ProjectPositions for "+ this.projectVMs[pInc].projectId)
        }else{
          console.log("Got ProjectPositions for "+ this.projectVMs[pInc].projectId)
          console.log(theseProjectPositions);
          let theseProjectPositionsVM = [];
          for(let p2Inc = 0; p2Inc < theseProjectPositions.length; p2Inc ++){
            let thisProjPosVM = new ProjectPositionVM(
              theseProjectPositions[p2Inc].projectPositionsId,
              theseProjectPositions[p2Inc].projectId,
              theseProjectPositions[p2Inc].positionId,
              this.positionDict[theseProjectPositions[p2Inc].positionId],
            )
            if(theseProjectPositions[p2Inc].contractorId){
              thisProjPosVM.contractorId = theseProjectPositions[p2Inc].contractorId;
            }
            theseProjectPositionsVM.push(thisProjPosVM)
          }
          this.projectVMs[pInc].positions = theseProjectPositionsVM;
        }
      });
    }
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
  delete(project: ProjectVM): void {
    this.projectVMs = this.projectVMs.filter(p => p !== project);
    this.projectService.deleteProject(project).subscribe();
    // window.location.reload();
  }

  EditProject(id: number): void {
    this.selectedProject = this.projectService.getProject(id);
  }

  HandleEditProject(emittedProject: Project): void {
    // Log the values of the emitted event here to check
    console.log(emittedProject);
    //Pull the project to be editted from DB and alter accordingly
    this.projectService.updateProject(emittedProject).subscribe(() => {
      this.projectVMs.forEach(proj => {
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
