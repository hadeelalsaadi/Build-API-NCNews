const db= require("../db/connection.js")
const { commentData } = require("../db/data/test-data/index.js")

 
const fetchCommentsByArticleId = (article_id)=>{

    return db.query('SELECT * FROM comments WHERE article_id= $1;',[article_id]).then(({rows})=>{
    return rows
})
}
const  creatNewComment=(comment)=>{
    const {author,body, article_id}= comment

   return db.query(`INSERT INTO comments (body, author, article_id) VALUES ($1,$2,$3) RETURNING *;`,[body,author,article_id])
}
module.exports= {fetchCommentsByArticleId,creatNewComment}