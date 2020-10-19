export class ProjectPositions {
    projectId: string;
    positionId: number;
    contractorId?:number;
    constructor(projectId: string, positionId : number, contractorId = 0){
        this.projectId = projectId;
        this.positionId = positionId;
    }
  }