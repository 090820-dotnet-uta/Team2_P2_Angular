export class HireRequest {
    hireRequestId: number;
    positionId: number; // Actually in practice ProjectPositionId
    clientId: string;
    contractorId: string;
    requestStatus: string;
    constructor(positionId: number, clientId: string, contractorId: string, hireRequestId?: number){
      this.positionId = positionId;
      this.clientId = clientId;
      this.contractorId = contractorId;
      this.requestStatus = "Pending";
      this.hireRequestId = hireRequestId;
    }
  }