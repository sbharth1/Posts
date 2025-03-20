import mongoose from 'mongoose'

// public url
const CONNECT_DB:string = "mongodb://localhost:27017/postUserData"

if(!CONNECT_DB){
    console.error("MonogDB_URL is undefined!");
 }

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