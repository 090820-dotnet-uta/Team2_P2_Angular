import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  clientSelected: boolean;
  contractorSelected: boolean;

  constructor(
    private router: Router) {
      this.clientSelected = false;
      this.contractorSelected = false;
    }

  ngOnInit(): void {
  }

  selectclient(): void{
    this.clientSelected = true;
    this.contractorSelected = false;
  }

  selectcontractor(): void{
    this.clientSelected = false;
    this.contractorSelected = true;
  }

  loginasclient(): void {
    console.log("Dummy client login");
    localStorage.setItem('currentUserName', 'user');
    localStorage.setItem('loginType', 'client');
    this.router.navigate(['/Profile']);
  }

  loginascontractor(): void {
    console.log("Dummy contractor login");
    localStorage.setItem('currentUserName', 'user');
    localStorage.setItem('loginType', 'contractor');
    this.router.navigate(['/Profile']);
  }

}
