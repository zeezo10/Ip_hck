const app = require("../app");
const {
  test,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} = require("@jest/globals");
const request = require("supertest");
const { User, Recipe } = require("../models");

let user_token;

beforeAll(async () => {
  let creat_user = {
    name: "testUser",
    email: "test!@mail.com",
    password: "12345",
  };

  await User.create(creat_user);
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Recipe.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /register", () => {
  test("post /register if success should returning the user name and email ", async () => {
    let register_user = {
      name: "someone",
      email: "someone@mail.com",
      password: "12345",
    };
    let { status, body } = await request(app)
      .post("/register")
      .send(register_user);

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("name", register_user.name);
    expect(body).toHaveProperty("email", register_user.email);
  });

  test("post / register name requird", async () => {
    let register_user = {
      email: "someone@mail.com",
      password: "12345",
    };
    let { status, body } = await request(app)
      .post("/register")
      .send(register_user);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "name is required");
  });

  test("post / register email requird", async () => {
    let register_user = {
      name: "someone",
      password: "12345",
    };
    let { status, body } = await request(app)
      .post("/register")
      .send(register_user);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "email is required");
  });

  test("post / register password requird", async () => {
    let register_user = {
      name: "someone",
      email: "someone@mail.com",
    };
    let { status, body } = await request(app)
      .post("/register")
      .send(register_user);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message" , "password is required");
  });
});

describe("POST /login", () => {
  test("post /login if success should return access token", async () => {
    let login_user = {
      email: "test!@mail.com",
      password: "12345",
    };
    let { status, body } = await request(app).post("/login").send(login_user);

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("access_token");
  });

  test("post /login email required", async () => {
    let login_user = {
      password: "12345",
    };
    let { status, body } = await request(app).post("/login").send(login_user);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email is required");

  })

  test("post /login Password required", async () => {
    let login_user = {
      email: "test!@mail.com",
    };
    let { status, body } = await request(app).post("/login").send(login_user);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Password is required");

  })

  test("post /login if wrong password should return Password or email is invalid", async () => {
    let login_user = {
      email: "test!@mail.com",
      password : "wrong"
    };
    let { status, body } = await request(app).post("/login").send(login_user);

    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Password or email is invalid");
  })
});
