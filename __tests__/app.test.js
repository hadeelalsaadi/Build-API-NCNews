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
            
            expect(body.articles.length).not.toBe(0)
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
    test("Get-200 response with all articles details SORTED DESCENDING",()=>{

        return request(app)
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then(({body:{articles}})=>{
            expect(articles).toBeSorted({ descending: true })

        })
    })
})

describe("/api/articles/:article_id/comments",()=>{
    test("GET-200 respond with an array comments for the given article_id ",()=>{
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({body})=>{
           
            expect(body.comments.length).toBe(11)
            body.comments.forEach((comment)=>{
                expect(typeof comment.comment_id).toBe("number")
                expect(typeof comment.votes).toBe("number")
                expect(typeof comment.created_at).toBe("string")
                expect(typeof comment.author).toBe("string")
                expect(typeof comment.body).toBe("string")
                expect(typeof comment.article_id).toBe("number")

            })
            

        })
    })
    test("GET-400 response with bad request when passed in invalid data type",()=>{
        return request(app)
        .get("/api/articles/banana/comments")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
 
        })
    })
    test("GET-404 response if passed in an Id that is not exist",()=>{

        return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("Not found")
 
        })
    })
    test("GET-200 response with empty arry when passed an id that exsit in article but no comments related ",()=>{
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({body})=>{
            expect(Array.isArray(body.comments)).toBe(true)
            expect(body.comments.length).toBe(0)
 
        })
    })
})
describe("/api/articles/:article_id/comments",()=>{
    test("POST-201 response with secceful massage when posted a comment",()=>{
        return request(app)
        .post("/api/articles/2/comments")
        .expect(201)
        .send({username :"butter_bridge",
            body: "I am just posting a comment."
        })


        .then(({body})=>{

            const newComment = body.newComment
            expect(newComment.body).toBe( "I am just posting a comment.")
            expect(newComment.author).toBe("butter_bridge")
            expect(newComment.article_id).toBe(2)
            expect(newComment).toHaveProperty("votes")
            expect(newComment).toHaveProperty("created_at")


        })
    })
    test("POST-400 response bad request if user input number in username",()=>{
        return request(app)
        .post("/api/articles/2/comments")
        .send({
            username :2222,
            body: "I am just posting a invalid request"})
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("POST-400 response bad request if user input not data!",()=>{
        return request(app)
        .post("/api/articles/2/comments")
        .send({})
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    

})


describe("/api/articles/:article_id",()=>{
    test("PATCH-200 respond with the updated article increment votes by value",()=>{
        return request(app)
        .patch("/api/articles/1")
        .send({inc_votes: 3})
        .expect(200)
        .then(({body})=>{
            
            expect(body.article.article_id).toBe(1)
            expect(body.article.votes).toBe(103)
            expect(typeof body.article.title).toBe("string")
            expect(typeof body.article.topic).toBe("string")
            expect(typeof body.article.author).toBe("string")
            expect(typeof body.article.body).toBe("string")
            expect(typeof body.article.created_at).toBe("string")
            expect(typeof body.article.article_img_url).toBe("string")
        })
        
    })

    test("PATCH-200 respond with the updated article appending the article with votes propert with the sent value",()=>{
        return request(app)
        .patch("/api/articles/2")
        .send({inc_votes: 3})
        .expect(200)
        .then(({body})=>{
            expect(body.article).toHaveProperty("votes")
            expect(body.article.article_id).toBe(2)
            expect(body.article.votes).toBe(3)
            
        })
        
    })
    test("PATCH-404 response with not found if article does not exist",()=>{
        return request(app)
        .patch("/api/articles/999")
        .send({inc_votes: 3})
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("Not found")
            
        })

    })
    test("PATCH-400 response with bad request if user input invalid datatype",()=>{
        return request(app)
        .patch("/api/articles/1")
        .send({inc_votes: "Ok"})
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
            
        })

    })
    test("PATCH-400 response with bad request if user send empty object",()=>{
        return request(app)
        .patch("/api/articles/2")
        .send({})
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
            
        })

    })
 
})
describe("/api/comments/:comment_id",()=>{
    test("DELETE-204 response with no content and delete the given comment by comment_id",()=>{
        return request(app)
        .delete("/api/comments/3")
        .expect(204)
    
    })
    test("DELETE-400 response with bad request if invalid data type when passing comment_id",()=>{
        return request(app)
        .delete("/api/comments/id")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad request")
        })
    })
    test("DELETE-404 response with Not found if trying to delete comment not exist",()=>{
        return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("Not found")
        })
    })
})
describe("/api/users",()=>{
    test("GET-200 response with all users details",()=>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body})=>{
            
            body.users.forEach((user)=>{
                expect(typeof user.username).toBe("string")
                expect(typeof user.name).toBe("string")
                expect(typeof user. avatar_url).toBe("string")

            })
           
        })
    })
    test("GET-404 response with not found if user request table not exist",()=>{
        return request(app)
        .get("/api/user")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("invalid input")
        })
    })
})