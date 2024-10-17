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



const  deleteComment =(comment_id)=>{
    return db.query(`DELETE FROM comments
WHERE comment_id= $1;`,[comment_id]).then((result)=>{
   
   if(result.rowCount===0)
    return Promise.reject({status: 404, msg: "Not found"})
})

}
module.exports= {fetchCommentsByArticleId,creatNewComment,deleteComment}