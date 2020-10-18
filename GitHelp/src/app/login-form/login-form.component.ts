import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/services';
import { UserService } from '../models/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }

  constructor(
    private router: Router, private service: LoginService, private userservice: UserService) {
      // this.clientSelected = false;
      // this.contractorSelected = false;
    }

  ngOnInit(): void {
  }
  

  // login(): void {
  //   console.log("Dummy client login");
  //   localStorage.setItem('currentUserName', 'user');
  //   localStorage.setItem('loginType', 'client');
  //   localStorage.setItem('currentUserId', 'ee2889e6-7eb7-449a-930b-30a679e7bb91');
  //   this.router.navigate(['/Profile']);
  // }

  // selectclient(): void{
  //   this.clientSelected = true;
  //   this.contractorSelected = false;
  // }

  loginasclient(): void {
    console.log("Dummy client login");
    localStorage.setItem('currentUserName', 'user');
    localStorage.setItem('loginType', 'client');
    //Need to have this navigating to home page after login (same for contractor)
    this.router.navigate(['/Profile']);
  }


}
