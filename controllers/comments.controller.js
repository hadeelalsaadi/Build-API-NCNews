const {fetchCommentsByArticleId,creatNewComment,deleteComment} = require("../models/comments.model")
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

const addCommentToArticle=(request, response,next)=>{
    const requestBody = request.body
    const new_Comment ={}
    new_Comment.body= requestBody.body
    new_Comment.author= requestBody.username
    const article_id= request.params.article_id
   new_Comment.article_id= article_id
  
    creatNewComment(new_Comment).then((newComment)=>{
        response.status(201).send({newComment: newComment.rows[0]})
    }).catch((err)=>{
        next(err)
    })
}

const deleteCommentById= (request, response,next)=>{
    const {comment_id}= request.params
    deleteComment(comment_id).then((result)=>{
       
        response.status(204).send(result)
         
    }).catch((err)=>{
        next(err)
    })
}
module.exports={ getCommentsByArticleId,addCommentToArticle,deleteCommentById}