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
          expect(body.msg).toBe("user does not exist");
        });
    });
  });
});
