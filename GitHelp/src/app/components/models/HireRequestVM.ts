  export class HireRequestViewModel {
    hireRequestId: number;
    positionId: number;
    clientId: string;
    contractorId: string;
    requestStatus: string;
    clientName: string;
    contractorName: string;
    
    constructor(clientName: string, contractorName: string, requestStatus: string){
      this.clientName = clientName;
      this.contractorName = contractorName;
      this.requestStatus = requestStatus;
      this.projectName = "-";
      this.positionTitle = "-"; 
    }
  }