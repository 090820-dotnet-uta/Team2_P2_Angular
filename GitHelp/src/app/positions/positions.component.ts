import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable, of} from 'rxjs';

import { Position } from '../models/Position';
import { ProjectPositions } from '../models/ProjectPositions';
import{ PositionService } from '../models/position.service';
import { Project } from '../models/Project';
import {ProjectListComponent} from '../project-list/project-list.component'
import { ProjectService } from '../models/project.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit {

  allProjectPositions : ProjectPositions[];
  allPositions: Position[];
  allProjects: Project[];
  projectPositionsToBeAdded: ProjectPositions[] = [];

  contractorPositions: ProjectPositions[];
  contractorProjects : Project[];

  positionsToBeAdded: ProjectPositions[];
  newPosition: ProjectPositions;
  userId : string;
  userType: string;
  projId: string;
  //Get all positions, then get the userId, then get all the positions with that ID, then I can get all the projects listed in contractor positions

  


  constructor(private positionService: PositionService, private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log("Made it into ngOnInit (positions component)");
    //DUMMY DATA! SET EQUAL TO LOCAL STORAGE LATER
    // this.userId = "1";
    // this.userType = "contractor"
    this.projId = localStorage.getItem("lastestProjId")
    console.log("latestProjId=" + this.projId)
    //this.projId = "27";

    // this.getAllProjects();
    // console.log("allprojects =" + this.allProjects);
    // this.getAllProjectPositions();
    // console.log("allProjectPositions =" + this.allProjectPositions);
    this.getAllPositions();
    console.log("allPositions =" + this.allPositions);
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

  addPossiblePosition(projId: number, positionId: number): void {
    this.newPosition = new ProjectPositions (projId, positionId)
    this.projectPositionsToBeAdded.push(this.newPosition);
    console.log("ProjId=" + projId)
    console.log("PositionId=" + positionId)
    console.log(this.projectPositionsToBeAdded)

    
  }

}
