const request = require("supertest");
const app = require("../app");
const { initDb } = require("../db/connect");

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    initDb((err, db) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe("GEOGRAPHY API Endpoints", () => {
  let createdId;

  test("GET /countries - should return all countries", async () => {
    const res = await request(app).get("/countries");
    expect(res.statusCode).toBe(200);
  });

  test("POST /countries - should create a new country", async () => {
    const newCountry = { name: "Testland", capital: "Mock City", population: 12345 };
    const res = await request(app).post("/countries").send(newCountry);
    expect(res.statusCode).toBe(201);
    createdId = res.body._id || res.body.insertedId;
  });

  test("GET /countries/:id - should return one country", async () => {
    const res = await request(app).get(`/countries/${createdId}`);
    expect(res.statusCode).toBe(200);
  });

  test("PUT /countries/:id - should update a country", async () => {
    const res = await request(app).put(`/countries/${createdId}`).send({ population: 99999 });
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /countries/:id - should delete a country", async () => {
    const res = await request(app).delete(`/countries/${createdId}`);
    expect(res.statusCode).toBe(200);
  });
});
