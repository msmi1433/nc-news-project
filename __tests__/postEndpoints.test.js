const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("POST endpoints", () => {
  describe("POST /api/articles/:article_id/comments", () => {
    test("201: posts comment and returns posted comment to user", () => {
      const newComment = {
        username: `butter_bridge`,
        body: `my name is Jonny`,
      };
      return request(app)
        .post("/api/articles/9/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            comment_id: 19,
            body: `my name is Jonny`,
            article_id: 9,
            author: `butter_bridge`,
            votes: 0,
            created_at: expect.any(String),
          });
        });
    });
    test("404: error if article_id does not exist", () => {
      const newComment = {
        username: `butter_bridge`,
        body: `my name is Jonny`,
      };
      return request(app)
        .post("/api/articles/400/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article_id does not exist");
        });
    });
    test("400: error if article_id provided is wrong format", () => {
      const newComment = {
        username: `butter_bridge`,
        body: `my name is Jonny`,
      };
      return request(app)
        .post("/api/articles/banana/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid data-type");
        });
    });
    test("400: errors when posted comment object is not complete", () => {
      const newComment = {
        username: `butter_bridge`,
      };
      return request(app)
        .post("/api/articles/9/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("posted item format is invalid");
        });
    });
    test("201: still posts comment if object has too many properties (ignores excess)", () => {
      const newComment = {
        username: `butter_bridge`,
        body: "hello",
        age: 19,
      };
      return request(app)
        .post("/api/articles/9/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            comment_id: 19,
            body: `hello`,
            article_id: 9,
            author: `butter_bridge`,
            votes: 0,
            created_at: expect.any(String),
          });
        });
    });
    test("404: errors if username does not exist", () => {
      const newComment = {
        username: `myles`,
        body: "hello",
      };
      return request(app)
        .post("/api/articles/9/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("bad db query");
        });
    });
  });

  describe("POST /api/articles", () => {
    test("201: adds article to db and returns new article obj to user", () => {
      const newArticle = {
        author: "icellusedkars",
        title: "new article",
        body: "hello",
        topic: "paper",
        article_img_url:
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
      };
      return request(app)
        .post("/api/articles")
        .send(newArticle)
        .expect(201)
        .then(({ body }) => {
          expect(body.postedArticle).toEqual({
            author: "icellusedkars",
            title: "new article",
            body: "hello",
            topic: "paper",
            article_img_url:
              "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
            created_at: expect.any(String),
            votes: 0,
            article_id: expect.any(Number),
            comment_count: 0,
          });
        })
        .then(() => {
          return db
            .query("SELECT * FROM articles WHERE title = 'new article'")
            .then(({ rows }) => {
              expect(rows[0].article_id).toBe(14);
            });
        });
    });
    test("404: Errors if author does not exist", () => {
      const newArticle = {
        author: "myles",
        title: "new article",
        body: "hello",
        topic: "paper",
        article_img_url:
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
      };
      return request(app)
        .post("/api/articles")
        .send(newArticle)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("bad db query");
        });
    });
    test("400: errors if posted article is incomplete", () => {
      const newArticle = {
        author: "myles",
        title: "new article",
        topic: "paper",
        article_img_url:
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
      };
      return request(app)
        .post("/api/articles")
        .send(newArticle)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("posted item format is invalid");
        });
    });
    test("201: still creates if article has excess keys, ignoring them", () => {
      const newArticle = {
        author: "icellusedkars",
        naame2: "unnecessary",
        title: "new article",
        body: "hello",
        topic: "paper",
        article_img_url:
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
      };
      return request(app)
        .post("/api/articles")
        .send(newArticle)
        .expect(201)
        .then(({ body }) => {
          expect(body.postedArticle).toEqual({
            article_id: expect.any(Number),
            article_img_url:
              "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
            author: "icellusedkars",
            body: "hello",
            comment_count: 0,
            created_at: expect.any(String),
            title: "new article",
            topic: "paper",
            votes: 0,
          });
        });
    });
    test("201: adds default article_img_url if not specified by user", () => {
      const newArticle = {
        author: "icellusedkars",
        naame2: "unnecessary",
        title: "new article",
        body: "hello",
        topic: "paper",
      };
      return request(app)
        .post("/api/articles")
        .send(newArticle)
        .expect(201)
        .then(({ body }) => {
          expect(body.postedArticle.article_img_url).toBe(
            "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
          );
        });
    });
  });
});
