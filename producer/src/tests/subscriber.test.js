const request = require("supertest");
const app = require("../app.js");

describe("Subscribers APIs", () => {
  // Test retrieve all subscribers
  it("should show all subscribers", async (done) => {
    const res = await request(app).get("/api/subscribers");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });
  // Test create a subscriber
  it("should create a subscriber", async (done) => {
    const res = await request(app).post("/api/subscribers").send({
      userToken: "askrshsalsgtest",
      deviceToken: "12pjsaesgASG1251SASGtest",
      deviceType: "ios",
      language: "en",
      phoneNumber: "01238336265",
      isDeviceActive: true,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined();
    done();
  });

  //Test create same subscriber again ( same tokens)
  it("fail to create a subscriber", async (done) => {
    const res = await request(app).post("/api/subscribers").send({
      userToken: "askrshsalsgtest",
      deviceToken: "12pjsaesgASG1251SASGtest",
      deviceType: "android",
      language: "ar",
      phoneNumber: "01238336215",
      isDeviceActive: true,
    });
    expect(res.statusCode).toEqual(500);
    done();
  });

  //Test deactivate a subscriber device
  it("should deactivate a subscriber device", async (done) => {
    const res = await request(app).post("/api/subscribers/deactivate").send({
      userToken: "askrshsalsgtest",
      deviceToken: "12pjsaesgASG1251SASGtest",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("updatedSubscriber");
    expect(res.body.updatedSubscriber.isDeviceActive).toBe(false);
    done();
  });
  //Test show all subscriber notifications with language
  it("should show all subscriber notifications", async (done) => {
    const res = await request(app)
      .get("/api/subscribers/GciOiJIUzI1NiIsInR5cCI/pushnotifications");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });
});
