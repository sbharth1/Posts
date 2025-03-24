import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    description: {
        type: String,   
    },
    image: {
        type: String,
    },
    likes :{
        type:String,
        default:0
    },
    likedBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    comments: [
        {
            text: String,
            created:{type:Date,default:Date.now},
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
},{timestamps:true});


const Post = model('Post', postSchema);

export = Post;