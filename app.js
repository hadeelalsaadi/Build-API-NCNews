const express = require("express");
const app = express();
const endpoints= require("./endpoints.json")
const getAllTopics= require("./controllers/topics.controllers.js")

app.get("/api", (requet, response)=>{
    response.status(200).send({endpoints: endpoints})
})

app.get("/api/topics",getAllTopics)



app.all("api/*",(request,response, next)=>{
    return response.status(404).send({msg: "invalid input"})
    next()
})


app.use((err,request, response,next)=>{
    response.status(500).send({msg: "internal server Error"})
})

module.exports= app