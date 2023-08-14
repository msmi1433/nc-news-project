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
});
