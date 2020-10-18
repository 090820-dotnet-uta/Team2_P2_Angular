export class ProjectPositions {
    projectId: number;
    positionId: number;
    contractorId?:number;
    constructor(projectId: number, positionId : number, contractorId = 0){
        this.projectId = projectId;
        this.positionId = positionId;
    }
  }