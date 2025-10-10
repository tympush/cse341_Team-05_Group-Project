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

  //countries
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

  //continents
  test("GET /continents - should return all continents", async () => {
    const res = await request(app).get("/continents");
    expect(res.statusCode).toBe(200);
  });

  test("GET /continents/:id - should return one continent", async () => {
    const res = await request(app).get(`/continents/${createdId}`);
    expect(res.statusCode).toBe(200);
  });

  //cities
  test("GET /cities - should return all cities", async () => {
    const res = await request(app).get("/cities");
    expect(res.statusCode).toBe(200);
  });

  test("GET /cities/:id - should return one city", async () => {
    const res = await request(app).get(`/cities/${createdId}`);
    expect(res.statusCode).toBe(200);
  });

  //landmarks
  test("GET /landmarks - should return all landmarks", async () => {
    const res = await request(app).get("/landmarks");
    expect(res.statusCode).toBe(200);
  });

  test("GET /landmarks/:id - should return one landmark", async () => {
    const res = await request(app).get(`/landmarks/${createdId}`);
    expect(res.statusCode).toBe(200);
  });
});
