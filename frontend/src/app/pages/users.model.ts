export class Posts {
  constructor(
    public _id: string,
    public description: string,
    public image: string,
    public likes: number,
    public likedBy: string[],
    public commentNo: number,
    public comments: string[],
    public user: string,
    public isDescriptionExpanded?: boolean
  ) {}
}

export class Users {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public posts: Posts[]
  ) {}
}
