/**
*  @swagger
*   components:
*     schemas:
*       Notification:
*         type: object
*         required:
*           - text_en
*           - text_ar
*           - type
*         properties:
*           id:
*             type: integer
*             description: The auto-generated id of the Notification.
*           text_en:
*             type: string
*             description: The notification text in english.
*           text_ar:
*             type: string
*             description: The notification text in arabic
*           type:
*             type: string
*             description: The notification type [SMS Or PUSH]
*         example:
*            id: 1
*            text_en: test text
*            text_ar: اختبار النص العربي
*            type: SMS
*       NotificationCreate:
*         allOf:
*           - $ref: '#components/schemas/Notification'
*           - type: object
*             required:
*               - usersTokens
*             properties:
*               userTokens:
*                 type: array
*                 description: list of user tokens to send to
*                 items:
*                   type: string
*             example:
*                id: 1
*                text_en: test text
*                text_ar: اختبار النص العربي
*                type: SMS
*                usersTokens : ["1251asGA12JFGXC", "129hswASAS2EWFZX"]
* */

/**
 * @swagger
 *  tags:
 *    name: Notifications
 *    description: APIs to manage notifications
 */
  
module.exports = (app) => {
  const notifications = require("../controllers/notification.controller.js");

  var router = require("express").Router();

  // Creates and sends a new Notification
  /**
   * @swagger
   * /notifications:
   *  post:
   *    summary: creates & sends a new notification
   *    tags: [Notifications]
   *    requestBody:
   *        required: true
   *        content:
   *            application/json:
   *                schema:
   *                    $ref: '#components/schemas/NotificationCreate'
   *    produces:
   *      - application/json
   *    responses:
   *      201:
   *        description: the created notification
   *        content:
   *          application/json:
   *            schema:
   *                $ref: '#/components/schemas/Notification'
   */
  router.post("/", notifications.create);

  // Retrieves all Notifications
  /**
   * @swagger
   * /notifications:
   *  get:
   *    summary: Retrieves all notifications (can be filtered by userToken)
   *    tags: [Notifications]
   *    parameters:
   *      - in: query
   *        name: userToken
   *        schema:
   *          type: string
   *          required: false
   *          description: userToken to retrieve all notifications to
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: notifications
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Notification'
   */
  router.get("/", notifications.findAll);

  app.use("/api/notifications", router);
};
