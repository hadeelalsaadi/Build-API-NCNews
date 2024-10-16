const fetchCommentsByArticleId = require("../models/comments.model")
const {fetchArticleById} = require("../models/articles.model.js")

const getCommentsByArticleId= (request,response,next)=>{
    const {article_id}= request.params
    const promises = [fetchCommentsByArticleId(article_id),fetchArticleById(article_id)]
   
    
  
   Promise.all(promises).then((result)=>{
       const comments = result[0]
   
        response.status(200).send({comments: comments})
    }).catch((err)=>{
        
        next(err)
    })

}
module.exports= getCommentsByArticleId