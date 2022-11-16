import mongoose from "mongoose";


const { Schema, model ,Types} = mongoose;

const postSchema = new Schema ({
    title : String,
    content : String,
    authorId : String,
})

export default model('Post', postSchema)