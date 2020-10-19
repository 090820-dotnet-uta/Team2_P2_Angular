import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HireRequest } from './HireRequest';


@Injectable({
  providedIn: 'root'
})
export class HireRequestService {
  private dbUrl = "https://githelp.azurewebsites.net/api/HireRequests";

  constructor(
    private router: Router, 
    private http: HttpClient
  ) { }

  /** GET users from the server */
  getHireRequests(): Observable<HireRequest[]> {
    console.log("Getting Hire Requests");
    return this.http.get<HireRequest[]>(this.dbUrl)
      // .pipe(
      //   tap(_ => this.log('fetched users')),
      //   catchError(this.handleError<HireRequest[]>('getUsers', []))
      // );
  }
}
