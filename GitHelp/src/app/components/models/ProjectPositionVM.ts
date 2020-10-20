export class ProjectPositionVM {
    projectPositionsId: number;
    projectId: string;
    positionId: string;
    contractorId?:number;
    positionTitle:string;
    constructor(projectPositionsId: number, projectId: string, positionId : string, positionTitle: string, contractorId = 0){
        this.projectPositionsId = projectPositionsId;
        this.projectId = projectId;
        this.positionId = positionId;
        this.positionTitle = positionTitle;
    }
    
  }