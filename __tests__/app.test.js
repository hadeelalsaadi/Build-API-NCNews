const request = require("supertest")
const app = require("../app.js")
const db = require("../db/connection.js")
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data/index.js")
const endpoints= require("../endpoints.json")
 
beforeEach(()=>{ return seed(data)})
 afterAll(()=>{ 
     return db.end()
})
describe("/api",()=>{
    test("Get-200-respond with an object gives all availabe endpoints details",()=>{ 
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body})=>{
            expect(body.endpoints).toEqual(endpoints)
    
        })
    })
})
describe("/api/topics",()=>{
    test("Get-200 return all topics",()=>{
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then (({body})=>{
            expect(body.topics.length).toBe(3)
            body.topics.forEach((topic)=>{
                expect(typeof topic.description).toBe('string')
                expect(typeof topic.slug).toBe('string')
            })
           
        })
    })
   
})
describe("/api/articles/:article_id",()=>{
    test("get-200 response with the correct singuler articl",()=>{
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body})=>{
           
            expect(body.article.title).toBe("Living in the shadow of a great man")
            expect(body.article.topic).toBe("mitch")
            expect(body.article.author).toBe("butter_bridge")
            expect(body.article.body).toBe("I find this existence challenging")
            expect(typeof body.article.created_at).toBe("string")
            expect(body.article.votes).toBe(100)
            expect(body.article. article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
        })
    })
})