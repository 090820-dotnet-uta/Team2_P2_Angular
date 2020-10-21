import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilmethodsService } from '../services/utilmethods.service';
import { HireRequest } from '../models/HireRequest'
import { HireRequestViewModel } from '../models/HireRequestVM'
import { HireRequestService } from '../services/hire-request.service';
import { UserService } from '../services/user.service';
import { PositionService } from '../services/position.service';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-hire-requests',
  templateUrl: './hire-requests.component.html',
  styleUrls: ['./hire-requests.component.css']
})
export class HireRequestsComponent implements OnInit {
  thisUserName: string;
  thisLoginType: string;
  thisUserId: string;
  // hireRequests: HireRequest[];
  hireRequestVMs: HireRequestViewModel[];
  positionDict: Object;

  constructor(
    private utilmethodsService: UtilmethodsService,
    private hireRequestService: HireRequestService,
    private userService: UserService,
    private positionService: PositionService,
    private projectService: ProjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
     if(loginChecksOut){
      this.thisUserName = localStorage.getItem('currentUserName');
      this.thisLoginType = localStorage.getItem('loginType');
      this.thisUserId = localStorage.getItem('currentUserId');
       this.makePositionDict();
     }
   }

   makePositionDict(): void {
     this.positionService.getAllPositions().subscribe(allPositions => {
       this.positionDict = new Object();
       for(let pInc = 0; pInc < allPositions.length; pInc ++){
         let thisPosId = allPositions[pInc].positionId;
         this.positionDict[thisPosId] = allPositions[pInc].positionTitle;
       }
       this.getHireRequests()
     })
   }
    
   getHireRequests(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.hireRequestService.getHireRequests()
      .subscribe(
        gottenHireRequests => {
          console.log("Got result:");
          console.log(gottenHireRequests);
          let matchingHireRequests = [];
          for(let hInc = 0; hInc < gottenHireRequests.length; hInc ++){
            if(gottenHireRequests[hInc].clientId == this.thisUserId || gottenHireRequests[hInc].contractorId == this.thisUserId){
              matchingHireRequests.push(gottenHireRequests[hInc])
            }
          }
          console.log("Id Matching result:");
          console.log(matchingHireRequests);
          // this.hireRequests = matchingHireRequests; // Stored for use with updating
          this.doSubRequests(matchingHireRequests);
        });
  }

  doSubRequests(matchingHireRequests: HireRequest[]): void{
    this.hireRequestVMs = [];
    for(let hrInc = 0;  hrInc < matchingHireRequests.length; hrInc ++){
      let otherUserType;
      let targetId;
      let thisHireRequestVM: HireRequestViewModel;
      if(this.thisLoginType == "client"){
        thisHireRequestVM = new HireRequestViewModel(
          matchingHireRequests[hrInc].positionId,
          this.thisUserName,
          "-",
          matchingHireRequests[hrInc].requestStatus
        );
        this.hireRequestVMs.push(thisHireRequestVM);
        otherUserType = "contractor";
        targetId = matchingHireRequests[hrInc].contractorId;
      }else if(this.thisLoginType == "contractor"){
        thisHireRequestVM = new HireRequestViewModel(
          matchingHireRequests[hrInc].positionId,
          "-",
          this.thisUserName,
          matchingHireRequests[hrInc].requestStatus
        );
        this.hireRequestVMs.push(thisHireRequestVM);
        otherUserType = "client";
        targetId = matchingHireRequests[hrInc].clientId;
      }
      thisHireRequestVM.originalHireRequest = matchingHireRequests[hrInc];
      this.getOtherUserName( hrInc, otherUserType, targetId )
      this.getProjectPositionTitle(hrInc, matchingHireRequests[hrInc].positionId)
    }
  //  console.log("After adding names")
  //  console.log(this.hireRequestVMs)
  }

  getOtherUserName(hrInc: number, userType:string, otherUserId: string): void {
    console.log(otherUserId)
    if(!otherUserId){
      console.log("No other contractor ID")
    }else{
      this.userService.getUserByUserId(otherUserId)
      .subscribe(
        otherUser => {
          console.log("Got other user:"+ otherUser.userName);
          // console.log(this.hireRequestVMs)
          this.hireRequestVMs[hrInc][userType+"Name"] = otherUser.userName;
        });
    }
  }

  getProjectPositionTitle(hrInc: number, ProjPosId: number): void {
    this.positionService.getProjectPositionByProjPosId(ProjPosId)
      .subscribe(
        projPos => {
          console.log("aaa")
          console.log(projPos)
          console.log("Got ProjectPosition:"+ this.positionDict[projPos.positionId]);
          this.hireRequestVMs[hrInc].positionTitle = this.positionDict[projPos.positionId];
          this.getProjectName(hrInc, projPos.projectId)
        });
  }

  getProjectName(hrInc: number, ProjId: string): void {
    this.projectService.requestProject(ProjId)
      .subscribe(
        gotProj => {
          if(gotProj == undefined){
            console.log("Skipped listing request due to no project found");
          }else{
            console.log("Got project name: "+ gotProj.projectName)
            this.hireRequestVMs[hrInc].projectName = gotProj.projectName;
          }
        });
  }

  approveHireRequest(thisHireRequestVM: HireRequestViewModel): void {
    this.updateHireRequest(thisHireRequestVM, "Approved");
  }

  denyHireRequest(thisHireRequestVM: HireRequestViewModel): void {
    this.updateHireRequest(thisHireRequestVM, "Denied");
  }

  updateHireRequest(thisHireRequestVM: HireRequestViewModel, newStatus: string): void {
    let thisHireRequest = thisHireRequestVM.originalHireRequest;
    thisHireRequest.requestStatus = newStatus;
    if(newStatus == "Approved"){
      this.approveProjectPosition(thisHireRequestVM);
    }
    // this.hireRequestService.updateHireRequest(thisHireRequest).subscribe(res => {
    //   console.log("Update succesful")
    //   if(newStatus == "Approved"){
    //     // this.positionService.updateProjectPosition();
    //   }
    //   this.getHireRequests();
    // });
  }

  approveProjectPosition(thisHireRequestVM: HireRequestViewModel): void{
    console.log("AAA")
    console.log(thisHireRequestVM)
    this.positionService.getProjectPositionByProjPosId(thisHireRequestVM.ProjectPositionId)
    .subscribe(
      projPos => {
        console.log("aaa")
        console.log(projPos)
        projPos.contractorId = thisHireRequestVM.originalHireRequest.contractorId;
        console.log(projPos)
        this.positionService.updateProjectPosition(projPos)
          .subscribe(
            anyRet => {
              console.log("bbb")
              console.log(anyRet)
            });
      });
  }

  deleteHireRequest(thisHireRequestVM: HireRequestViewModel): void {
    this.hireRequestVMs = this.hireRequestVMs.filter(p => p !== thisHireRequestVM);
    this.hireRequestService.deleteHireRequest(thisHireRequestVM.originalHireRequest).subscribe(res => {
      console.log("Deletion succesful")
      // window.location.reload();
    });
  }

  goBack(){
    this.location.back();
  }

}
