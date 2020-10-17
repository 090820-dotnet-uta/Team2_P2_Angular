import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Position } from '../models/Position';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionURL = "https://githelp.azurewebsites.net/api/Positions";

  allPositions : Array<Position>;

  //What kind of info to return with http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Making use of HttpClient and messageService so they need to be part of the constructor
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //---------------------EXTRA METHODS -----------------------------------


  //Use messageService to log information about this position service
  private log(message: string) {
    this.messageService.add(`PositionService: ${message}`);
  }

  //process in which errors with PositionService are handled
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

  
  //---------------------GET METHODS -----------------------------------


  /** GET all Projects from the server*/
  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.positionURL)
      .pipe(
        tap(_ => this.log('fetched Positions')),
        catchError(this.handleError<Position[]>('getAllPositions', []))
      );
  }

  /** GET a project by project id (HTTP REQUEST). Will 404 if id not found.*/
  requestPosition(id: number): Observable<Position> {
    const url = `${this.positionURL}/?PositionId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    // const url = `${this.dbUrl}/?name=aa`;
    console.log("made it into requestPosition")
    console.log(url)
    // console.log(this.http.get<Client>(url))
    return this.http.get<Position>(url).pipe(
      tap(_ => this.log(`fetched position by positionId=${id}`)),
      catchError(this.handleError<Position>(`requestPosition PositionId=${id}`))
    );
  }

   /** GET a position by position id. NOT HTTP! Getting from local list .
    * Had to do this to avoid Observable parameter error
   */
   getPosition(id: number): Position {
    console.log("made it into getPosition")
    return this.allPositions.find(p => p.PositionId === id);
  }

  /** GET ALL the positions of a specific contractor by contractor id. Will 404 if id not found. (use with getting contractor's positions) */
  getContractorPositions(id: number): Observable<Position[]> {
    const url = `${this.positionURL}/?ContractorId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    // const url = `${this.dbUrl}/?name=aa`;
    console.log("made it into getContractorPositions")
    console.log(url)
    // console.log(this.http.get<Client>(url))
    return this.http.get<Position[]>(url).pipe(
      tap(_ => this.log(`fetched contractor id=${id}`)),
      catchError(this.handleError<Position[]>(`getContractorPositions ContractorId=${id}`))
    );
  }

  //---------------------ADD, UPDATE, DELETE METHODS -----------------------------------


  /** POST: add a new POSITION to the server (Only available to clients) */
  addPosition(position: Position): Observable<Position> {
    console.log("Inside addPosition");
    return this.http.post<Position>(this.positionURL, position, this.httpOptions).pipe(
      tap((newPosition: Position) => this.log(`added position w/ ClientId=${newPosition.PositionId}`)),
      catchError(this.handleError<Position>('addPosition'))
    );
  }

  /** PUT: update the POSITION on the server (Only available to Clients) */
  updatePosition(position: Position): Observable<any> {
    console.log("Inside updatePosition");
    return this.http.put(this.positionURL, position, this.httpOptions).pipe(
      tap(_ => this.log(`updated project ProjectId=${position.PositionId}`)),
      catchError(this.handleError<any>('updatePosition'))
    );
  }

  /** DELETE: delete the POSITION from the server (Only available to Clients) */
  deletePosition(position: Position | number): Observable<Position> {
    console.log("Inside deletePosition");
    const id = typeof position === 'number' ? position : position.PositionId;
    const url = `${this.positionURL}/${id}`;

    return this.http.delete<Position>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted position PositionId=${id}`)),
      catchError(this.handleError<Position>('deletePosition'))
    );
  }




  
}
