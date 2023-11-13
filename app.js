const express = require("express");
const app = express();
const path = require("path");
const dirPath = path.join(__dirname,"./public/index.html")

//mongo db import
const mongoose = require("mongoose");

// create database schema 
const NewSchema = new mongoose.Schema({
    name:{require:true, type: "String"},
    age:{require:true, type:"Number"},
})

// Now create database Model
const NewModel = new mongoose.model("My Latest",NewSchema)


console.log(dirPath)

app.use(express.urlencoded({extended:true}))

const data=[]

app.get("/", (req, res) => {
    res.sendFile(dirPath)
})

// Now Work On this for sending Data to MongoBD

app.post("/submit",async (req, res) => {
   const {Name,Age}=req.body;
   try{
    const New = await NewModel.create({
        name: Name,
        age: Age
    });
    res.send("Successfully")

   }
   catch(err){
    res.send("Error: " + err.message)


   }
})
app.get("/users", (req, res) => {
    res.send(data)
})


app.listen(2500,()=>{
    console.log("Mongoose listening Done!");
})


mongoose.connect("mongodb://localhost:27017/firstDb")
.then(()=>{
    console.log("Connected DB")

})
.catch((err)=>{
    console.log(err);

})