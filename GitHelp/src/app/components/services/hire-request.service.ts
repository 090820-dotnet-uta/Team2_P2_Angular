import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HireRequest } from '../models/HireRequest';

@Injectable({
  providedIn: 'root' 
})
export class HireRequestService {
  //What kind of info to return with http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
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
 
  /** PUT: update the HireRequest on the server (for approving or rejecting) */
  updateHireRequest(hireRequest: HireRequest): Observable<any> {
    const id = hireRequest.hireRequestId;
    const url = `${this.dbUrl}/${id}`;
    console.log("Updating "+ url)
    return this.http.put(url, hireRequest, this.httpOptions).pipe(
      tap(_ => this.log(`updated HireRequest hireRequestId=${hireRequest.hireRequestId}`)),
      catchError(this.handleError<any>('updateHireRequest'))
    );
  }

  /** DELETE: delete the HireRequest from the server (Only available to Contractors) */
  deleteHireRequest(hireRequest: HireRequest): Observable<HireRequest> {
    const id = hireRequest.hireRequestId;
    const url = `${this.dbUrl}/${id}`;
    console.log("Deleting "+ url)
    return this.http.delete<HireRequest>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted HireRequest hireRequestId=${id}`)),
      catchError(this.handleError<HireRequest>('deleteHireRequest'))
    );
  }

  //Use messageService to log information about HireRequestService
  private log(message: string) {
    // this.messageService.add(`HireRequestService: ${message}`);
  }
  
  //process in which errors with HireRequestService are handled
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
