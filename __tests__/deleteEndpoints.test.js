const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("DELETE endpoints", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    test("204: deletes comment successfully", () => {
      return request(app)
        .delete("/api/comments/11")
        .expect(204)
        .then(() => {
          return db
            .query("SELECT * FROM comments WHERE comment_id = 11")
            .then(({ rows }) => {
              expect(rows).toEqual([]);
            });
        });
    });
    test("404: errors when comment_id does not exist", () => {
      return request(app)
        .delete("/api/comments/5000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("parameter does not exist");
        });
    });
    test("404: errors when comment_id does not exist", () => {
      return request(app)
        .delete("/api/comments/hello")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid data-type");
        });
    });
  });
});
