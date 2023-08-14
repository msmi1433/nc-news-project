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
        "title",
        "topic",
        "author",
        "body",
        "created_at",
        "article_img_url",
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
    test("400: responds with a 400 and err message when input article_id is not a number", () => {
      return request(app)
        .get("/api/articles/dog")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("invalid parameter");
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
});
