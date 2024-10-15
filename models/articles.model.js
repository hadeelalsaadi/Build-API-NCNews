const db= require("../db/connection.js")
 
const fetchArticleById = (article)=>{
    return db.query('SELECT * FROM articles WHERE article_id = $1',[article]).then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404, msg: "Not found"})
        }
       
        return rows[0]
    })

}

const fetchArticles=(sort_by="created_at")=>{
   
    return db.query(`SELECT 
        articles.author, articles.title, articles.article_id, articles.created_at , articles.topic, articles.votes,articles.article_img_url,
        COUNT(comments.article_id) As comment_count 
        FROM articles
        JOIN comments ON articles.article_id = comments.article_id 
        GROUP BY articles.article_id 
         ORDER BY articles.${sort_by} DESC;`)
    
       .then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404, msg: "Not found"})
        }
     return rows
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports= {fetchArticleById,fetchArticles}