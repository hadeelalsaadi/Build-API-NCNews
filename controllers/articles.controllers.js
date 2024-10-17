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
   
    return fetchArticles(sort_by="created_at")
    .then((articles)=>{
     respons.status(200).send({articles})
   
    }).catch((err)=>{
     next(err)
    })
   
   }
const updateArticleById =(request,respons,next)=>{
   const incVote = request.body.inc_votes
   const article_id = request.params.article_id
   
   incrementVotes(article_id, incVote).then((article)=>{
    respons.status(200).send({article: article})
   }).catch((err)=>{
    next(err)
   })

}
   


module.exports= {getArticleById,getAllArticles, updateArticleById}