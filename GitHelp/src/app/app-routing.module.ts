import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpFormComponent } from 'src/app/sign-up-form/sign-up-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {path: '', component: SignUpFormComponent},
  //Maybe, login/signup page should be the landing page 
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'Home', component: HomePageComponent},
  {path: 'clientProfile/:id', component: ClientProfileComponent},
  {path: 'AddProject', component: AddProjectFormComponent },
  {path: 'ProjectEdit/:id', component: ProjectsComponent},
  {path: 'ProjectList', component: ProjectListComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
