import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilmethodsService } from '../services/utilmethods.service';
import { HireRequest } from '../models/HireRequest'
import { HireRequestViewModel } from '../models/HireRequestVM'
import { HireRequestService } from '../services/hire-request.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-hire-requests',
  templateUrl: './hire-requests.component.html',
  styleUrls: ['./hire-requests.component.css']
})
export class HireRequestsComponent implements OnInit {
  isClient: boolean;
  thisUserName: string;
  thisLoginType: string;
  thisUserId: string;
  hireRequests: HireRequest[];
  hireRequestVMs: HireRequestViewModel[];

  constructor(
    private utilmethodsService: UtilmethodsService,
    private hireRequestService: HireRequestService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
     if(loginChecksOut){
      this.thisUserName = localStorage.getItem('currentUserName');
      this.thisLoginType = localStorage.getItem('loginType');
      this.thisUserId = localStorage.getItem('currentUserId');
      if(this.thisLoginType == "client"){
        this.isClient = true;
      }else{
        this.isClient = false;
      }
       this.getHireRequests();
     }
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
            // console.log("aaaa")
            // console.log(this.thisUserId)
            // console.log(gottenHireRequests[hInc].clientId)
            // console.log(gottenHireRequests[hInc].contractorId )
            if(gottenHireRequests[hInc].clientId == this.thisUserId || gottenHireRequests[hInc].contractorId == this.thisUserId){
              matchingHireRequests.push(gottenHireRequests[hInc])
            }
          }
          console.log("Id Matching result:");
          console.log(matchingHireRequests);
          this.hireRequests = matchingHireRequests;
          this.getNameLists();
        });
  }

  getOtherUserName(hrInc: number, userType:string, otherUserId: string): void {
    console.log(otherUserId)
    if(!otherUserId){
      console.log("No other contractor ID")
    }else{
      this.userService.getUserByUserId(otherUserId)
      .subscribe(
        c => {
          console.log("Got other user:");
          console.log(c.userName);
          console.log(this.hireRequestVMs)
          this.hireRequestVMs[hrInc][userType+"Name"] = c.userName;
        });
    }
      
  }

  getNameLists(): void{
    this.hireRequestVMs = [];
    if(this.thisLoginType == "client"){
      for(let hrInc = 0;  hrInc < this.hireRequests.length; hrInc ++){
        let thisHireRequestVM = new HireRequestViewModel(
          this.thisUserName,
          "-",
          this.hireRequests[hrInc].requestStatus
        );
        this.hireRequestVMs.push(thisHireRequestVM);
        let otherUserType = "contractor";
        this.getOtherUserName( hrInc, otherUserType, this.hireRequests[hrInc].contractorId )
      }
    }else if(this.thisLoginType == "contractor"){
      for(let hrInc = 0;  hrInc < this.hireRequests.length; hrInc ++){
        let thisHireRequestVM = new HireRequestViewModel(
          "-",
          this.thisUserName,
          this.hireRequests[hrInc].requestStatus
        );
        this.hireRequestVMs.push(thisHireRequestVM);
        let otherUserType = "client";
        this.getOtherUserName( hrInc, otherUserType, this.hireRequests[hrInc].clientId )
      }
   }
   console.log("After adding names")
   console.log(this.hireRequestVMs)
  }

  goBack(){
    this.location.back();
  }

}
