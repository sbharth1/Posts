import { Schema, model } from 'mongoose';

interface typePostSchema {
  description: string;
  image: string;
  likes: number;
  commentsNo: number;
  likedBy: { type: Schema.Types.ObjectId[]; ref: string };  
  comments: {
    text: string;
    created: Date;
    commentedBy: Schema.Types.ObjectId; 
  }[];
  user: {
    type: Schema.Types.ObjectId;
    ref: string;
    required: boolean;
  };
}

const postSchema = new Schema<typePostSchema>(
  {
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [Schema.Types.ObjectId], 
      ref: 'User', 
    },
    commentsNo: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        commentedBy: {
          type: Schema.Types.ObjectId,  
          ref: 'User',  
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,  
      ref: 'User',  
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model<typePostSchema>('Post', postSchema);

export = Post;
