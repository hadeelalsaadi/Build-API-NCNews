const {fetchArticleById,fetchArticles}  = require("../models/articles.model.js")



const getArticleById = (request,respons,next)=>{
    const {article_id}= request.params;
    return fetchArticleById(article_id).then((article)=>{
        respons.status(200).send({article})
    }).catch((err)=>{
        
       next(err)
    })

}

const getAllArticles = (request,respons,next)=>{
    return fetchArticles()
    .then((articles)=>{
     respons.status(200).send({articles})
   
    }).catch((err)=>{
     next(err)
    })
   
   }
   


module.exports= {getArticleById,getAllArticles}