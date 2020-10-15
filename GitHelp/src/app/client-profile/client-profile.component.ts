import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../models/Client';
import { ClientService } from '../models/client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  @Input() client: Client;
  
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    localStorage.setItem('currentUserName', 'user');
    this.getClient();
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

  // save(): void {
  //   this.clientService.updateClient(this.client)
  //     .subscribe(() => this.goBack());
  // }

  goBack(): void {
    this.location.back();
  }

}
