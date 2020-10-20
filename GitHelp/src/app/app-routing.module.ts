import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { SignUpFormComponent } from 'src/app/components/sign-up-form/sign-up-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddProjectFormComponent } from './components/add-project-form/add-project-form.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { PositionsComponent } from './components/positions/positions.component';
import { HireRequestsComponent } from './components/hire-requests/hire-requests.component';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/checkout', pathMatch: 'full' },
  {path: 'checkout', component: StripePaymentComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'signup', component: SignUpFormComponent},
  //Maybe, login/signup page should be the landing page 
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  {path: 'AddProject', component: AddProjectFormComponent },
  {path: 'ProjectEdit', component: ProjectsComponent},
  {path: 'ProjectList', component: ProjectListComponent},
  {path: 'clientProfile', component: UserProfileComponent},
  {path: 'Positions/:id', component: PositionsComponent},
  {path: 'HireRequests', component: HireRequestsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
