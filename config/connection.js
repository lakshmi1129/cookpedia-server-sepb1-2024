const mongoose = require("mongoose")

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDb Atlas Successfully connected with Cookpedia Server"); 
}).catch(err=>{
    console.log("MongoDb Connection failed!!");
    console.log(err);
})