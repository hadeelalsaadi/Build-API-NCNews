const express = require("express");
const app = express();
const endpoints= require("./endpoints.json")
const getAllTopics= require("./controllers/topics.controllers.js")
const getArticleById= require("./controllers/articles.controllers.js")

app.get("/api", (requet, response)=>{
    response.status(200).send({endpoints: endpoints})
})

app.get("/api/topics",getAllTopics)
app.get("/api/articles/:article_id", getArticleById)



app.all("api/*",(request,response, next)=>{
    return response.status(404).send({msg: "invalid input"})
    next()
})
app.use((err,request, response,next)=>{
    if(err.code=== "22P02"){
        response.status(400).send({msg: "Bad request"})
    }
    next(err)
})


app.use((err,request, response,next)=>{
    response.status(500).send({msg: "internal server Error"})
})

module.exports= app