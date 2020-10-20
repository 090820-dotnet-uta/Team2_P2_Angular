import { Component, OnInit } from '@angular/core';
import { Contractor } from '../models/Contractor';
import{ User } from '../models/User';
import { LoginInfo } from '../models/LoginInfo';

import { UtilmethodsService } from '../utilmethods.service';
//TODO Import user service when it's created
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  Users: User[] = [];
  Contractors: Contractor[] = [];
  LoginInfos: LoginInfo[] =[];
  //Dummy data, remove! Replace with loggedInUser localstorage
  userType : number;
  loggedInUser: User | Contractor;
  
  constructor(
    private utilmethodsService: UtilmethodsService
  ) { }
  

  ngOnInit(): void {
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
    //Dummy data, remove later!
    // let user = new User();
    // user.firstName = 'bob';

    // this.userType = this.CliOrCon(user);
    // console.log(this.userType),
    // console.log(user instanceof User)
  }

  CliOrCon(loggedInUser: User | Contractor) : number
  {
      if(loggedInUser instanceof User)
      {
          this.userType = 1;
      }
      else
      {
        this.userType = 2;
      }
      return this.userType;
  }

  
}
