import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinct } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilmethodsService } from '../utilmethods.service';
import { Client } from '../models/client';
import { ClientService } from '../models/client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  @Input() client: Client;
  changedClient: Client;
  private editModeStatus;
  clientEditForm: FormGroup;
  // @Output() editedClientEvent = new EventEmitter<Client>();
  
  constructor(
    private utilmethodsService: UtilmethodsService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let loginTypeDesired = 'client';
    let loginChecksOut = this.utilmethodsService.loginCheck(loginTypeDesired);
    this.editModeStatus = "0";
    if(loginChecksOut){
      this.getClient();
    }
  }
    
  getClient(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient()
      .subscribe(
        c => {
          console.log("Got result:");
          console.log(c);
          // console.log(c[0]);
          this.client = c;
        });
      
  }

  editOn(): void {
    this.editModeStatus = "1";
    this.clientEditForm = new FormGroup(
      {
        firstName: new FormControl(this.client.firstName),
        lastName: new FormControl(this.client.lastName),
        email: new FormControl(this.client.email)
      }
    );
  }

  editOff(): void {
    this.editModeStatus = "0";
  }


  updateClient(): void {
    // console.log(`clientEditForm name in child component => ${this.clientEditForm.get('firstName').value}`);
    // let aaa = new Client();
    this.changedClient = new Client(this.client.userName,
      this.clientEditForm.get('firstName').value,
      this.clientEditForm.get('lastName').value,
      this.clientEditForm.get('email').value
    )
    console.log(this.changedClient);
    
    // this.editedClientEvent.emit(this.changedClient);
    this.clientService.updateClient(this.changedClient);
    //   .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
