export class PositionVM {
    positionId: number;
    positionTitle: string;
    Description: string;
    positionFieldName: string;

    constructor(positionId: number, positionTitle: string, Description: string, positionFieldName: string){
      this.positionId = positionId;
      this.positionTitle = positionTitle;
      this.Description = Description;
      this.positionFieldName = positionFieldName;
    }
  }