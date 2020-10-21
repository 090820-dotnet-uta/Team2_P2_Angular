export class PositionVM {
    positionId: number;
    positionTitle: string;
    description: string;
    positionFieldName: string;

    constructor(positionId: number, positionTitle: string, Description: string, positionFieldName: string){
      this.positionId = positionId;
      this.positionTitle = positionTitle;
      this.description = Description;
      this.positionFieldName = positionFieldName;
    }
  }