import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { User } from '../models/User';
import { Contractor } from '../models/Contractor';
import { Project } from '../models/Project';
//TODO Import User service once it is created to use search method 


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  Users$: Observable<User[]>;
  Contractors$: Observable<Contractor[]>;
  Projects$: Observable<Project[]>;

  constructor() { }

  //Declare our searchterm that grows as the user types
  //We then push a search term into the observable stream
  private searchTerms = new Subject<string>();
  search(term: string): void{
    this.searchTerms.next(term);
  }


  //TODO Create the search method in User service
  ngOnInit(): void {
    //this.Users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      //debounceTime(300),

      // ignore new term if same as previous term
      //distinctUntilChanged(),

      // switch to new search observable each time the term changes
      //switchMap((term: string) => this.heroService.searchHeroes(term)),
    //)
  }

}
