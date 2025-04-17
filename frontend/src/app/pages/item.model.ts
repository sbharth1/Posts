export class Item {
    constructor(
      public _id : string,
      public description: string,
      public image : string,
      public likes: number,
      public commentNo:number,
      public comments:Comment[],
      public isDescriptionExpanded?: boolean,
      public newComment?:string,
    ) {}
  }
  
  export interface Comment {
    _id?: string;
    text: string;
    created: string;
    commentedBy: {
      _id: string;
      username: string;
      email?: string;
    };
  }
  
  