const express = require("express");
const app = express();
const endpoints= require("./endpoints.json")
const getAllTopics= require("./controllers/topics.controllers.js")
const {getArticleById,getAllArticles}= require("./controllers/articles.controllers.js")
const getCommentsByArticleId= require("./controllers/comments.controller.js")
app.get("/api", (requet, response)=>{
    response.status(200).send({endpoints: endpoints})
})

app.get("/api/topics",getAllTopics)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)



app.all("api/*",(request,response, next)=>{
    return response.status(404).send({msg: "invalid input"})
    
})


app.use((err,request, response,next)=>{
    if(err.status && err.msg){
        response.status(err.status).send({msg: err.msg})
    }
    next(err)
})

app.use((err,request, response,next)=>{
    if(err.code=== "22P02"){
        response.status(400).send({msg: "Bad request"})
    }
    next(err)
})



app.use((err,request, response,next)=>{
    console.log(err.stack)
    response.status(500).send({msg: "internal server Error"})
})

module.exports= app



