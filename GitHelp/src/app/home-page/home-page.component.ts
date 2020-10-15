import { Component, OnInit } from '@angular/core';
import { Contractor } from '../models/Contractor';
import{ Client } from '../models/client';
import { LoginInfo } from '../models/LoginInfo';
//TODO Import user service when it's created
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  Clients: Client[] = [];
  Contractors: Contractor[] = [];
  LoginInfos: LoginInfo[] =[];
  userType : number;
  loggedInUser: Client | Contractor;
  
  constructor() { }
  

  ngOnInit(): void {
    //Dummy data, remove later!
    let user = new Client();
    user.firstName = 'bob';

    this.userType = this.CliOrCon(user);
    console.log(this.userType),
    console.log(user instanceof Client)
  }

  CliOrCon(loggedInUser: Client | Contractor) : number
  {
      if(loggedInUser instanceof Client)
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
