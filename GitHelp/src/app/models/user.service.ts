import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from './User';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private dbUrl = 'api/users';  // URL to web api
  private dbUrl = "https://githelp.azurewebsites.net/api/ApplicationUser";
  // private dbUrl = "https://localhost:5001/api/ApplicationUser";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // constructor(private messageService: MessageService) { }
  constructor(
    private router: Router, 
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

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
  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dbUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
  
  /** GET user by id. Will 404 if id not found */
  getUser(): Observable<User> {
    // const url = `${this.dbUrl}/?UserId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    let currentUserName = localStorage.getItem("currentUserName");
    const url = `${this.dbUrl}/${currentUserName}`;
    console.log("Getting from "+ url);
    // return this.http.get<User>(url);
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user username=${currentUserName}`)),
      catchError(this.handleError<User>(`getUser username=${currentUserName}`))
    );
  }

  setUserType(){
    this.getUser()
    .subscribe(
      c => {
        console.log("Got result:");
        console.log(c);
        if(c.accountType == "client"){
          localStorage.setItem('loginType', "client");
          this.router.navigate(['/home']);
        }else if(c.accountType == "contractor"){
          localStorage.setItem('loginType', "contractor");
          this.router.navigate(['/home']);
        }
      });
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    console.log("aAa");
    return this.http.put(this.dbUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user username=${user.userName}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  // UpdatePlayer(p: Player): Observable<void> {
  //   return this.http.put<void>(`${this.url}EditPlayer`, p, this.options);
  // }

  // /** POST: add a new user to the server */
  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.dbUrl, user, this.httpOptions).pipe(
  //     tap((newUser: User) => this.log(`added user w/ UserId=${newUser.userId}`)),
  //     catchError(this.handleError<User>('addUser'))
  //   );
  // }

  // /** DELETE: delete the user from the server */
  // deleteUser(user: User | number): Observable<User> {
  //   const id = typeof user === 'number' ? user : user.userId;
  //   const url = `${this.dbUrl}/${id}`;

  //   return this.http.delete<User>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted user UserId=${id}`)),
  //     catchError(this.handleError<User>('deleteUser'))
  //   );
  // }

}