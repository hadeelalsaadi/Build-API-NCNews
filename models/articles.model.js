const db= require("../db/connection.js")
 
const fetchArticleById = (article)=>{
    return db.query('SELECT * FROM articles WHERE article_id = $1',[article]).then(({rows})=>{
        if(rows.length===0){
            return Promise.reject({status:404, msg: "Not found"})
        }
       
        return rows[0]
    })

}
module.exports= fetchArticleById