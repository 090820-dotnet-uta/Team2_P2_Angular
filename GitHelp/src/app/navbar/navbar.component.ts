import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Placeholder Title Front End';
  currentuserName : string;
  loginStatus :string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let loginType = localStorage.getItem("loginType");
    if(loginType == "client"){
      this.loginStatus = "1";
      this.currentuserName = localStorage.getItem("currentUserName");
    }else if(loginType == "contractor"){
      this.loginStatus = "2";
      this.currentuserName = localStorage.getItem("currentUserName");
    }else{
      this.loginStatus = "0";
      this.currentuserName = "";
    }
    
  }

  gotouserprofile(): void {
    console.log("Going to client profile");
    this.router.navigate(['/clientProfile']);
  }

  logout(): void {
    console.log("Logging out");
    localStorage.setItem('currentUserName', '');
    localStorage.setItem('loginType', '');
    this.router.navigate(['/login']);
  }

  gotologin(): void {
    console.log("Going to login");
    this.router.navigate(['/login']);
  }

  gotosignup(): void {
    console.log("Going to signup");
    this.router.navigate(['/signup']);
  }
}
