import { DatePipe } from '@angular/common';

export class ProjectVM {
    projectId: number;
    //ID of the Client 
    userId: string;
    startDate: string = new Date().toDateString();
    endDate: string = new Date().toDateString();
    paymentOffered: number;
    projectName: string;
    description: string;
    positions?: object;
    constructor(projectId: number, userId: string, startDate: string, endDate: string, paymentOffered: number, 
        projectName: string, description: string){
      this.projectId = projectId;
      this.userId = userId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.paymentOffered = paymentOffered;
      this.projectName = projectName;
      this.description = description;
    }
  } 