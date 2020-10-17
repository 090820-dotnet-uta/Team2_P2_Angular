import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Client } from './client';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // private dbUrl = 'api/clients';  // URL to web api
  private dbUrl = "https://githelp.azurewebsites.net/api/ApplicationUser";
  // private dbUrl = "https://localhost:5001/api/ApplicationUser";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // constructor(private messageService: MessageService) { }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a ClientService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ClientService: ${message}`);
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
  /** GET clients from the server */
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.dbUrl)
      .pipe(
        tap(_ => this.log('fetched clients')),
        catchError(this.handleError<Client[]>('getClients', []))
      );
  }
  
  /** GET client by id. Will 404 if id not found */
  getClient(): Observable<Client> {
    // const url = `${this.dbUrl}/?ClientId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    let currentUserName = localStorage.getItem("currentUserName");
    const url = `${this.dbUrl}/${currentUserName}`;
    console.log("Getting from "+ url);
    // return this.http.get<Client>(url);
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched client username=${currentUserName}`)),
      catchError(this.handleError<Client>(`getClient username=${currentUserName}`))
    );
  }

  /** PUT: update the client on the server */
  updateClient(client: Client): Observable<any> {
    console.log("aaa");
    return this.http.put(this.dbUrl, client, this.httpOptions).pipe(
      tap(_ => this.log(`updated client username=${client.userName}`)),
      catchError(this.handleError<any>('updateClient'))
    );
  }
  // UpdatePlayer(p: Player): Observable<void> {
  //   return this.http.put<void>(`${this.url}EditPlayer`, p, this.options);
  // }

  // /** POST: add a new client to the server */
  // addClient(client: Client): Observable<Client> {
  //   return this.http.post<Client>(this.dbUrl, client, this.httpOptions).pipe(
  //     tap((newClient: Client) => this.log(`added client w/ ClientId=${newClient.clientId}`)),
  //     catchError(this.handleError<Client>('addClient'))
  //   );
  // }

  // /** DELETE: delete the client from the server */
  // deleteClient(client: Client | number): Observable<Client> {
  //   const id = typeof client === 'number' ? client : client.clientId;
  //   const url = `${this.dbUrl}/${id}`;

  //   return this.http.delete<Client>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted client ClientId=${id}`)),
  //     catchError(this.handleError<Client>('deleteClient'))
  //   );
  // }

}