/**
*  @swagger
*   components:
*     schemas:
*       Notification:
*         type: object
*         required:
*           - text_en
*           - text_ar
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
*         example:
*            id: 1
*            text_en: test text
*            text_ar: اختبار النص العربي
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

  // Create a new Notification
  router.post("/", notifications.create);

  // Retrieve all Notifications
  /**
   * @swagger
   * /notifications:
   *  get:
   *    summary: Retrieves all notifications
   *    tags: [Notifications]
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

  // Retrieve a single Notification with id
  router.get("/:id", notifications.findOne);

  // Update a Notification with id
  router.put("/:id", notifications.update);

  // Delete a Notification with id
  router.delete("/:id", notifications.delete);

  // Delete all Notifications
  router.delete("/", notifications.deleteAll);

  app.use("/api/notifications", router);
};
