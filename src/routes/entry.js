const router = require("express").Router();
const entryController = require("../controllers/entry.controller");
const { auth } = require("../utils/auth");
const formData = require("../utils/formData");

router.route("/").get(auth, entryController.list);
router.route("/myentries").get(auth, entryController.listProfile);
router.route("/:entryId").get(entryController.show);
router.route("/").post(auth, formData, entryController.create);
router.route("/:entryId").delete(entryController.destroy);

module.exports = router;
