import { DatePipe } from '@angular/common';

export class ProjectVM {
    projectId?: number;
    //ID of the Client 
    userId?: string;
    startDate: string = new Date().toDateString();
    endDate: string = new Date().toDateString();
    paymentOffered: number;
    projectName: string;
    Description?: string;
    constructor(projectId: number, userId: string, startDate: string, endDate: string, paymentOffered: number, Description?: string){
      this.projectId = projectId;
      this.userId = userId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.paymentOffered = paymentOffered;
      this.Description = Description;
    }
  }