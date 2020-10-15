import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  // {path: 'clientProfile/:id', component: ClientProfileComponent}
  {path: 'clientProfile', component: ClientProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
