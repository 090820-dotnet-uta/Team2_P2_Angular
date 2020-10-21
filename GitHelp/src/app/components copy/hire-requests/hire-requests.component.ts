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
      this.thisUserId = localStorage.getItem('loginType');
      if(this.thisLoginType == "client"){
        this.isClient = true;
      }else{
        this.isClient = false;
      }
      localStorage.setItem('currentUserId', '');
       this.getHireRequests();
     }
   }
    
   getHireRequests(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.hireRequestService.getHireRequests()
      .subscribe(
        c => {
          console.log("Got result:");
          console.log(c);
          console.log(this.hireRequests);
          // console.log(c[0]);
          this.hireRequests = c;
          this.getNameLists();
        });
  }

  getOtherUserName(hrInc: number, userType:string, otherUserId: string): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByUserId(otherUserId)
      .subscribe(
        c => {
          console.log("Got other user:");
          console.log(c.userName);
          console.log(this.hireRequestVMs)
          this.hireRequestVMs[hrInc][userType+"Name"] = c.userName;
        });
      
  }

  getNameLists(): void{
    this.hireRequestVMs = [];
    if(this.thisLoginType == "client"){
      for(let hrInc = 0;  hrInc < this.hireRequests.length; hrInc ++){
        let thisHireRequestVM = new HireRequestViewModel(
          this.thisUserName,
          "placeholder",
          this.hireRequests[hrInc].requestStatus
        );
        this.hireRequestVMs.push(thisHireRequestVM);
        let otherUserType = "contractor";
        // this.getOtherUserName( hrInc, otherUserType, this.hireRequests[hrInc].contractorId )
        this.getOtherUserName( hrInc, otherUserType, "6a70d447-e64a-4437-bc58-b1d4b8cf439c" )
      }
    }else if(this.thisLoginType == "contractor"){
      for(let hrInc = 0;  hrInc < this.hireRequests.length; hrInc ++){
        let thisHireRequestVM = new HireRequestViewModel(
          "placeholder",
          this.thisUserName,
          this.hireRequests[hrInc].requestStatus
        );
        this.hireRequestVMs.push(thisHireRequestVM);
        let otherUserType = "client";
        // this.getOtherUserName( hrInc, otherUserType, this.hireRequests[hrInc].contractorId )
        this.getOtherUserName( hrInc, otherUserType, "6a70d447-e64a-4437-bc58-b1d4b8cf439c" )
      }
   }
   console.log("After adding names")
   console.log(this.hireRequestVMs)
  }

}
