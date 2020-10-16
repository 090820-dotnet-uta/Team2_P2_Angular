// import { Injectable } from '@angular/core';
// //import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Client } from './models/Client';

// @Injectable({
//   providedIn: 'root'
// })
// export class InMemoryDataService implements InMemoryDbService {
//   createDb() {
//     const logininfo=[
//       {
//         LoginInfoId: 1,
//         Username: "aa",
//         Password: "aa"
//       }
//     ];
//     const clients =[
//       {
//         id: 1,
//         ClientId: 1,
//         Username: "aa",
//         FirstName: "Afn",
//         LastName: "Aln",
//         Description: "Test Client A",
//         Email: "Email Placeholder"
//       },
//       {
//         id: 2,
//         ClientId: 2,
//         Username: "bb",
//         FirstName: "Bfn",
//         LastName: "Bln",
//         Description: "Test Client B",
//         Email: "Email Placeholder"
//       }
//     ];
//     return {clients};
//     // const heroes = [
//     //   { id: 11, name: 'Dr Nice' },
//     //   { id: 12, name: 'Narco' },
//     //   { id: 13, name: 'Bombasto' },
//     //   { id: 14, name: 'Celeritas' },
//     //   { id: 15, name: 'Magneta' },
//     //   { id: 16, name: 'RubberMan' },
//     //   { id: 17, name: 'Dynama' },
//     //   { id: 18, name: 'Dr IQ' },
//     //   { id: 19, name: 'Magma' },
//     //   { id: 20, name: 'Tornado' }
//     // ];
//     // return {heroes};
//   }

//   // Overrides the genId method to ensure that a hero always has an id.
//   // If the heroes array is empty,
//   // the method below returns the initial number (11).
//   // if the heroes array is not empty, the method below returns the highest
//   // hero id + 1.
//   genId(clients: Client[]): number {
//     return clients.length > 0 ? Math.max(...clients.map(clients => clients.clientId)) + 1 : 11;
//   }
// }
