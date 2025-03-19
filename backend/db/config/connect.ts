import mongoose from 'mongoose'

const CONNECT_DB = "mongodb://localhost:27017/postUserData"

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