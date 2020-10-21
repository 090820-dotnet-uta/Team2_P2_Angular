import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'GitHelp';
  currentuserName : string;
  loginStatus :string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let loginType = localStorage.getItem("loginType");
    if(loginType == "Client"){
      loginType = "client";
      localStorage.setItem('loginType', loginType);
    }else if(loginType == "Contractor"){
      loginType = "contractor";
      localStorage.setItem('loginType', loginType);
    }
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

  gotohomepage(): void {
    console.log("Going to home component");
    this.router.navigate(['/home']);
  }

  gotouserprofile(): void {
    console.log("Going to user profile");
    this.router.navigate(['/clientProfile']);
  }

  gotoprojects(): void {
    console.log("Going to hire requests");
    this.router.navigate(['/ProjectList']);
  }

  gotohirerequests(): void {
    console.log("Going to hire requests");
    this.router.navigate(['/HireRequests']);
  }
  logout(): void {
    console.log("Logging out");
    localStorage.setItem('currentUserName', '');
    localStorage.setItem('loginType', '');
    localStorage.setItem('currentUserId', '');
    localStorage.setItem('token', '');
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
