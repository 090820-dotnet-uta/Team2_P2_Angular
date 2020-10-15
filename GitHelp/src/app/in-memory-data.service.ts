import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Client } from './models/Client';
import { Contractor } from './models/Contractor';
import { Project } from './models/Project';
import { Position } from './models/Position';
import { Skill } from './models/Skill';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const logininfo=[
      {
        LoginInfoId: 1,
        Username: "aa",
        Password: "aa"
      },
      {
        LoginInfoId: 2,
        Username: "dumcont1",
        Password: "dumbcont1"
      },
      {
        LoginInfoId: 3,
        Username: "dumcont2",
        Password: "dumcont2"
      }
    ];
    const clients =[
      {
        id: 1,
        ClientId: 1,
        Username: "aa",
        FirstName: "Afn",
        LastName: "Aln",
        Description: "Test Client A",
        Email: "Email Placeholder"
      },
      {
        id: 2,
        ClientId: 2,
        Username: "bb",
        FirstName: "Bfn",
        LastName: "Bln",
        Description: "Test Client B",
        Email: "Email Placeholder"
      }
    ];

    const contractors = [
      {
        ContractorId: 1,
        Username: "dumcont1",
        FirstName: "bob",
        LastName: "bobby",
        Description: "coder man",
        Email: "123email",
      },
      {
        ContractorId: 2,
        Username: "dumcont2",
        FirstName: "tim",
        LastName: "timmy",
        Description: "hax guy",
        Email: "456gmail",
      },
    ];

    const projects = [
      {
        ProjectId: 1,
        ClientId: 1,
        StartDate: "Sat Jun 15 2020",
        EndDate: "Mon Jun 17 2020",
        ProjectName: "Code stuff",
        Description: "what is c#?",
      },
      {
        ProjectId: 2,
        ClientId: 1,
        StartDate: "Wed Jun 10 2020",
        EndDate: "Fri Apr 15 8049",
        ProjectName: "Coding Proj",
        Description: "Conquer earth with code",
      }
    ];

    const positions = [
      {
        PositionId: 1,
        ProjectId: 1,
        ContractorId: 1,
        PositionTitle: "Bossman",
        Description: "Run everything"
      },
      {
        PositionId: 2,
        ProjectId: 2,
        ContractorId: 2,
        PositionTitle: "Code Guru",
        Description: "Rule all subjects"
      }
    ];

    const skills = [
      {
        SkillId: 1,
        SkillName: "Krystal",
        Description: "Can write backend code in Krystal language"
      },
      {
        SkillId: 2,
        SkillName: "SOOP",
        Description: "Can make web APIs that adhere to SOOP standard",
      },
      {
        SkillId: 3,
        SkillName: "Kaos",
        Description: "Style HTML pages using Kaos",
      },
      {
        SkillId: 4,
        SkillName: "Quan",
        Description: "Can create a database using Quan",
      },
    ];

    return {clients, contractors, projects, positions, skills};
    // const heroes = [
    //   { id: 11, name: 'Dr Nice' },
    //   { id: 12, name: 'Narco' },
    //   { id: 13, name: 'Bombasto' },
    //   { id: 14, name: 'Celeritas' },
    //   { id: 15, name: 'Magneta' },
    //   { id: 16, name: 'RubberMan' },
    //   { id: 17, name: 'Dynama' },
    //   { id: 18, name: 'Dr IQ' },
    //   { id: 19, name: 'Magma' },
    //   { id: 20, name: 'Tornado' }
    // ];
    // return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(clients: Client[]): number {
    return clients.length > 0 ? Math.max(...clients.map(clients => clients.clientId)) + 1 : 11;
  }
}
