import { DatePipe } from '@angular/common';

export class ProjectVM {
<<<<<<< HEAD
    projectId?: number;
    //ID of the Client 
    userId?: string;
=======
    projectId: number;
    //ID of the Client 
    userId: string;
>>>>>>> ae33080da91edce0cbb6908a6c5425dc42afae44
    startDate: string = new Date().toDateString();
    endDate: string = new Date().toDateString();
    paymentOffered: number;
    projectName: string;
<<<<<<< HEAD
    Description?: string;
    constructor(projectId: number, userId: string, startDate: string, endDate: string, paymentOffered: number, Description?: string){
=======
    description: string;
    positions?: object;
    constructor(projectId: number, userId: string, startDate: string, endDate: string, paymentOffered: number, 
        projectName: string, description: string){
>>>>>>> ae33080da91edce0cbb6908a6c5425dc42afae44
      this.projectId = projectId;
      this.userId = userId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.paymentOffered = paymentOffered;
<<<<<<< HEAD
      this.Description = Description;
=======
      this.projectName = projectName;
      this.description = description;
>>>>>>> ae33080da91edce0cbb6908a6c5425dc42afae44
    }
  } 