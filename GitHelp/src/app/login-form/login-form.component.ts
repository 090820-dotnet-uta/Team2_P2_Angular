import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/services';


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
    private router: Router, private service: UserService) {
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
       // console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/Profile']);
      }, err =>{

      if (err.status == 400){
        console.log("get rekt kid");
      }
    }
    )

}


}
