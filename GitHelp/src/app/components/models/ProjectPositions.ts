export class ProjectPositions {
    projectId: string;
    positionId: string;
    contractorId?:number;
    constructor(projectId: string, positionId : string, contractorId = 0){
        this.projectId = projectId;
        this.positionId = positionId;
    }
    
  }