import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { User } from '../models/User';

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

  editFormModel = this.fb.group({
    Email: ['', Validators.email],
    FirstName: [''],
    LastName: [''],
    // Password: ['', [Validators.required, Validators.minLength(4)]],
    description: ['']
  });

  // constructor(private messageService: MessageService) { }
  constructor(
    private router: Router, 
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dbUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
  
  /** GET user by id. Will 404 if id not found */
  getUserByUserName(currentUserName): Observable<User> {
    const url = `${this.dbUrl}/${currentUserName}`;
    console.log("Getting from "+ url);
    // return this.http.get<User>(url);
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user username=${currentUserName}`)),
      catchError(this.handleError<User>(`getUser username=${currentUserName}`))
    );
  }
  
  /** GET user by id. Will 404 if id not found */
  getUserByUserId(userId): Observable<User> {
    const url = `${this.dbUrl}/id/${userId}`;
    console.log("Getting from "+ url);
    // return this.http.get<User>(url);
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user username=${userId}`)),
      catchError(this.handleError<User>(`getUser username=${userId}`))
    );
  }

  setUserType(){
    this.getUserByUserName(localStorage.getItem("currentUserName"))
    .subscribe(
      c => {
        console.log("Got result:");
        console.log(c);
        localStorage.setItem('currentUserId', c.id);
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
    let thisUrl = `${this.dbUrl}/${user.id}`;
    
    let updatedUser = user;
    console.log("SSSSSSSSSSS")
    console.log(this.editFormModel)
    console.log(this.editFormModel.value.FirstName)
    updatedUser.firstName = this.editFormModel.value.FirstName;
    updatedUser.lastName = this.editFormModel.value.LastName;
    updatedUser.email = this.editFormModel.value.Email;
    updatedUser.description = this.editFormModel.value.description;
    console.log("Setting user to "+ thisUrl);
    console.log(user);
    return this.http.put(thisUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user username=${user.userName}`)),
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