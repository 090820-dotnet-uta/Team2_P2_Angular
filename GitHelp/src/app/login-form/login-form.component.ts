import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  loginasclient(): void {
    console.log("Dummy client login");
    localStorage.setItem('currentUserName', 'user');
    localStorage.setItem('loginType', 'client');
    this.router.navigate(['/clientProfile']);
  }

  loginascontractor(): void {
    console.log("Placeholder contractor login");
  }

}
