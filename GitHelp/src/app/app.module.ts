import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxStripeModule } from 'ngx-stripe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HomePageComponent } from './components/home-page/home-page.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './services/in-memory-data.service';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddProjectFormComponent } from './components/add-project-form/add-project-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PositionsComponent } from './components/positions/positions.component';
import { ProjectService } from './components/services/project.service';
import { HireRequestsComponent } from './components/hire-requests/hire-requests.component';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';
import { UserService } from './components/services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    LoginFormComponent,
    UserProfileComponent,


    HomePageComponent,
    ProjectsComponent,
    ProjectListComponent,
    AddProjectFormComponent,
    NavbarComponent,
    PositionsComponent,
    HireRequestsComponent,
    StripePaymentComponent,
  ],
    imports: [
    RouterModule.forRoot(
      [
        { path: "", component: SignUpFormComponent}
      ]
    ),
    BrowserModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_live_51He61ZCIJStw0TfUvCbQYRsa3aPZ6QNTxFqnwu4IkTTah3WgQl72s8xZCkngOoSRU8XGDFXPU4aTpPabl8XIr57500SdTxxbkF'),
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
  providers: [ProjectService, UserService, FormsModule, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
