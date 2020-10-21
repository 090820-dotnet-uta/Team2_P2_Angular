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
  // userEditForm: FormGroup;
  isEditing: boolean;
  // @Output() editedUserEvent = new EventEmitter<User>();
  
  constructor(
    private utilmethodsService: UtilmethodsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userService.editFormModel.reset();
    let loginChecksOut = this.utilmethodsService.loginCheck("any");
    this.isEditing = false;
     if(loginChecksOut){
       this.getUser();
     }
   }
    
  getUser(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByUserName(localStorage.getItem("currentUserName"))
      .subscribe(
        gotUser => {
          console.log("Got result:");
          console.log(gotUser);
          console.log(this.user);
          this.user = gotUser;
          this.userService.editFormModel.reset();
          this.userService.editFormModel.setValue({
            Email: gotUser.email,
            FirstName: gotUser.firstName,
            LastName: gotUser.lastName,
            // Password: "",
            description: gotUser.description
          })
        });
      
  }

  editOn(): void {
    // this.userEditForm = new FormGroup(
    //   {
    //     firstName: new FormControl(this.user.firstName),
    //     lastName: new FormControl(this.user.lastName),
    //     email: new FormControl(this.user.email)
    //   }
    // );
    this.isEditing = true;
  }

  editOff(): void {
    this.isEditing = false;
    this.getUser();
  }

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe(
      (res: any) => {
        console.log('Edit complete');
        this.editOff();
      },
      err => {
        console.log(err);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
