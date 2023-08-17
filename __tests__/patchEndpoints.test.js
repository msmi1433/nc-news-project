const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("PATCH endpoints", () => {
  describe("PATCH /api/articles/:article_id", () => {
    test("200: responds with article object with votes increased and correct properties", () => {
      const newVotes = { inc_votes: 5 };
      return request(app)
        .patch("/api/articles/3")
        .send(newVotes)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedArticle).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 5,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("200: responds with article object with votes decreased and correct properties", () => {
      const newVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/1")
        .send(newVotes)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedArticle).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 90,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("200: votes can be decremented below 0", () => {
      const newVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/9")
        .send(newVotes)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedArticle).toEqual({
            article_id: 9,
            title: "They're not exactly dogs, are they?",
            topic: "mitch",
            author: "butter_bridge",
            body: "Well? Think about it.",
            created_at: "2020-06-06T09:10:00.000Z",
            votes: -10,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("400: errors when article_id is not valid", () => {
      const newVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/banana")
        .send(newVotes)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid data-type");
        });
    });
    test("404: errors when article_id does not exist", () => {
      const newVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/5000")
        .send(newVotes)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article_id does not exist");
        });
    });
    test("400: errors when inc-votes data type is invalid", () => {
      const newVotes = { inc_votes: "string" };
      return request(app)
        .patch("/api/articles/1")
        .send(newVotes)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid data-type");
        });
    });
  });
  describe("PATCH /api/comments/:comment_id", () => {
    test("200: responds with updated comment", () => {
      const newVotes = { inc_votes: 30 };
      return request(app)
        .patch("/api/comments/3")
        .send(newVotes)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedComment).toEqual({
            comment_id: 3,
            body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
            votes: 130,
            author: "icellusedkars",
            article_id: 1,
            created_at: "2020-03-01T01:13:00.000Z",
          });
        });
    });
    test("400: errors when sent object is not valid", () => {
      const newVotes = { inc_votes: "hello" };
      return request(app)
        .patch("/api/comments/3")
        .send(newVotes)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid data-type");
        });
    });
    test("404: errors when comment_id does not exist", () => {
      const newVotes = { inc_votes: 500 };
      return request(app)
        .patch("/api/comments/5934838")
        .send(newVotes)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("comment_id does not exist");
        });
    });
  });
  test("200: decrements votes when negative int sent in", () => {
    const newVotes = { inc_votes: -10 };
    return request(app)
      .patch("/api/comments/3")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedComment).toEqual({
          comment_id: 3,
          body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
          votes: 90,
          author: "icellusedkars",
          article_id: 1,
          created_at: "2020-03-01T01:13:00.000Z",
        });
      });
  });
});
