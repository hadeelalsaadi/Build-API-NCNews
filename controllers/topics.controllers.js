const fetchTopic= require("../models/topics.models.js")

const getTopics = (request,respons,next)=>{

   return fetchTopic().then((topics)=>{
   
    respons.status(200).send({topics: topics})
})
}

module.exports= getTopics