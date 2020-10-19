import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilmethodsService } from '../utilmethods.service';
import { HireRequest } from '../models/HireRequest'
import { HireRequestViewModel } from '../models/HireRequest'
import { HireRequestService } from '../models/hire-request.service';


@Component({
  selector: 'app-hire-requests',
  templateUrl: './hire-requests.component.html',
  styleUrls: ['./hire-requests.component.css']
})
export class HireRequestsComponent implements OnInit {
  thisUserName: string;
  thisLoginType: string;
  thisUserId: string;
  hireRequests: HireRequest[];
  hireRequestVMs: HireRequestViewModel[];

  constructor(
    private utilmethodsService: UtilmethodsService,
    private hireRequestService: HireRequestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
     if(loginChecksOut){
      this.thisUserName = localStorage.getItem('currentUserName');
      this.thisLoginType = localStorage.getItem('loginType');
      this.thisUserId = localStorage.getItem('loginType');
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

  getNameLists(): void{
    if(this.thisLoginType == "client"){
      for(let hrInc = 0; hrInc ++; hrInc < this.hireRequests.length){
        let thisHireRequestVM = new HireRequestViewModel();
        this.hireRequestVMs.push(thisHireRequestVM);
      }
    }else if(this.thisLoginType == "contractor"){
      for(let hrInc = 0; hrInc ++; hrInc < this.hireRequests.length){
        let thisHireRequestVM = new HireRequestViewModel();
        this.hireRequestVMs.push(thisHireRequestVM);
      }
   }
   console.log("After adding names")
   console.log(this.hireRequestVMs)
  }

}
