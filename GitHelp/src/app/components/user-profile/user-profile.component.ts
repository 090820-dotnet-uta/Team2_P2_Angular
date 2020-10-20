import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinct } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilmethodsService } from '../services/utilmethods.service';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;
  changedUser: User;
  // private editModeStatus;
  userEditForm: FormGroup;
  // @Output() editedUserEvent = new EventEmitter<User>();
  
  constructor(
    private utilmethodsService: UtilmethodsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
    // this.editModeStatus = "0";
     if(loginChecksOut){
       this.getUser();
     }
   }
    
  getUser(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByUserName(localStorage.getItem("currentUserName"))
      .subscribe(
        c => {
          console.log("Got result:");
          console.log(c);
          console.log(this.user);
          // console.log(c[0]);
          this.user = c;
        });
      
  }

  editOn(): void {
    // this.editModeStatus = "1";
    this.userEditForm = new FormGroup(
      {
        firstName: new FormControl(this.user.firstName),
        lastName: new FormControl(this.user.lastName),
        email: new FormControl(this.user.email)
      }
    );
  }

  editOff(): void {
    // this.editModeStatus = "0";
  }


  updateUser(): void {
    // console.log(`userEditForm name in child component => ${this.userEditForm.get('firstName').value}`);
    // let aaa = new User();
    this.changedUser = new User(this.user.userName,
      this.userEditForm.get('firstName').value,
      this.userEditForm.get('lastName').value,
      this.userEditForm.get('email').value
    )
    console.log(this.changedUser);
    
    // this.editedUserEvent.emit(this.changedUser);
    this.userService.updateUser(this.changedUser);
    //   .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
