import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {empty, Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import { Position } from '../models/Position';
import { ProjectPositions } from '../models/ProjectPositions';
import{ PositionService } from '../models/position.service';
import { Project } from '../models/Project';
import { ProjectService } from '../models/project.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit {
  public href: string = "";

  allProjectPositions : ProjectPositions[];
  allPositions: Position[];
  allProjects: Project[];
 

  contractorPositions: ProjectPositions[];
  contractorProjects : Project[];

  projectPositionsToBeAdded: Array<ProjectPositions> = [];
  newPosition: ProjectPositions;
  foundPosition: ProjectPositions;

  userId : string;
  userType: string;
  projId: string;
  //Get all positions, then get the userId, then get all the positions with that ID, then I can get all the projects listed in contractor positions

  


  constructor(private positionService: PositionService, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    console.log("Made it into ngOnInit (positions component)");
    //DUMMY DATA! SET EQUAL TO LOCAL STORAGE LATER
    // this.userId = "1";
    // this.userType = "contractor"
    //Gets the project id based on the current url 
    
    this.href = this.router.url;
    let shit = this.router.url.split("/");
    const id = shit[2];
    this.projId = id;
    localStorage.setItem("latestProjId", id);
    console.log("New stored latestProjId: ", id)
    console.log(this.projId);


    //console.log("latestProjId=" + this.projId)
    //this.projId = "27";

    // this.getAllProjects();
    // console.log("allprojects =" + this.allProjects);
    // this.getAllProjectPositions();
    // console.log("allProjectPositions =" + this.allProjectPositions);
    this.getAllPositions();
    //console.log("allPositions =" + this.allPositions);
    // this.getContractorPositions(this.userId);
    // console.log("contractorPositions =" + this.contractorPositions);


  }

  getAllProjectPositions(): void {
    this.positionService.getAllProjectPositions().subscribe(allProjectPositions => {this.allProjectPositions = allProjectPositions
      console.log("Logging positions after leaving getAllPositions:")
      console.log(this.allProjectPositions)})
  }

  getAllPositions(): void {
    this.positionService.getAllPositions().subscribe(allPositions => {this.allPositions = allPositions
      console.log("Logging positions after leaving getAllPositions:")
      console.log(this.allPositions)})
  }

  getAllProjects(){
    //console.log("Inside getAllProjects (component)")
    //console.log(this.projects)
    this.projectService.getAllProjects().subscribe(projects => {this.allProjects = projects
      console.log("Logging projects after leaving getAllProjects:")
      console.log(this.allProjects)}
    );
  }

  getContractorPositions(id: string): void {
    console.log("Id inside getContractorPositions:")
    this.allProjectPositions.find(pos => 
      {pos.contractorId.toString() === id}
    );
  }

  determineAddOrRemove(projId: string, positionId: number) { 
    this.newPosition = new ProjectPositions (projId, positionId)
    console.log("Position that has been checked: ", this.newPosition)
    console.log("Current projectPositionsToBeAdded: ", this.projectPositionsToBeAdded)

    if(this.projectPositionsToBeAdded.length === 0)
    {
      console.log("projectPositionsToBeAdded is empty")
      console.log("The Position ", this.newPosition , " is new and will now be added...")
      this.addPossiblePosition(projId, positionId)
    }
    else{
      this.projectPositionsToBeAdded.find(projPos => {
      projPos.positionId === positionId && projPos.projectId === projId,
      this.newPosition = projPos})
      console.log("After find, the following position was pulled: ")

      //Checks if the object is empty or not 
      if(Object.keys(this.foundPosition).length === 0)
      {
        console.log("The Position ", this.newPosition , " is new and will now be added...")
        this.addPossiblePosition(projId, positionId)
      }
      else
      {
        console.log("The Position ", this.newPosition , " is already present and will now be removed...")
        this.removePossiblePosition(projId, positionId)
      }
    }
    
  }

  addPossiblePosition(projId: string, positionId: number): void {
    this.newPosition = new ProjectPositions (projId, positionId)
    this.projectPositionsToBeAdded.push(this.newPosition);
    console.log("Added ProjId=" + projId)
    console.log("Added PositionId=" + positionId)
    console.log("this.projectPositionsToBeAdded= ", this.projectPositionsToBeAdded)
  }

  removePossiblePosition(projId: string, positionId: number): void {
    this.newPosition = new ProjectPositions (projId, positionId)
    console.log("newPosition in removePosition= ", this.newPosition)
      this.projectPositionsToBeAdded.filter(projPos => {projPos.positionId !== positionId && projPos.projectId !== projId})
      console.log("Removed ProjId=" + projId)
      console.log("Removed PositionId=" + positionId)
      console.log("this.projectPositionsToBeAdded= ", this.projectPositionsToBeAdded)
  }

  submitProjectPositions(projectPositionsToBeAdded : Array<ProjectPositions>) : void{

  }
}
