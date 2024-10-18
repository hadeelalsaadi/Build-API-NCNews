const db= require("../db/connection.js")




 
const fetchArticleById = (article)=>{

    return db.query(`SELECT 
        articles.author, articles.title, articles.article_id, articles.created_at , articles.topic, 
        articles.body,
        articles.votes,articles.article_img_url,
        COUNT(comments.article_id) As comment_count 
        FROM articles
         LEFT JOIN comments ON articles.article_id = comments.article_id 
         WHERE articles.article_id = $1
         GROUP BY articles.article_id `,[article])
    
    .then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404, msg: "Not found"})
        }
       
        return rows[0]
    })
}




const fetchArticles=(sort_by="created_at",order= "desc", topic)=>{
    const validSortBy = ["title", "created_at", "topic"]
    if (!validSortBy.includes(sort_by)){
        return Promise.reject({status: 400, msg:"Bad request" })
    }
    
    return db.query(`SELECT 
        articles.author, articles.title, articles.article_id, articles.created_at , articles.topic, articles.votes,articles.article_img_url,
        COUNT(comments.article_id) As comment_count 
        FROM articles
         LEFT JOIN comments ON articles.article_id = comments.article_id 
         GROUP BY articles.article_id 
         ORDER BY articles.${sort_by} ${order};`)
    
       .then(({rows})=>{
        
        if(topic){
            
            const filteredRows = rows.filter((row)=> row.topic===topic)
            if(filteredRows.length===0){
                return Promise.reject({status:404, msg: "Not found"})
            }
           return filteredRows

        }
        if(rows.length===0){
            return Promise.reject({status:404, msg: "Not found"})
        }
     return rows
    })
  
}
 

const incrementVotes= (article_id,incVote)=>{
    return db.query(`UPDATE articles
SET votes = votes + $1
WHERE article_id = $2 RETURNING *;`, [incVote, article_id]).then(({rows})=>{
   if(rows.length===0){
   
    return Promise.reject({status:400, msg: "Bad request"})
   }
  
    return rows[0]
})
}

module.exports= {fetchArticleById,fetchArticles, incrementVotes}