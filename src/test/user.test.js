import { describe, it, expect } from "vitest";
import supertest from "supertest";
import app from "../server";

describe("create api endpoint", () => {
  it("should not create the user", async () => {
    const response = await supertest(app)
      .post("/api/user/create")
      .send({ name: "", age: 30, phone: 234567, isActive: false });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "something went wrong. Fields missing name"
    );
  });

  it("should create the user", async () => {
    const resp = await supertest(app)
      .post("/api/user/create")
      .send({ name: "test created", age: 30, phone: 234567, isActive: false });

    expect(resp.status).toBe(200);
    expect(resp.body.status).toBe(201);
    expect(resp.body.message).toBe("user is created");
    expect(resp.body.data).toMatchObject({
      name: "test created",
      age: 30,
      phone: 234567,
      isActive: false,
    });
  });
});

describe("should return all the users from DB", () => {
  it("get all users", async () => {
    const resp = await supertest(app).get("/api/user/allusers");

    expect(resp.status).toBe(200);
    expect(resp.body.message).toBe("users are fetched");
    expect(resp.body.data).instanceOf(Array);
    expect(resp.body.data[0]).toMatchObject({
      name: expect.any(String),
      age: expect.any(Number),
      phone: expect.any(Number),
      isActive: expect.any(Boolean),
    });
  });
});

describe("should able to perform operation single user", () => {
  it("should'nt be able to get user", async () => {
    const resp = await supertest(app).get("/api/user/single/1001");

    expect(resp.status).toBe(200);
    expect(resp.body.message).toBe("user not found");
    expect(resp.body.data).toBeNull();
  });

  it("should able to fetch the user with id 1", async () => {
    const resp = await supertest(app).get("/api/user/single/1");

    expect(resp.status).toBe(200);
    expect(resp.body.message).toBe("user is fetched");
  });
});
