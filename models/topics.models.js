const db= require("../db/connection.js")
const fetchTopic= ()=>{
   
    return db.query('SELECT * FROM topics;').then((data)=>{
       
       return  data.rows

    })

}
module.exports= fetchTopic