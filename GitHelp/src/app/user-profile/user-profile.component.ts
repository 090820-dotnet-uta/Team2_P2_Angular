import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinct } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilmethodsService } from '../utilmethods.service';
import { User } from '../models/User';
import { UserService } from '../models/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;
  changedUser: User;
  private editModeStatus;
  userEditForm: FormGroup;
  // @Output() editedUserEvent = new EventEmitter<User>();
  
  constructor(
    private utilmethodsService: UtilmethodsService,
    private route: ActivatedRoute,
    private clientService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let loginTypeDesired = 'any';
   // let loginChecksOut = this.utilmethodsService.loginCheck(loginTypeDesired);
    this.editModeStatus = "0";
    //  if(loginChecksOut){
    //    this.getUser();
    //  }
   }
    
  getUser(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getUser()
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
    this.editModeStatus = "1";
    this.userEditForm = new FormGroup(
      {
        firstName: new FormControl(this.user.firstName),
        lastName: new FormControl(this.user.lastName),
        email: new FormControl(this.user.email)
      }
    );
  }

  editOff(): void {
    this.editModeStatus = "0";
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
    this.clientService.updateUser(this.changedUser);
    //   .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
