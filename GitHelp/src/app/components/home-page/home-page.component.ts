import { Component, OnInit } from '@angular/core';
import { Contractor } from '../models/Contractor';
import{ User } from '../models/User';
import { LoginInfo } from '../models/LoginInfo';

import { UtilmethodsService } from '../services/utilmethods.service';
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
  display : number;
  loggedInUser: string;
  
  constructor(
    private utilmethodsService: UtilmethodsService
  ) { }
  

  ngOnInit(): void {
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
    this.loggedInUser = localStorage.getItem("loginType");
    this.CliOrCon(this.loggedInUser);

    //Dummy data, remove later!
    // let user = new User();
    // user.firstName = 'bob';

    // this.userType = this.CliOrCon(user);
    // console.log(this.userType),
    // console.log(user instanceof User)
  }

  CliOrCon(loggedInUser: string) : void
  {
      if(loggedInUser === "client")
      {
          this.display = 1;
      }
      else if(loggedInUser === "contractor")
      {
        this.display = 2;
      }
  }

  
}
