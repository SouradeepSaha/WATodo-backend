const request = require("supertest")
const app = require("../app")

describe("POST /signup", () => {
  test("should respond with status code 200", async () => {
    const response = await request(app).post("/signup").send({
      username: "testuser",
      name: "Test User",
      email: "testuser@yahoo.com",
      password: "ASdf@123"
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /login", () => {
  it("should return 401", async () => {
    const payload = { email: 'xyz@yahoo.com', password: 'ASdf@123' };
    const response = await request(baseURL).post("/login").send(payload);
    expect(response.statusCode).toBe(401);
  });

  it("should return 200", async () => {
    const payload = { email: 'abc@yahoo.com', password: 'ASdf@123' };
    const response = await request(baseURL).post("/login").send(payload);
    expect(response.statusCode).toBe(200);
  });
});