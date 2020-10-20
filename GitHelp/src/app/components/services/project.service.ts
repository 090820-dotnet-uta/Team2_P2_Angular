import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Project } from '../models/Project';
import { User } from '../models/User';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //URL links us to the needed model
  //private dbUrl = 'api/projects'; 
  private projectURL = "https://githelp.azurewebsites.net/api/Projects";
  private projIdURL = "https://githelp.azurewebsites.net/api/Projects/userId";
  private latestProjURL = "https://githelp.azurewebsites.net/api/Projects/Latest"
  private skillURL = "https://githelp.azurewebsites.net/api/Skills";

  allProjects: Array<Project>;
  allClientProjects: Project[];
  newProject : Project;
  constructorProj: Project[] = [];
  //What kind of info to return with http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Making use of HttpClient and messageService so they need to be part of the constructor
  constructor(
    
    private http: HttpClient,
    private messageService: MessageService,
  
  ) { 
    this.http.get<Project[]>(this.projectURL).subscribe(p => {
    this.constructorProj = p}); 
  }


  //---------------------EXTRA METHODS -----------------------------------

  
  //Use messageService to log information about ProjectService
  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }

  //process in which errors with Projectservice are handled
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



   /** GET all Projects from the server (for use with the search method)*/
   getAllProjects(): Observable<Project[]> {

     console.log("Inside getAllProjects (service)");
     console.log();

    return this.http.get<Project[]>(this.projectURL);
      // .pipe(
      //   tap(_ => this.log('fetched Projects')),
      // catchError(this.handleError<Project[]>('getAllProjects', [])));
  }

  // getEveryProj(): Project[]
  // {
  //   console.log(this.everyProj);
  //   return this.everyProj;
  // }

  /** GET a project by project id (HTTP REQUEST). Will 404 if id not found.*/
  requestProject(id: string): Observable<Project> {
    const url = `${this.projectURL}/ProjectId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    // const url = `${this.dbUrl}/?name=aa`;
    console.log("made it into requestProject")
    console.log(url)
    // console.log(this.http.get<Client>(url))
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project by projectid=${id}`)),
      catchError(this.handleError<Project>(`requestProject ProjectId=${id}`))
    );
  }

   /** GET a project by project id. NOT HTTP, Used in project-list!.
    * Had to do this to avoid Observable parameter error
   */
   getProject(id: number): Project {
    console.log("made it into getProject")
    // console.log(this.http.get<Client>(url))
    return this.allProjects.find(p => p.projectId === id);
  }


  //Method gets either all a client's projects or all a contractor's projects 
  getCliProjects(id: string, title?: string) : Observable<Project[]> {
      
    console.log("Inside getCliProjects (service)");
    console.log("Id =" + id);
    const url = `${this.projIdURL}/${id}`;
    console.log(url)
    // if(title != null)
    // {
    //   this.http.get<Project[]>(url);

    // }
    return this.http.get<Project[]>(url);

  }

  //Gets the latest project for a client 
  // getLatestCliProject(userId: string): Observable<Project>{
  //   const url = `${this.latestProjURL}/${userId}`;
  //   console.log("Inside getLatestCliProject (service)");
  //   console.log("Id =" + userId);
  //   return this.http.get<Project>(url);
  // }

  getLatestCliProject(userId: string) : Observable<Project>{
    const url = `${this.latestProjURL}/${userId}`;
    console.log("Inside getLatestCliProject (service)");
    console.log("Id =" + userId);
    return this.http.get<Project>(url);
  }


  //TODO COMBINE getClientProject AND getContractorProjects INTO ONE METHOD!! 

  /** GET a project by client id. Will 404 if id not found. (use with getting client's projects) */
  getClientProjects(id: User | number): Observable<Project> {
    const url = `${this.projectURL}/?ClientId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    // const url = `${this.dbUrl}/?name=aa`;
    console.log("made it into getClientProjects")
    console.log(url)
    // console.log(this.http.get<Client>(url))
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project by client id=${id}`)),
      catchError(this.handleError<Project>(`getClientProjects ClientId=${id}`))
    );
  }
  
  /** GET a project by contractor id. Will 404 if id not found. (use with getting contractor's projects) */
  getContractorProjects(id: User | number): Observable<Project> {
    const url = `${this.projectURL}/?ContractorId=${id}`;
    // const url = `${this.dbUrl}/${id}`;
    // const url = `${this.dbUrl}/?name=aa`;
    console.log("made it into getContractorProjects")
    console.log(url)
    // console.log(this.http.get<Client>(url))
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project by contractor id=${id}`)),
      catchError(this.handleError<Project>(`getContractorProjects ContractorId=${id}`))
    );
  }


  //---------------------ADD, UPDATE, DELETE METHODS -----------------------------------


  /** POST: add a new PROJECT to the server (Only available to Clients) */
  addProject(project: Project): Observable<Project> {
    console.log("Inside addproject...");
    console.log(this.projectURL);
    console.log(project);
    return this.http.post<Project>(this.projectURL, project, this.httpOptions)
    .pipe(
      tap((newProject: Project) => this.log(`added project w/ ProjectId=${newProject.projectId}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }
 
  /** PUT: update the PROJECT on the server (Only available to Clients) */
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectURL, project, this.httpOptions).pipe(
      tap(_ => this.log(`updated project ProjectId=${project.projectId}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** DELETE: delete the PROJECT from the server (Only available to Clients) */
  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.userId;
    const url = `${this.projectURL}/${id}`;

    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted project ProjectId=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }
}
