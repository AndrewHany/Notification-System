const request = require("supertest");
const app = require("../app.js");

describe("Notifications APIs", () => {
  // Test retrieve all Notifications
  it("should show all notifications", async (done) => {
    const res = await request(app).get("/api/notifications");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });

  it("should create a notification", async (done) => {
    const res = await request(app)
      .post("/api/notifications")
      .send({
        text_en: "Testing push notifications sms text",
        text_ar: "اختبار الرسائل القصيرة SMS الإخطارات",
        type: "PUSH",
        usersTokens: ["0172hasdUzI1NiASCsInjasgl", "AEiQisfUzI1GaiIczxR5fCI"]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined();
    done();
  });
});
