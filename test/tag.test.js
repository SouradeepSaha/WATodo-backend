const request = require("supertest")
const app = require("../app")


describe("POST /tags", () => {
  let userId = -1;
  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      email: "abc@yahoo.com",
      password: "ASdf@123"
    });
    expect(response.statusCode).toBe(200);
    userId = response.body.user_id;
  });

  afterAll(async () => {
    const response = await request(app).get("/logout").send();
    expect(response.statusCode).toBe(200);
  });

  it("should create tag", async () => {
    const response = await request(app).post("/tags").send({
      user_id: userId,
      color: "2",
      tag_name: "test tag"
    });
    expect(response.statusCode).toBe(201);
  });
});