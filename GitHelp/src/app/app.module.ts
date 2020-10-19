import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import { ContractorProfileComponent } from './contractor-profile/contractor-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { MessageComponent } from './message/message.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PositionsComponent } from './positions/positions.component';
import { PositionListComponent } from './position-list/position-list.component';
import { ProjectService } from './models/project.service';
import { HireRequestsComponent } from './hire-requests/hire-requests.component';



@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ContractorsComponent,
    SignUpFormComponent,
    LoginFormComponent,
    ClientListComponent,
    ContractorListComponent,
    ContractorProfileComponent,
    UserProfileComponent,


    HomePageComponent,
    SearchComponent,
    MessageComponent,
    ProjectsComponent,
    ProjectListComponent,
    AddProjectFormComponent,
    NavbarComponent,
    PositionsComponent,
    PositionListComponent,
    HireRequestsComponent,
  ],
    imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
      
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // ,
    // // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // // and returns simulated server responses.
    // // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )

  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
