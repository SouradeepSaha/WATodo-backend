const request = require("supertest")
const baseURL = "http://localhost:8000"

describe("POST /login", () => {
  it("should return 401", async () => {
    const payload = {email: 'xyz@yahoo.com', password: 'ASdf@123' };
    const response = await request(baseURL).post("/login").send(payload);
    expect(response.statusCode).toBe(401);
  });
  it("should return 200", async () => {
    const payload = {email: 'abc@yahoo.com', password: 'ASdf@123' };
    const response = await request(baseURL).post("/login").send(payload);
    expect(response.statusCode).toBe(200);
  });
});