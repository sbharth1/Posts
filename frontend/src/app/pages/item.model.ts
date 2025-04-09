export class Item {
    constructor(
      public _id : string,
      public likes: number,
      public commentNo:number,
      public description: string,
      public image : string,
      public isDescriptionExpanded : boolean
    ) {}
  }
  