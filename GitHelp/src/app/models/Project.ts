import { DatePipe } from '@angular/common';

export class Project {
    ProjectId: number;
    ClientId: number;
    StartDate: string = new Date().toDateString();
    EndDate: string = new Date().toDateString();
    ProjectName: string;
    Description: string;
    constructor(ProjectId: number = 0, ClientId: number = 0, StartDate: string = "Jan 1 1000", EndDate: string = "Jan 1 2000", ProjectName: string = "None", Description: string = "Nothing"){
      this.ProjectId = ProjectId;
      this.ClientId = ClientId;
      this.StartDate =StartDate;
      this.EndDate = EndDate;
      this.ProjectName = ProjectName;
      this.Description = Description;
    }
  }