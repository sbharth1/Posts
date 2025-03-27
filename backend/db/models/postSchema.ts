import { Schema, model, Document } from 'mongoose';

interface IComment {
    text: string;
    created: Date;
    commentedBy: Schema.Types.ObjectId;
}

interface IPost extends Document {
    description: string;
    image: string;
    likes: number;
    commentNo: number;
    likedBy: Schema.Types.ObjectId[];
    comments: IComment[];
    user: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    commentNo: {
      type: Number,
      default: 0,
    },
    comments: [{
      text: {
        type: String,
        required: true,
      },
      created: {
        type: Date,
        default: Date.now,
      },
      commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model<IPost>('Post', postSchema);

export =  Post;
