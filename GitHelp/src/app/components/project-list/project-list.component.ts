import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {Observable, of} from 'rxjs';

import { Project } from '../models/Project';
import { ProjectVM } from '../models/ProjectVM';
import { ProjectService } from '../services/project.service';
import { Position } from '../models/Position';
import{ PositionService } from '../services/position.service';
import { ProjectPositionVM } from '../models/ProjectPositionVM';
import { HireRequest } from '../models/HireRequest';
import { UserService } from '../services/user.service';

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
  
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private positionService: PositionService,
    private userService: UserService
    ) {

    
   }

  //OnInit
  ngOnInit(): void {

    //DUMMY DATA, CHANGE LATER
        // this.listType = 1;
        // this.userId = "1";

        this.userId = localStorage.getItem('currentUserId');
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
    
    this.makePositionDict(); // Other stuff moved to after this dict is defined
  }

  makePositionDict(): void {
    this.positionService.getAllPositions().subscribe(allPositions => {
      this.positionDict = new Object();
      for(let pInc = 0; pInc < allPositions.length; pInc ++){
        let thisPosId = allPositions[pInc].positionId;
        this.positionDict[thisPosId] = allPositions[pInc].positionTitle;
      }
      // console.log("Made dictionary of positions")
      // console.log(this.positionDict)
      this.handleProjectGetting()
    })
  }

  handleProjectGetting(){
    if(this.loginType == "client"){
      this.getClientProjects(this.userId);
    }else if(this.loginType == "contractor"){
      this.getAllProjects();
    }
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
        const newProject = new ProjectVM(
          projects[pInc].projectId,
          projects[pInc].userId,
          projects[pInc].startDate,
          projects[pInc].endDate,
          projects[pInc].paymentOffered,
          projects[pInc].projectName,
          projects[pInc].description
        );
        this.projectVMs.push(newProject);
        this.getOtherUserName(pInc, "contractor", projects[pInc].userId)
      }
      console.log("Gotten Projects:");
      console.log(this.projectVMs);
      this.getProjectPositions();
  }

  getProjectPositions(){
    console.log("Getting project positions")
    for(let pInc = 0; pInc < this.projectVMs.length; pInc ++){
      this.positionService.getProjectPositionsByProject(this.projectVMs[pInc].projectId).subscribe(theseProjectPositions => {
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

  getOtherUserName(hrInc: number, userType:string, otherUserId: string): void {
    console.log(otherUserId)
    if(!otherUserId){
      console.log("No other contractor ID")
    }else{
      this.userService.getUserByUserId(otherUserId)
      .subscribe(
        otherUser => {
          console.log("Got client:"+ otherUser.userName);
          this.projectVMs[hrInc].clientUserName = otherUser.userName;
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

  gotoCreateProject(): void {
    console.log("Going to create project component");
    this.router.navigate(['/AddProject']);
  }


  //Filters to get all projects that aren't selected projects and sets them to be local list of projects
  //Passes selected project to deletion method for removal
  delete(project: ProjectVM): void {
    this.projectVMs = this.projectVMs.filter(p => p !== project);
    this.projectService.deleteProject(project).subscribe(res => {
      // window.location.reload();
      this.handleProjectGetting()
    });
  }

  addPositions(id: number): void {
    console.log("Going to add positions to project "+ id);
    this.router.navigate(['/Positions/'+id]);
  }

  EditProject(id: number): void {
    console.log("Edit currently placeholder");
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
          proj.description = emittedProject.description;
          proj.startDate = emittedProject.startDate;
          proj.endDate = emittedProject.endDate;
          proj.paymentOffered = emittedProject.paymentOffered;
        }
      });
    });
  }

  RequestPosition(projectPositionsId: number, clientId: string){
    console.log("Requesting "+ projectPositionsId)
    const newHireRequest = new HireRequest(
      projectPositionsId,
      clientId,
      this.userId
    )
    console.log(newHireRequest)
    this.positionService.addHireRequest(newHireRequest).subscribe(res => {
      console.log("HireRequest post completed")
      console.log(res)
    });
  }
}
