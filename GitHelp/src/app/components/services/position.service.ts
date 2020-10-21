import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Position } from '../models/Position';
import { ProjectPositions } from '../models/ProjectPositions';
import { MessageService } from '../services/message.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { HireRequest } from '../models/HireRequest';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionURL = "https://githelp.azurewebsites.net/api/Positions";
  private projectPositionURL = "https://githelp.azurewebsites.net/api/ProjectPositions"; 
  private hireRequestURL = "https://githelp.azurewebsites.net/api/HireRequests"; 

  allPositions : Array<Position>;
  allProjects : Array<Project>;
  newPosition: ProjectPositions;

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
      if(operation == "getProjectPositionsByProject"){
        // console.log("getProjectPositionsByProject returned empty")
        // This operation is sometimes expected to return empty
      }else{
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
      }
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
  //---------------------GET METHODS -----------------------------------


  /** GET all ProjectProjects from the server*/
  getAllProjectPositions(): Observable<ProjectPositions[]> {
    return this.http.get<ProjectPositions[]>(this.projectPositionURL)
      .pipe(
        tap(_ => this.log('fetched Positions')),
        catchError(this.handleError<ProjectPositions[]>('getAllPositions', []))
      );
  }


 
  /** GET ProjectPosition for a project position ID*/
  getProjectPositionByProjPosId(ProjPosId: number): Observable<ProjectPositions> {
    const queryURL = this.projectPositionURL +"/"+ ProjPosId;
    console.log("Querying "+ queryURL)
    return this.http.get<ProjectPositions>(queryURL)
      .pipe(
        tap(_ => this.log('fetched ProjectPositions')),
        catchError(this.handleError<ProjectPositions>('getProjectPositionsByProject', ))
      );
  }


  /** GET ProjectPositions for a project*/
  getProjectPositionsByProject(projId: number): Observable<ProjectPositions[]> {
    const queryURL = this.projectPositionURL + "/Projects/" + projId;
    console.log("Querying "+ queryURL)
    return this.http.get<ProjectPositions[]>(queryURL)
      .pipe(
        tap(_ => this.log('fetched ProjectPositions')),
        catchError(this.handleError<ProjectPositions[]>('getProjectPositionsByProject', []))
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
  addPosition(projectPositions: ProjectPositions): Observable<ProjectPositions> {
    console.log("Inside addProjectPositions with list of projectPositions to be added: ", ProjectPositions);
    let queryReturn;
    queryReturn = this.http.post<ProjectPositions>(this.projectPositionURL, projectPositions, this.httpOptions)
    console.log(queryReturn)
    return queryReturn;
  }

  /** PUT: update the ProjectPosition on the server (Done when accepting a hire request) */
  updateProjectPosition(projectposition: ProjectPosition): Observable<any> {
    console.log("Inside updateProjectPosition");
    let thisUrl = this.projectPositionURL + "/" + projectposition.projectPositionsId;
    console.log("Updating "+ thisUrl);
    return this.http.put(thisUrl, projectposition, this.httpOptions).pipe(
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

  /** GET a project by project id (HTTP REQUEST). Will 404 if id not found.*/
  addHireRequest(hireRequest: HireRequest): Observable<HireRequest> {
    console.log("Inside addProjectPositions with list of projectPositions to be added: ", hireRequest);
    let queryReturn;
    queryReturn = this.http.post<HireRequest>(this.hireRequestURL, hireRequest, this.httpOptions)
    console.log(queryReturn)
    return queryReturn;
  }




  
}
