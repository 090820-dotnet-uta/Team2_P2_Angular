import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpFormComponent } from 'src/app/sign-up-form/sign-up-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

const routes: Routes = [
  {path: '', component: SignUpFormComponent},
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  {path: 'clientProfile/:id', component: ClientProfileComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
