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
const { signToken } = require("../helper/jwt");

let user_token;
let user_token_2;

let recipe_id;
let recipe_id_2;

let data_User;
let data_User_2;

beforeAll(async () => {
  let create_user_1 = {
    name: "testUser",
    email: "test!@mail.com",
    password: "12345",
  };

  let create_user_2 = {
    name: "testUser2",
    email: "test2@mail.com",
    password: "12345",
  };

  let user = await User.create(create_user_1);
  user_token = signToken({ id: user.id });

  let user2 = await User.create(create_user_2);
  user_token_2 = signToken({ id: user2.id });

  let user_recipe = await Recipe.create({
    title: "recipe1",
    ingredients: "ewee wewee fewds",
    UserId: 1,
  });

  recipe_id = user_recipe.dataValues.id;

  let user_recipe_2 = await Recipe.create({
    title: "recipe2",
    ingredients: "ewee wewee fewds",
    UserId: 2,
  });

  recipe_id_2 = user_recipe_2.dataValues.id;
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

describe("GET /recipes ", () => {
  test("get /resipes if success should be returning all the recipes that in public", async () => {
    let { status, body } = await request(app)
      .get("/recipes")
      .set("authorization", "Bearer " + user_token);

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });
});

describe("POST /recipes", () => {
  test("post /recipes  if success should return the added recipe", async () => {
    let new_recipe = {
      title: "test",
      ingredients: "test test test test",
      UserId: 1,
    };
    let { status, body } = await request(app)
      .post("/recipes")
      .set("authorization", "Bearer " + user_token)
      .send(new_recipe);

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("title", new_recipe.title);
    expect(body).toHaveProperty("ingredients", new_recipe.ingredients);
    expect(body).toHaveProperty("UserId", new_recipe.UserId);
  });

  test("post /recipes title is reauired", async () => {
    let new_recipe = {
      ingredients: "test test test test",
      UserId: 1,
    };
    let { status, body } = await request(app)
      .post("/recipes")
      .set("authorization", "Bearer " + user_token)
      .send(new_recipe);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "title required");
  });

  test("post /recipes ingredients is reauired", async () => {
    let new_recipe = {
      title: "test",
      UserId: 1,
    };
    let { status, body } = await request(app)
      .post("/recipes")
      .set("authorization", "Bearer " + user_token)
      .send(new_recipe);

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "ingrediant required");
  });
});

describe("PUT /recipes/:id ", () => {
  let upadte_recipe = {
    title: "test",
    ingredients: "test test test test",
  };

  test("put /recipes/:id if success should return the updated recipe ", async () => {
    let { status, body } = await request(app)
      .put(`/recipes/${recipe_id}`)
      .set("authorization", "Bearer " + user_token)
      .send(upadte_recipe);

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });

  test("put /recipe/:id if the user want to edit others recipes should return forbidden", async () => {
    let { status, body } = await request(app)
      .put(`/recipes/${recipe_id_2}`)
      .set("authorization", "Bearer " + user_token)
      .send(upadte_recipe);

    expect(status).toBe(403);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Forbidden");
  });

  test("put /recipse/:id if the recipe dont exists should return not found", async () => {
    let { status, body } = await request(app)
      .put(`/recipes/10002`)
      .set("authorization", "Bearer " + user_token)
      .send(upadte_recipe);

    expect(status).toBe(404);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "not found");
  });
});

describe("DELETE /recipes/:id", () => {
  test("delete /recipes/:id  if success delete should return the deleted recipe", async () => {
    let { status, body } = await request(app)
      .delete(`/recipes/${recipe_id}`)
      .set("authorization", "Bearer " + user_token);

    expect(status).toBe(200);
  });

  test("delete /recipes/:id  if user want to delete others recipe should return forbidden", async () => {
    let { status, body } = await request(app)
      .delete(`/recipes/3`)
      .set("authorization", "Bearer " + user_token_2);

    expect(status).toBe(403);
    expect(body).toHaveProperty("message", "Forbidden");
  });

  test("delete /recipes/:id  if recipe not found should return not found", async () => {
    let { status, body } = await request(app)
      .delete(`/recipes/22222212`)
      .set("authorization", "Bearer " + user_token_2);

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "not found");
  });
});
