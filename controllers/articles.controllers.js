const {fetchArticleById,fetchArticles, incrementVotes}  = require("../models/articles.model.js")








const getArticleById = (request,respons,next)=>{
    const {article_id}= request.params;
    return fetchArticleById(article_id).then((article)=>{
        respons.status(200).send({article})
    }).catch((err)=>{
        
       next(err)
    })

}





const getAllArticles = (request,respons,next)=>{
    const {sort_by, order,topic}= request.query
    return fetchArticles(sort_by, order,topic)
    .then((articles)=>{
     respons.status(200).send({articles})
   
    }).catch((err)=>{
     next(err)
    })
   
   }



const updateArticleById =(request,respons,next)=>{
   const incVote = request.body.inc_votes
   const article_id = request.params.article_id
   const promises = [fetchArticleById(article_id) ,incrementVotes(article_id, incVote)]

   
   Promise.all(promises).then((result)=>{
    const article = result[1]
    respons.status(200).send({article: article})
   }).catch((err)=>{
   
    next(err)
   })

}
   


module.exports= {getArticleById,getAllArticles, updateArticleById}