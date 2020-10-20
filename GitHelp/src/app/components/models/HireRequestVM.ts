import { HireRequest } from './HireRequest';

  export class HireRequestViewModel {
    ProjectPositionId: number; // called positionId in the DB
    clientId: string;
    contractorId: string;
    requestStatus: string;
    clientName: string;
    contractorName: string;
    projectName: string;
    positionTitle: string;
    originalHireRequest: HireRequest;
    
    constructor(ProjectPositionId: number, clientName: string, contractorName: string, requestStatus: string){
      this.ProjectPositionId = ProjectPositionId;
      this.clientName = clientName;
      this.contractorName = contractorName;
      this.requestStatus = requestStatus;
      this.projectName = "-";
      this.positionTitle = "-";
    }
  }