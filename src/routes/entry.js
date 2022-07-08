const router = require("express").Router();
const boardController = require("../controllers/entry.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, boardController.list);
router.route("/:entryId").get(boardController.show);
router.route("/").post(auth, boardController.create);
router.route("/:entryId").put(boardController.update);
router.route("/:entryId").delete(boardController.destroy);

module.exports = router;
