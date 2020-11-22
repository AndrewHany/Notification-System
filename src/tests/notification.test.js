const request = require("supertest");
const app = require("../app.js");


describe("Notifications APIs", () => {
  // Test retrieve all Notifications
  it("should show all notifications", async (done) => {
    const res = await request(app).get("/api/notifications");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(2);
    expect(res.body[0].text_en).toEqual("TEST ENGLISH TEXT");
    done();
  });

  // Test create a new Notification

  // Test retrieve a single Notification with id

  // Test update a Notification with id

  // Test delete a Notification with id

  // Test delete all Notifications
});