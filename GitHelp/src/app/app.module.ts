import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContractorsComponent } from './components/contractors/contractors.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ContractorListComponent } from './components/contractor-list/contractor-list.component';
import { ContractorProfileComponent } from './components/contractor-profile/contractor-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { MessageComponent } from './components/message/message.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './services/in-memory-data.service';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddProjectFormComponent } from './components/add-project-form/add-project-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PositionsComponent } from './components/positions/positions.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { ProjectService } from './components/services/project.service';
import { HireRequestsComponent } from './components/hire-requests/hire-requests.component';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';



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
    StripePaymentComponent,
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
