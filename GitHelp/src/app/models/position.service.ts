import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Position } from '../models/Position';
import { ProjectPositions } from '../models/ProjectPositions';
import { MessageService } from '../message.service';
import { ProjectService } from '../models/project.service';
import { Project } from './Project';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionURL = "https://githelp.azurewebsites.net/api/Positions";
  private projectPositionURL = "https://githelp.azurewebsites.net/api/ProjectPositions"; 

  allPositions : Array<Position>;
  allProjects : Array<Project>;

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


  /** GET all ProjectProjects from the server*/
  getAllProjectPositions(): Observable<ProjectPositions[]> {
    return this.http.get<ProjectPositions[]>(this.positionURL)
      .pipe(
        tap(_ => this.log('fetched Positions')),
        catchError(this.handleError<ProjectPositions[]>('getAllPositions', []))
      );
  }

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
    return this.allPositions.find(p => p.positionId === id);
  }

  /** GET ALL the positions of a specific contractor by contractor id. Will 404 if id not found. (use with getting contractor's positions) */
  getContractorPositions(id: number): Observable<Position[]> {
    const url = `${this.positionURL}/?contractorId=${id}`;
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
  addPosition(projectpositions: ProjectPositions[]): Observable<ProjectPositions> {
    console.log("Inside addProjectPositions with list of projectPositions to be added: ", projectpositions);

    //For each project position in the form, post it to the database
    projectpositions.forEach(projPos => {
        console.log("About to post the following projectPosition to url ", this.projectPositionURL)
        console.log(projPos);
        this.http.post<ProjectPositions>(this.projectPositionURL, projPos, this.httpOptions)
        console.log("Added the following projectPosition ", projPos)
    })
    return;
    //   .pipe(
    //   tap((newProjectPosition: ProjectPositions) => this.log(`added new project position w/ ProjectId=${projPos.projectId} and PositionId=${projPos.positionId}`)),
    //   catchError(this.handleError<ProjectPositions>('addPosition'))
    // )
    // )
  
    // return this.http.post<ProjectPositions>(this.positionURL, projectposition, this.httpOptions)
    // );
  }

  /** PUT: update the POSITION on the server (Only available to Clients) */
  updateProjectPosition(projectposition: ProjectPositions): Observable<any> {
    console.log("Inside updateProjectPosition");
    return this.http.put(this.positionURL, ProjectPositions, this.httpOptions).pipe(
      tap(_ => this.log(`updated projectposition with ProjectId=${projectposition.projectId} and positionId=${projectposition.positionId}`)),
      catchError(this.handleError<any>('updateProjectPosition'))
    );
  }

  /** DELETE: delete the POSITION from the server (Only available to Clients) */
  deletePosition(position: Position | number): Observable<Position> {
    console.log("Inside deletePosition");
    const id = typeof position === 'number' ? position : position.positionId;
    const url = `${this.positionURL}/${id}`;

    return this.http.delete<Position>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted position PositionId=${id}`)),
      catchError(this.handleError<Position>('deletePosition'))
    );
  }




  
}
