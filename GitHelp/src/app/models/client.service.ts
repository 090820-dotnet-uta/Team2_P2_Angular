import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Client } from './Client';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private dbUrl = 'api/clients';  // URL to web api

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
  getClient(id: number): Observable<Client> {
    const url = `${this.dbUrl}/?ClientId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    // const url = `${this.dbUrl}/?name=aa`;
    console.log("aaa")
    console.log(url)
    // console.log(this.http.get<Client>(url))
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched client id=${id}`)),
      catchError(this.handleError<Client>(`getClient ClientId=${id}`))
    );
  }

  /** PUT: update the client on the server */
  updateHero(client: Client): Observable<any> {
    return this.http.put(this.dbUrl, client, this.httpOptions).pipe(
      tap(_ => this.log(`updated client ClientId=${client.ClientId}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new client to the server */
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.dbUrl, client, this.httpOptions).pipe(
      tap((newClient: Client) => this.log(`added client w/ ClientId=${newClient.ClientId}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }

  /** DELETE: delete the client from the server */
  deleteClient(client: Client | number): Observable<Client> {
    const id = typeof client === 'number' ? client : client.ClientId;
    const url = `${this.dbUrl}/${id}`;

    return this.http.delete<Client>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted client ClientId=${id}`)),
      catchError(this.handleError<Client>('deleteClient'))
    );
  }
}