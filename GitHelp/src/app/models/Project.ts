import { DatePipe } from '@angular/common';

export class Project {
    ProjectId: number;
    ClientId: number;
    StartDate: string = new Date().toDateString();
    EndDate: string = new Date().toDateString();
    ProjectName: string;
    Description: string;
  }