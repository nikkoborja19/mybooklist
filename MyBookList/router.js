/*let express = require("express");
let auth = require("./auth.js");
let sessionCtrl = require("./server/controllers/session.server.controller.js");
let meetingCtrl = require("./server/controllers/meeting.server.controller.js");
let accountCtrl = require("./server/controllers/account.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);
router.post("/account/register", accountCtrl.register);

router.get("/meeting", auth.check, meetingCtrl.getAll);
router.get("/meeting/:meetingId", auth.check, meetingCtrl.getById);
router.post("/meeting", auth.check, meetingCtrl.create);
router.put("/meeting/:meetingId", auth.check, meetingCtrl.update);
router.delete("/meeting/:meetingId", auth.check, meetingCtrl.delete);

module.exports = router;*/
let express = require("express");
let auth = require("./auth.js");
let sessionCtrl = require("./server/controllers/session.server.controller.js");
let reviewCtrl = require("./server/controllers/review.server.controller.js");
let accountCtrl = require("./server/controllers/account.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);
router.post("/account/register", accountCtrl.register);

router.get("/review", auth.check, reviewCtrl.getAll);
router.get("/review/:bookId", auth.check, reviewCtrl.getAllBookReviews); //gets all the reviews of a particular book
router.get("/review/:username/:reviewId", auth.check, reviewCtrl.getById);
router.post("/review", auth.check, reviewCtrl.create);
router.put("/review/:reviewId", auth.check, reviewCtrl.update);
router.delete("/review/:reviewId", auth.check, reviewCtrl.delete);

module.exports = router;
