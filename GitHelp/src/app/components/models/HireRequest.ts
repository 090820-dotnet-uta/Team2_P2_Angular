export class HireRequest {
    hireRequestId: number;
    positionId: number; // Actually in practice ProjectPositionId
    clientId: string;
    contractorId: string;
    requestStatus: string;
    constructor(positionId: number, clientId: string, contractorId: string){
      this.positionId = positionId;
      this.clientId = clientId;
      this.contractorId = contractorId;
      this.requestStatus = "pending";
    }
  }