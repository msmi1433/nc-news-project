const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET endpoints", () => {
  describe("GET /api/topics", () => {
    test("200: responds with a 200", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("200: responds with array of topic objects with correct properties and length", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(res.body.topics.length).toBe(3);
          res.body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug", expect.any(String));
            expect(topic).toHaveProperty("description", expect.any(String));
          });
        });
    });
  });
  describe("CORE: GET /api", () => {
    test("200: responds with object that matches local enspoints JSON", () => {
      const endpointsJson = require("../endpoints.json");
      return request(app)
        .get("/api")
        .expect(200)
        .then((endpoints) => {
          expect(endpoints.body.endpoints).toEqual(endpointsJson);
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("200: responds with one article object with correct keys", () => {
      const desiredKeyArray = [
        "article_id",
        "title",
        "topic",
        "author",
        "body",
        "created_at",
        "article_img_url",
        "comment_count",
      ];
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((res) => {
          expect(typeof res.body.article).toBe("object");
          expect(Array.isArray(res.body.article)).toBe(false);
          const hasDesiredKeys = desiredKeyArray.every((key) =>
            res.body.article.hasOwnProperty(key)
          );
          expect(hasDesiredKeys).toBe(true);
        });
    });
    test("200: responds with correct article based on id given", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((res) => {
          expect(res.body.article.article_id).toBe(2);
          expect(res.body.article.title).toBe("Sony Vaio; or, The Laptop");
        });
    });
    test("200: responds with correct comment count for given article", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          expect(body.article.comment_count).toBe(0);
        });
    });
    test("400: responds with a 400 and err message when input article_id is not a number", () => {
      return request(app)
        .get("/api/articles/dog")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("invalid data-type");
        });
    });
    test("404: errors when article_id provided is a number, but does not exist in db", () => {
      return request(app)
        .get("/api/articles/56893")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("article_id does not exist");
        });
    });
  });
  describe("GET /api/articles", () => {
    test("200: responds with an array of article objects of correct length", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(13);
        });
    });
    test("200: articles objects have the correct properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
    test("200: articles are sorted by date (DESC order)", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
    describe("Queries", () => {
      test("200: articles can be filtered by existing TOPIC", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).toBe(12);
            body.articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
            });
          });
      });
      test("200: articles can be sorted by allowed fields", () => {
        return request(app)
          .get("/api/articles?sort_by=comment_count")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("comment_count", {
              descending: true,
            });
          });
      });
      test("200: articles are ordered by defined order", () => {
        return request(app)
          .get("/api/articles?order=ASC")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("created_at", {
              ascending: true,
            });
          });
      });
      test("200: accepts multiple valid queries at once", () => {
        return request(app)
          .get("/api/articles?topic=mitch&sort_by=comment_count&order=ASC")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).toBe(12);
            expect(body.articles).toBeSortedBy("comment_count", {
              ascending: true,
            });
            body.articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
            });
          });
      });
    });
    test("200: returns empty array when given topic with no articles", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
    test("400: errors when given non-greenlisted sort_by", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid sort_by query");
        });
    });
    test("400: errors when given non-greenlisted order", () => {
      return request(app)
        .get("/api/articles?order=drop")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid order query");
        });
    });
    test("404: errors when given topic that does not exist", () => {
      return request(app)
        .get("/api/articles?topic=myles")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("topic does not exist");
        });
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    test("200: responds with array of comment objects of correct length", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments.length).toBe(2);
        });
    });
    test("200: returned comment object(s) have correct properties", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number),
              })
            );
          });
        });
    });
    test("200: comments are ordered by created_at (DESC)", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("404: article does not exist", () => {
      return request(app)
        .get("/api/articles/300/comments")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("article_id does not exist");
        });
    });
    test("200: returns empty array for articles with no comments", () => {
      return request(app)
        .get("/api/articles/11/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toEqual([]);
        });
    });
  });
  describe("GET /api/users", () => {
    test("200: returns an array of all correctly formed user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).toBe(4);
          body.users.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          });
        });
    });
  });
});
