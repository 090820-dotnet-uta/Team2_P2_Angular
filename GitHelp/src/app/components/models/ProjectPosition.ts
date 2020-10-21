export class ProjectPosition {
    projectPositionsId: number;
    projectId: string;
    positionId: string;
    contractorId?:string;
    constructor(projectId: string, positionId : string, contractorId = 0){
        this.projectId = projectId;
        this.positionId = positionId;
    }
    
  }