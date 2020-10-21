import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/loginService';
import { UserService } from '../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

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

  // selectcontractor(): void{
  //   this.clientSelected = false;
  //   this.contractorSelected = true;
  // }

  // loginasclient(): void {
  //   console.log("Dummy client login");
  //   localStorage.setItem('currentUserName', 'user');
  //   localStorage.setItem('loginType', 'client');
  //   this.router.navigate(['/Profile']);
  // }

  // loginascontractor(): void {
  //   console.log("Dummy contractor login");
  //   localStorage.setItem('currentUserName', 'user');
  //   localStorage.setItem('loginType', 'contractor');
  //   this.router.navigate(['/Profile']);
  // }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any) => {
        console.log("Login valid");
        console.log(res);
        localStorage.setItem('currentUserId', res.id);
        localStorage.setItem('currentUserName', form.value.UserName);
        localStorage.setItem('token', res.token);
        this.userservice.setUserType();
        // this.router.navigate(['/Profile']);
      }, err =>{
        if (err.status == 400){
          console.log("get rekt kid");
        }
      }
    )
}

// getUserType(){
//   console.log("a");
//   this.userservice.getUser()
//   .subscribe(
//     c => {
//       console.log("Got result:");
//       console.log(c);
//       if(c.accountType == "client"){
//         localStorage.setItem('loginType', "client");
//         this.router.navigate(['/Profile']);
//       }else if(c.accountType == "contractor"){
//         localStorage.setItem('loginType', "contractor");
//         this.router.navigate(['/Profile']);
//       }
//       // console.log(this.user);
//       // console.log(c[0]);
//       // this.user = c;
//     });
//   // this.router.navigate(['/Profile']);
// }


}