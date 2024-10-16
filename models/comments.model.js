const db= require("../db/connection.js")

 
const fetchCommentsByArticleId = (article_id)=>{

    return db.query('SELECT * FROM comments WHERE article_id= $1;',[article_id]).then(({rows})=>{
    console.log(rows)
    return rows
})
}
module.exports= fetchCommentsByArticleId