const request = require("supertest")
const app = require("../app")

var userId = -1;

describe("POST /signup", () => {

  test("should respond with status code 200", async () => {
    const randomNum = Math.floor(Math.random(1000)*1000)
    const response = await request(app).post("/signup").send({
      username: "testuser"+randomNum,
      name: "Test User",
      email: "testuser"+randomNum+ "@yahoo.com",
      password: "ASdf@123"
    });
    expect(response.statusCode).toBe(200);
    userId = response.body.user_id;
  });
});

describe("POST /login", () => {
  it("should return 401", async () => {
    const payload = { email: 'xyz@yahoo.com', password: 'ASdf@123' };
    const response = await request(app).post("/login").send(payload);
    expect(response.statusCode).toBe(401);
  });

});

afterAll(async () => {
  const response = await request(app).delete("/user/"+userId);
  expect(response.statusCode).toBe(200);
});