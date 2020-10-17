import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class UtilmethodsService {

  constructor(
    private router: Router
  ){ }

  loginCheck(checkinType: string): boolean {
    let loginType = localStorage.getItem("loginType");
    if(loginType != checkinType){
      console.log(`Login type mismatch of ${loginType} vs ${checkinType}; redirecting to login`);
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}