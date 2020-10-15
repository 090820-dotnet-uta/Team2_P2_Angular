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
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


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
    ClientProfileComponent,
    
  ],
    imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
