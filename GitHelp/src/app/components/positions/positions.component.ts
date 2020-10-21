import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {empty, Observable, of} from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Position } from '../models/Position';
import { PositionVM } from '../models/PositionVM';
import { ProjectPosition } from '../models/ProjectPosition';
import{ PositionService } from '../services/position.service';
import { Project } from '../models/Project';
import { ProjectService } from '../services/project.service';

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

  allProjectPositions : ProjectPosition[];
  allPositions: PositionVM[];
  allProjects: Project[];
 
  //used for fetching list of contractor projects/positions
  contractorPositions: ProjectPosition[];
  contractorProjects : Project[];

  //Used when adding new positions to a project
  projectPositionsToBeAdded: Array<ProjectPosition> = [];
  // edittedProjectPositionsToBeAdded: Array<ProjectPositions>;
  newPosition: ProjectPosition;
  // foundPositionArray: Array<ProjectPositions>;
  // foundPosition: ProjectPositions;
  // matchWasFound: number;

  userId : string;
  userType: string;
  projId: string;
  //Get all positions, then get the userId, then get all the positions with that ID, then I can get all the projects listed in contractor positions

  


  constructor(
    private location: Location,
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

    this.positionAddForm = this.formBuilder.group({
      //projectPositions: ['Array<ProjectPositions>'],
      projectId: [this.projId],
      allPositions: []
    })
  }

  get f() { return this.positionAddForm.controls; }

  getAllProjectPositions(): void {
    this.positionService.getAllProjectPositions().subscribe(allProjectPositions => {this.allProjectPositions = allProjectPositions
      console.log("Logging positions after leaving getAllPositions:")
      console.log(this.allProjectPositions)})
  }

  getAllPositions(): void {
    this.positionService.getAllPositions().subscribe(allPositions => {
      this.allPositions = [];
      for( let pInc = 0; pInc < allPositions.length; pInc ++){
        let newPositionVM = new PositionVM(
          allPositions[pInc].positionId,
          allPositions[pInc].positionTitle,
          allPositions[pInc].description,
          'position'+pInc
        );
        this.allPositions.push(newPositionVM);

      }
      // this.allPositions = allPositions
      console.log("Logging positions after leaving getAllPositions:")
      console.log(this.allPositions)
      this.positionAddForm.patchValue({
        allPositions: this.allPositions
        // formControlName2: myValue2 (can be omitted)
      });
      for( let pInc = 0; pInc < this.allPositions.length; pInc ++){
        console.log(this.allPositions[pInc]);
        // let positionFieldName = 'position'+pInc;
        // this.allPositions[pInc]["positionFieldName"] =positionFieldName;
        let positionFieldName = this.allPositions[pInc]["positionFieldName"];
        this.positionAddForm.addControl(positionFieldName, 
          this.formBuilder.control({ disabled: false, value: false }));
        // this.positionAddForm.addControl(positionFieldName +"Name", 
        //   this.formBuilder.control({ disabled: false, value: this.allPositions[pInc]["positionTitle"] }));
        // console.log(this.positionAddForm.value)
      }
    })
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

  onSubmit(){
    console.log("Entered onSubmit with the following form values: ", this.positionAddForm.value)
    let projectpositions: ProjectPosition[];
    projectpositions = this.positionAddForm.value;
    let allPositions = projectpositions["allPositions"]
    
    for(let pInc = 0; pInc < allPositions.length; pInc++){
      let projPos = allPositions[pInc].positionId
      let positionIsChecked = projectpositions["position" + pInc];
      if(positionIsChecked){
        console.log("ProjPos is ", projPos)
        let newPosition = new ProjectPosition(this.projId, projPos);
        this.positionService.addPosition(newPosition).subscribe(
          (res: any) => {
            if(res.success){
              console.log('Success! Added');
            }
          }, err => {
            if(err.status == 400)
            {
              console.log("Ur trash")
            }
          }
          
        )
        setTimeout(() => {
          return this.router.navigateByUrl(`/checkout`);
        }, 200)
      }
      
    }
  }

  cancelAdd(){
    return this.router.navigateByUrl(`/ProjectList`);
  }
  



  // determineAddOrRemove(projId: string, positionId: number) { 
  //   //Use the selected projectId and positionId to create a new projectPosition object
  //   this.newPosition = new ProjectPositions (projId, positionId)
  //   console.log("Position that has been checked: ", this.newPosition)
  //   console.log("Current projectPositionsToBeAdded: ", this.projectPositionsToBeAdded)

  //   if(this.projectPositionsToBeAdded.length === 0)
  //   {
  //     //If array is empty, add it by default
  //     console.log("projectPositionsToBeAdded is empty")
  //     console.log("The Position ", this.newPosition , " is new and will now be added...")
  //     this.addPossiblePosition(projId, positionId)
  //   }
  //   else{
  //     //If there are elements in array, try and see if the position that was checked is currently present in the array
  //     this.foundPosition = this.projectPositionsToBeAdded.find(projPos => {
  //     projPos === this.newPosition})
  //     console.log("After find, the following position was pulled: ")
  //     console.log(this.foundPosition)

  //     //Now compare the position that has been checked to the position that was found
  //     if(this.newPosition == this.foundPosition)
  //     {
  //       //Match was found, the checked position is present in the array
  //       this.matchWasFound = 1;
  //     }
  //     else
  //     {
  //       //Match was NOT found, the checked position is NOT present in the array
  //       this.matchWasFound = 2;
  //     }

  //     //Then we check the value of the comparison to see what to do next (add or remove)
  //     if(this.matchWasFound === 2)
  //     {
  //       //Match not found, add the new project to the array
  //       console.log("The Position ", this.newPosition , " is new and will now be added...")
  //       this.addPossiblePosition(projId, positionId)
  //     }
  //     else if(this.matchWasFound === 1)
  //     {
  //       //Match was found, remove the existing position from the array
  //       console.log("The Position ", this.newPosition , " is already present and will now be removed...")
  //       this.removePossiblePosition(projId, positionId)
  //     }
  //   }
  // }

  // addPossiblePosition(projId: string, positionId: number): void {
  //   //Use the selected projectId and positionId to create a new projectPosition object
  //   this.newPosition = new ProjectPositions (projId, positionId)

  //   //Add the new position to the array
  //   this.projectPositionsToBeAdded.push(this.newPosition);

  //   console.log("Added ProjId=" + projId)
  //   console.log("Added PositionId=" + positionId)
  //   console.log("this.projectPositionsToBeAdded= ", this.projectPositionsToBeAdded)
  // }

  // removePossiblePosition(projId: string, positionId: number): void {
  //   //Use the selected projectId and positionId to create a new projectPosition object
  //   this.newPosition = new ProjectPositions (projId, positionId)
  //   console.log("newPosition in removePosition= ", this.newPosition)

  //   //We filter out the position to be removed, push all the remaining projectPositions to the edittedProjectPositionsToBeAdded and set value of original array to the editted one
  //   this.projectPositionsToBeAdded.filter(projPos => {
  //     projPos.positionId !== positionId && projPos.projectId !== projId,
  //     this.edittedProjectPositionsToBeAdded.push(projPos)})
  //   console.log("The editted projectPositionsToBeAdded is: ", this.edittedProjectPositionsToBeAdded)
  //   this.projectPositionsToBeAdded = this.edittedProjectPositionsToBeAdded;

  //   console.log("Removed ProjId=" + projId)
  //   console.log("Removed PositionId=" + positionId)
  //   console.log("this.projectPositionsToBeAdded= ", this.projectPositionsToBeAdded)
  // }
}

