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
    test("get-400response with error when passing wrong data type of Id",()=>{
        return request(app)
        .get("/api/articles/id")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("get-404 response with error when passing not exist Id",()=>{
        return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("Not found")
        })
    })
})
describe("/api/articles",()=>{
    test("Get-200 response with all articles details without body",()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body})=>{
            console.log(body)
            expect(body.articles.length).toBe(5)
            body.articles.forEach((article)=>{
                expect(typeof article.author).toBe("string")
                expect(typeof article.title).toBe("string")
                expect(typeof article.article_id ).toBe("number")
                expect(typeof article.topic ).toBe("string")
                expect(typeof article.created_at).toBe("string")
                expect(typeof article.votes).toBe("number")
                expect(typeof article.article_img_url).toBe("string")
                expect(typeof article.comment_count).toBe("string")

            })
          
        })
    })
})

