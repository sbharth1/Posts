export class Posts {
    constructor(
      public description: string,
      public image: string,
      public likes: number,
      public likedBy: string[],
      public commentNo: number,
      public comments: string[],
      public user: string,
    ) {}
  }
  
  export class Users {
    constructor(
      public firstName: string,
      public lastName: string,
      public email: string,
      public posts: Posts[]
    ) {}
  }
  