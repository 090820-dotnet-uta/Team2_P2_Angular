import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';

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
    HomePageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
