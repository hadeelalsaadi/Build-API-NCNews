const fetchCommentsByArticleId = require("../models/comments.model")

const getCommentsByArticleId= (request,response,next)=>{
    
    const article_id= request.params.article_id
    return fetchCommentsByArticleId(article_id).then((comments)=>{
        response.status(200).send({comments})
    })

}
module.exports= getCommentsByArticleId