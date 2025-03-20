import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const {MONGODB_URL} = process.env;


if(!MONGODB_URL){
    console.error("MonogDB_URL is undefined!");
 }
// public url
const CONNECT_DB:string = MONGODB_URL || "mongodb://localhost:27017/data";

 async function dbConnect() {
    
    mongoose.connect(CONNECT_DB)
    .then(()=>{
        console.log("connected database")
    })
    .catch((err)=>{
        console.log(err +  "err in connection in database...")
    })

 }

 export = dbConnect;