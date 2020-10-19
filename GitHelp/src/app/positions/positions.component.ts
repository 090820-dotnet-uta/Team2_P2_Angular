import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {empty, Observable, of} from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  loading = false;
  submitted = false;

  positionAddForm : FormGroup;

  allProjectPositions : ProjectPositions[];
  allPositions: Position[];
  allProjects: Project[];
 
  //used for fetching list of contractor projects/positions
  contractorPositions: ProjectPositions[];
  contractorProjects : Project[];

  //Used when adding new positions to a project
  projectPositionsToBeAdded: Array<ProjectPositions> = [];
  edittedProjectPositionsToBeAdded: Array<ProjectPositions> =[];
  newPosition: ProjectPositions;
  foundPositionArray: Array<ProjectPositions> = [];
  foundPosition: ProjectPositions;
  matchWasFound: number;
  dummyProjPosArray: Array<ProjectPositions> = [];
  dummyPosition: ProjectPositions

  userId : string;
  userType: string;
  projId: string;
  //Get all positions, then get the userId, then get all the positions with that ID, then I can get all the projects listed in contractor positions

  


  constructor(
    private positionService: PositionService, 
    private projectService: ProjectService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log("Made it into ngOnInit (positions component)");
    //DUMMY DATA! SET EQUAL TO LOCAL STORAGE LATER
    // this.userId = "1";
    // this.userType = "contractor"
    //Gets the project id based on the current url 
    
    this.href = this.router.url;
    let shitake = this.router.url.split("/");
    const id = shitake[2];
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

    // this.positionAddForm = this.formBuilder.group({
    //   //projectPositions: ['Array<ProjectPositions>'],
    //   projectId: [this.projId],
    //   positionId: ['']
    // })
  }

  //get f() { return this.positionAddForm.controls; }

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

  // onSubmit(){
  //   console.log("Entered onSubmit with the following form values: ", this.positionAddForm.value)
  //   this.positionAddForm.value.forEach(projPos => {
  //     if(projPos.positionId == true)
  //     {
  //       projPos.positionId
  //     }
  //   });
  //   this.positionService.addPosition(this.positionAddForm.value).subscribe(
  //     (res: any) => {
  //       if(res.success){
  //         console.log('Success! Added');
  //       }
  //     }
  //   )
  // }


  getProjectPositionsFromArray(array: Array<ProjectPositions>) {
    return array.values;
    // array.forEach(projPos => {
    //   this.dummyProjPosArray
    // });
    // array.find(projPos => {projPos instanceof ProjectPositions})
    // return this.dummyProjPosArray;
  }

  determineAddOrRemove(projId: string, positionId: number) { 
    //Use the selected projectId and positionId to create a new projectPosition object
    this.newPosition = new ProjectPositions (projId, positionId)
    console.log("Position that has been checked: ", this.newPosition)
    console.log("Current projectPositionsToBeAdded: ", this.projectPositionsToBeAdded)

    if(this.projectPositionsToBeAdded.length === 0)
    {
      //If array is empty, add it by default
      console.log("projectPositionsToBeAdded is empty")
      console.log("The Position ", this.newPosition , " is new and will now be added...")
      this.addPossiblePosition(projId, positionId)
    }
    else{
      //If there are elements in array, try and see if the position that was checked is currently present in the array
      this.foundPosition = this.projectPositionsToBeAdded.find(projPos => {
      projPos.positionId === positionId && projPos.projectId === projId})
      console.log("After find, the following position was pulled: ")
      console.log(this.foundPosition)

      //Now compare the position that has been checked to the position that was found
      if(this.newPosition == this.foundPosition)
      {
        //Match was found, the checked position is present in the array so remove it
        this.matchWasFound = 1;
      }
      else if(this.foundPosition === undefined || Object.keys(this.foundPosition).length === 0)
      {
        //Match was NOT found (found item is empty), the checked position is NOT present in the array so add it
        this.matchWasFound = 2;
      }

      //Then we check the value of the comparison to see what to do next (add or remove)
      if(this.matchWasFound === 2)
      {
        //Match not found, add the new project to the array
        console.log("The Position ", this.newPosition , " is new and will now be added...")
        this.addPossiblePosition(projId, positionId)
      }
      else if(this.matchWasFound === 1)
      {
        //Match was found, remove the existing position from the array
        console.log("The Position ", this.newPosition , " is already present and will now be removed...")
        this.removePossiblePosition(projId, positionId)
      }
    }
  }

  addPossiblePosition(projId: string, positionId: number): void {
    //Use the selected projectId and positionId to create a new projectPosition object
    this.newPosition = new ProjectPositions (projId, positionId)

    //Add the new position to the array
    this.projectPositionsToBeAdded.push(this.newPosition);

    console.log("Added ProjId=" + projId)
    console.log("Added PositionId=" + positionId)
    console.log("this.projectPositionsToBeAdded= ", this.projectPositionsToBeAdded)
  }

  removePossiblePosition(projId: string, positionId: number): void {
    //Use the selected projectId and positionId to create a new projectPosition object
    this.newPosition = new ProjectPositions (projId, positionId)
    console.log("newPosition in removePosition= ", this.newPosition)

    //We filter out the position to be removed, push all the remaining projectPositions to the edittedProjectPositionsToBeAdded and set value of original array to the editted one
    this.projectPositionsToBeAdded.filter(projPos => {
      projPos.positionId !== positionId && projPos.projectId !== projId,
      this.edittedProjectPositionsToBeAdded.push(projPos)})
    console.log("The editted projectPositionsToBeAdded is: ", this.edittedProjectPositionsToBeAdded)
    this.projectPositionsToBeAdded = this.edittedProjectPositionsToBeAdded;

    console.log("Removed ProjId=" + projId)
    console.log("Removed PositionId=" + positionId)
    console.log("this.projectPositionsToBeAdded= ", this.projectPositionsToBeAdded)
  }
}
