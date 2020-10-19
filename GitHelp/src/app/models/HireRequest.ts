export class HireRequest {
    hireRequestId: number;
    positionId: number;
    clientId: string;
    contractorId: string;
    requestStatus: string;
    // thisClient	null
    // thisContractor	null
  }

  export class HireRequestViewModel {
    hireRequestId: number;
    positionId: number;
    clientId: string;
    contractorId: string;
    requestStatus: string;
    clientName: string;
    contractorName: string;
  }