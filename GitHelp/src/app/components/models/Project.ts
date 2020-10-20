import { DatePipe } from '@angular/common';

export class Project {
  constructor() {}
    projectId?: number;
    //ID of the Client 
    userId?: string;
    startDate: string = new Date().toDateString();
    endDate: string = new Date().toDateString();
    paymentOffered: number;
    projectName: string;
    description?: string;
    // constructor(ProjectId: number = 0, ClientId: number = 0, StartDate: string = "Jan 1 1000", EndDate: string = "Jan 1 2000", ProjectName: string = "None", Description: string = "Nothing"){
    //   this.ProjectId = ProjectId;
    //   this.ClientId = ClientId;
    //   this.StartDate =StartDate;
    //   this.EndDate = EndDate;
    //   this.ProjectName = ProjectName;
    //   this.Description = Description;
    // }
  }