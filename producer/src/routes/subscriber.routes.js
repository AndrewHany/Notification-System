/**
 *  @swagger
 *   components:
 *     schemas:
 *       Subscriber:
 *         type: object
 *         required:
 *           - userToken
 *           - deviceToken
 *           - deviceType
 *           - language
 *           - phoneNumber
 *         properties:
 *           id:
 *             type: integer
 *             description: The auto-generated id of the subscriber.
 *           userToken:
 *             type: string
 *             description: The subscriber token.
 *           deviceToken:
 *             type: string
 *             description: The device token.
 *           deviceType:
 *             type: string
 *             description: The device type [ios or android].
 *           language:
 *             type: string
 *             description: The subscriber preferred language [en or ar].
 *           phoneNumber:
 *             type: string
 *             description: The subscriber phone number.
 *           isDeviceActive:
 *              type: boolean
 *              description: if the subscriber has the notifications enabled
 *         example:
 *            id: 1
 *            userToken: askrhalsg
 *            deviceToken: 12pjasgASG1251SASG
 *            deviceType: ios
 *            language: en
 *            phoneNumber: 01238336265
 *            isDeviceActive: true
 *       SubscriberNotification:
 *         type: object
 *         required:
 *           - id
 *           - text
 *         properties:
 *           id:
 *             type: integer
 *             description: The auto-generated id of the Notification.
 *           text:
 *             type: string
 *             description: The notification text in the preferred language
 *         example:
 *            id: 1
 *            text: test notification text
 * */

/**
 * @swagger
 *  tags:
 *    name: Subscribers
 *    description: APIs to manage subscribers
 */

module.exports = (app) => {
  const subscribers = require("../controllers/subscriber.controller.js");

  var router = require("express").Router();

  // Creates a new subscriber
  /**
   * @swagger
   * /subscribers:
   *  post:
   *    summary: Creates a new subscriber
   *    tags: [Subscribers]
   *    requestBody:
   *        required: true
   *        content:
   *            application/json:
   *                schema:
   *                    $ref: '#components/schemas/Subscriber'
   *    produces:
   *      - application/json
   *    responses:
   *      201:
   *        description: the created subscriber
   *        content:
   *          application/json:
   *            schema:
   *                $ref: '#/components/schemas/Subscriber'
   */

  router.post("/", subscribers.create);

  // Deactivates a subscriber's device
  /**
   * @swagger
   * /subscribers/deactivate:
   *  post:
   *    summary: Deactivates a subscriber's device
   *    tags: [Subscribers]
   *    requestBody:
   *        required: true
   *        content:
   *            application/json:
   *                schema:
   *                    properties:
   *                        userToken:
   *                            description: userToken
   *                            type: string
   *                        deviceToken:
   *                            description: device token to deactive notifications on
   *                            type: string
   *                    required:
   *                        - userToken
   *                        - deviceToken
   *    responses:
   *      200:
   *        description: user device deactivated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Subscriber'
   *
   */

  // Deactivates a subscriber
  router.post("/deactivate", subscribers.deactivate);

  // Retrieves all subscribers
  /**
   * @swagger
   * /subscribers:
   *  get:
   *    summary: Retrieves all subscribers
   *    tags: [Subscribers]
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: subscribers
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Subscriber'
   */

  router.get("/", subscribers.findAll);

  // Retrieves all subscribers
  /**
   * @swagger
   * /subscribers/{userToken}/notifications:
   *  get:
   *    summary: Retrieves all subscriber push notifications
   *    tags: [Subscribers]
   *    parameters:
   *      - in: path
   *        name: userToken
   *        schema:
   *          type: string
   *          required: true
   *          description: userToken to retrieve all notifications to
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: subscribers
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/SubscriberNotification'
   */
  router.get("/:userToken/pushnotifications", subscribers.getPushNotifications);

  app.use("/api/subscribers", router);
};
